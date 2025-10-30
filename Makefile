# Makefile for WolfGuard site deployment with Podman
# Uses: Podman, Buildah, Skopeo, podman-compose, crun runtime

# Variables
PROJECT_NAME := wolfguard-site
IMAGE_NAME := localhost/$(PROJECT_NAME)
IMAGE_TAG := latest
CONTAINER_NAME := $(PROJECT_NAME)
COMPOSE_FILE := compose.yaml

# Git metadata
GIT_COMMIT := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_DATE := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")

# Colors for output
COLOR_RESET := \033[0m
COLOR_INFO := \033[36m
COLOR_SUCCESS := \033[32m
COLOR_WARNING := \033[33m
COLOR_ERROR := \033[31m

# Default target
.DEFAULT_GOAL := help

##@ General

.PHONY: help
help: ## Display this help message
	@echo -e "$(COLOR_INFO)WolfGuard Site - Podman Deployment$(COLOR_RESET)"
	@echo -e "$(COLOR_INFO)=====================================$(COLOR_RESET)"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Build

.PHONY: build
build: ## Build container image with Podman/Buildah
	@echo -e "$(COLOR_INFO)Building container image...$(COLOR_RESET)"
	@podman build \
		--file Containerfile \
		--tag $(IMAGE_NAME):$(IMAGE_TAG) \
		--tag $(IMAGE_NAME):$(GIT_COMMIT) \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--format oci \
		--runtime crun \
		--layers \
		.
	@echo -e "$(COLOR_SUCCESS)Build complete: $(IMAGE_NAME):$(IMAGE_TAG)$(COLOR_RESET)"

.PHONY: build-no-cache
build-no-cache: ## Build container image without cache
	@echo -e "$(COLOR_INFO)Building container image (no cache)...$(COLOR_RESET)"
	@podman build \
		--no-cache \
		--file Containerfile \
		--tag $(IMAGE_NAME):$(IMAGE_TAG) \
		--tag $(IMAGE_NAME):$(GIT_COMMIT) \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--format oci \
		--runtime crun \
		.
	@echo -e "$(COLOR_SUCCESS)Build complete: $(IMAGE_NAME):$(IMAGE_TAG)$(COLOR_RESET)"

##@ Container Management

.PHONY: start
start: ## Start containers with podman-compose
	@echo -e "$(COLOR_INFO)Starting WolfGuard site...$(COLOR_RESET)"
	@BUILD_DATE="$(BUILD_DATE)" GIT_COMMIT="$(GIT_COMMIT)" podman-compose -f $(COMPOSE_FILE) up -d
	@echo -e "$(COLOR_SUCCESS)Container started successfully$(COLOR_RESET)"
	@echo -e "$(COLOR_INFO)Access the site at: http://localhost:8080$(COLOR_RESET)"

.PHONY: stop
stop: ## Stop running containers
	@echo -e "$(COLOR_INFO)Stopping WolfGuard site...$(COLOR_RESET)"
	@podman-compose -f $(COMPOSE_FILE) down
	@echo -e "$(COLOR_SUCCESS)Containers stopped$(COLOR_RESET)"

.PHONY: restart
restart: stop start ## Restart containers

.PHONY: up
up: build start ## Build and start containers

##@ Logs and Monitoring

.PHONY: logs
logs: ## View container logs (follow mode)
	@podman-compose -f $(COMPOSE_FILE) logs -f

.PHONY: logs-tail
logs-tail: ## View last 100 lines of logs
	@podman logs --tail 100 $(CONTAINER_NAME)

.PHONY: status
status: ## Show container status
	@echo -e "$(COLOR_INFO)Container Status:$(COLOR_RESET)"
	@podman ps -a --filter name=$(CONTAINER_NAME) --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}"

.PHONY: health
health: ## Check container health status
	@echo -e "$(COLOR_INFO)Health Check:$(COLOR_RESET)"
	@podman inspect $(CONTAINER_NAME) --format '{{.State.Health.Status}}' 2>/dev/null || echo "Container not running"

.PHONY: stats
stats: ## Show container resource usage
	@podman stats --no-stream $(CONTAINER_NAME)

##@ Deployment

.PHONY: deploy
deploy: clean build start verify ## Complete deployment pipeline
	@echo -e "$(COLOR_SUCCESS)Deployment complete!$(COLOR_RESET)"

.PHONY: verify
verify: ## Verify deployment is working
	@echo -e "$(COLOR_INFO)Verifying deployment...$(COLOR_RESET)"
	@sleep 5
	@curl -f -s -o /dev/null http://localhost:8080/health && \
		printf "%b\n" "$(COLOR_SUCCESS)Health check passed$(COLOR_RESET)" || \
		printf "%b\n" "$(COLOR_ERROR)Health check failed$(COLOR_RESET)"
	@curl -f -s -o /dev/null http://localhost:8080/ && \
		printf "%b\n" "$(COLOR_SUCCESS)Site is accessible$(COLOR_RESET)" || \
		printf "%b\n" "$(COLOR_ERROR)Site is not accessible$(COLOR_RESET)"

##@ Cleanup

.PHONY: clean
clean: ## Remove containers and images
	@echo -e "$(COLOR_WARNING)Cleaning up containers and images...$(COLOR_RESET)"
	@podman-compose -f $(COMPOSE_FILE) down --volumes 2>/dev/null || true
	@podman rm -f $(CONTAINER_NAME) 2>/dev/null || true
	@podman rmi $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true
	@podman rmi $(IMAGE_NAME):$(GIT_COMMIT) 2>/dev/null || true
	@echo -e "$(COLOR_SUCCESS)Cleanup complete$(COLOR_RESET)"

.PHONY: prune
prune: ## Prune unused containers, images, and volumes
	@echo -e "$(COLOR_WARNING)Pruning unused resources...$(COLOR_RESET)"
	@podman system prune -f
	@echo -e "$(COLOR_SUCCESS)Prune complete$(COLOR_RESET)"

.PHONY: clean-all
clean-all: clean prune ## Deep clean (containers, images, volumes, cache)
	@echo -e "$(COLOR_SUCCESS)Deep clean complete$(COLOR_RESET)"

##@ Development

.PHONY: shell
shell: ## Open shell in running container
	@podman exec -it $(CONTAINER_NAME) /bin/sh

.PHONY: inspect
inspect: ## Inspect container configuration
	@podman inspect $(CONTAINER_NAME)

.PHONY: inspect-image
inspect-image: ## Inspect image details
	@podman inspect $(IMAGE_NAME):$(IMAGE_TAG)

.PHONY: test
test: ## Test container locally
	@echo -e "$(COLOR_INFO)Testing container...$(COLOR_RESET)"
	@podman run --rm \
		--name $(PROJECT_NAME)-test \
		-p 8081:8080 \
		$(IMAGE_NAME):$(IMAGE_TAG) &
	@sleep 5
	@curl -f http://localhost:8081/health && printf "%b\n" "$(COLOR_SUCCESS)Test passed$(COLOR_RESET)" || printf "%b\n" "$(COLOR_ERROR)Test failed$(COLOR_RESET)"
	@podman stop $(PROJECT_NAME)-test 2>/dev/null || true

##@ Image Management

.PHONY: images
images: ## List project images
	@podman images | grep $(PROJECT_NAME) || echo "No images found"

.PHONY: save
save: ## Save image to tar archive
	@echo -e "$(COLOR_INFO)Saving image to tar...$(COLOR_RESET)"
	@podman save -o $(PROJECT_NAME)-$(GIT_COMMIT).tar $(IMAGE_NAME):$(IMAGE_TAG)
	@echo -e "$(COLOR_SUCCESS)Image saved to $(PROJECT_NAME)-$(GIT_COMMIT).tar$(COLOR_RESET)"

.PHONY: load
load: ## Load image from tar archive
	@echo -e "$(COLOR_INFO)Loading image from tar...$(COLOR_RESET)"
	@podman load -i $(PROJECT_NAME)-$(GIT_COMMIT).tar
	@echo -e "$(COLOR_SUCCESS)Image loaded$(COLOR_RESET)"

.PHONY: push
push: ## Push image to registry (requires REGISTRY env var)
	@if [ -z "$(REGISTRY)" ]; then \
		printf "%b\n" "$(COLOR_ERROR)Error: REGISTRY environment variable not set$(COLOR_RESET)"; \
		printf "%b\n" "Usage: make push REGISTRY=registry.example.com/wolfguard"; \
		exit 1; \
	fi
	@echo -e "$(COLOR_INFO)Pushing image to $(REGISTRY)...$(COLOR_RESET)"
	@podman tag $(IMAGE_NAME):$(IMAGE_TAG) $(REGISTRY)/$(PROJECT_NAME):$(IMAGE_TAG)
	@podman tag $(IMAGE_NAME):$(IMAGE_TAG) $(REGISTRY)/$(PROJECT_NAME):$(GIT_COMMIT)
	@podman push $(REGISTRY)/$(PROJECT_NAME):$(IMAGE_TAG)
	@podman push $(REGISTRY)/$(PROJECT_NAME):$(GIT_COMMIT)
	@echo -e "$(COLOR_SUCCESS)Image pushed to registry$(COLOR_RESET)"

##@ Information

.PHONY: info
info: ## Show build and runtime information
	@echo -e "$(COLOR_INFO)Project Information:$(COLOR_RESET)"
	@echo -e "  Project Name:  $(PROJECT_NAME)"
	@echo -e "  Image Name:    $(IMAGE_NAME):$(IMAGE_TAG)"
	@echo -e "  Git Commit:    $(GIT_COMMIT)"
	@echo -e "  Build Date:    $(BUILD_DATE)"
	@echo -e "  Compose File:  $(COMPOSE_FILE)"
	@echo -e ""
	@echo -e "$(COLOR_INFO)Podman Information:$(COLOR_RESET)"
	@podman --version
	@podman-compose --version 2>/dev/null || echo "  podman-compose: not installed"
	@buildah --version 2>/dev/null || echo "  buildah: not installed"
	@skopeo --version 2>/dev/null || echo "  skopeo: not installed"

.PHONY: version
version: ## Show version information
	@echo -e "$(COLOR_INFO)WolfGuard Site$(COLOR_RESET)"
	@echo -e "  Version:       1.0.0"
	@echo -e "  Git Commit:    $(GIT_COMMIT)"
	@echo -e "  Build Date:    $(BUILD_DATE)"
