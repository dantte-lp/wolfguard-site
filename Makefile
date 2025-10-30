# Makefile for WolfGuard Website
# Uses Podman, podman-compose, and Buildah (not Docker)

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
MAGENTA := \033[0;35m
CYAN := \033[0;36m
RESET := \033[0m

# Project variables
PROJECT_NAME := wolfguard-site
IMAGE_NAME := localhost/$(PROJECT_NAME)
BUILD_DATE := $(shell date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_COMMIT := $(shell git rev-parse --short HEAD 2>/dev/null || echo "dev")

# File paths
CONTAINERFILE := deploy/config/Containerfile
CONTAINERFILE_DEV := deploy/config/Containerfile.dev
COMPOSE_DEV := docker-compose.dev.yaml
COMPOSE_PROD := deploy/config/compose.yaml
COMPOSE_PROD_TRAEFIK := deploy/config/compose.prod.yaml

.PHONY: help
help: ## Show this help message
	@echo -e "$(CYAN)╔══════════════════════════════════════════════════════════════╗$(RESET)"
	@echo -e "$(CYAN)║$(RESET)  $(MAGENTA)WolfGuard Website - Development & Deployment$(RESET)            $(CYAN)║$(RESET)"
	@echo -e "$(CYAN)╚══════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo -e "$(YELLOW)Available targets:$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo -e "$(BLUE)Usage examples:$(RESET)"
	@echo -e "  $(CYAN)make dev$(RESET)              - Start development server"
	@echo -e "  $(CYAN)make build$(RESET)            - Build production container"
	@echo -e "  $(CYAN)make deploy$(RESET)           - Deploy production containers"
	@echo -e "  $(CYAN)make clean$(RESET)            - Clean up all containers and volumes"
	@echo ""

# ==============================================================================
# Development Targets
# ==============================================================================

.PHONY: dev
dev: ## Start development server with podman-compose
	@echo -e "$(GREEN)Starting development server...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) up

.PHONY: dev-build
dev-build: ## Build and start development server
	@echo -e "$(GREEN)Building and starting development server...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) up --build

.PHONY: dev-down
dev-down: ## Stop development containers
	@echo -e "$(YELLOW)Stopping development containers...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) down

.PHONY: dev-logs
dev-logs: ## Show development logs
	@echo -e "$(CYAN)Showing development logs...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) logs -f

.PHONY: dev-shell
dev-shell: ## Open shell in development container
	@echo -e "$(CYAN)Opening shell in development container...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev sh

.PHONY: dev-restart
dev-restart: dev-down dev ## Restart development server

# ==============================================================================
# Building Targets
# ==============================================================================

.PHONY: build
build: ## Build production container with Buildah
	@echo -e "$(GREEN)Building production container with Buildah...$(RESET)"
	@echo -e "$(BLUE)Image: $(IMAGE_NAME):latest$(RESET)"
	@echo -e "$(BLUE)Build Date: $(BUILD_DATE)$(RESET)"
	@echo -e "$(BLUE)Git Commit: $(GIT_COMMIT)$(RESET)"
	@buildah bud \
		--format=docker \
		--file=$(CONTAINERFILE) \
		--tag=$(IMAGE_NAME):latest \
		--tag=$(IMAGE_NAME):$(GIT_COMMIT) \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--layers \
		.
	@echo -e "$(GREEN)Build complete!$(RESET)"

.PHONY: build-dev
build-dev: ## Build development container with Buildah
	@echo -e "$(GREEN)Building development container with Buildah...$(RESET)"
	@buildah bud \
		--format=docker \
		--file=$(CONTAINERFILE_DEV) \
		--tag=$(IMAGE_NAME):dev \
		--layers \
		.
	@echo -e "$(GREEN)Development build complete!$(RESET)"

.PHONY: build-no-cache
build-no-cache: ## Build production container without cache
	@echo -e "$(GREEN)Building production container (no cache)...$(RESET)"
	@buildah bud \
		--format=docker \
		--file=$(CONTAINERFILE) \
		--tag=$(IMAGE_NAME):latest \
		--tag=$(IMAGE_NAME):$(GIT_COMMIT) \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--no-cache \
		.
	@echo -e "$(GREEN)Build complete!$(RESET)"

# ==============================================================================
# Testing Targets
# ==============================================================================

.PHONY: test
test: ## Run tests
	@echo -e "$(CYAN)Running tests...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm test

.PHONY: lint
lint: ## Run ESLint
	@echo -e "$(CYAN)Running ESLint...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm run lint

.PHONY: lint-fix
lint-fix: ## Run ESLint with auto-fix
	@echo -e "$(CYAN)Running ESLint with auto-fix...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm run lint:fix

.PHONY: type-check
type-check: ## Run TypeScript type checking
	@echo -e "$(CYAN)Running TypeScript type checking...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm run type-check

.PHONY: format
format: ## Run Prettier to format code
	@echo -e "$(CYAN)Running Prettier...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm run format

.PHONY: format-check
format-check: ## Check code formatting with Prettier
	@echo -e "$(CYAN)Checking code formatting...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm run format:check

.PHONY: check-all
check-all: lint type-check format-check ## Run all checks (lint, type-check, format)
	@echo -e "$(GREEN)All checks completed!$(RESET)"

# ==============================================================================
# Deployment Targets
# ==============================================================================

.PHONY: deploy
deploy: ## Deploy production containers with podman-compose
	@echo -e "$(GREEN)Deploying production containers...$(RESET)"
	@podman-compose -f $(COMPOSE_PROD) up -d

.PHONY: deploy-traefik
deploy-traefik: ## Deploy production with Traefik integration
	@echo -e "$(GREEN)Deploying production with Traefik...$(RESET)"
	@podman-compose -f $(COMPOSE_PROD_TRAEFIK) up -d

.PHONY: deploy-down
deploy-down: ## Stop production containers
	@echo -e "$(YELLOW)Stopping production containers...$(RESET)"
	@podman-compose -f $(COMPOSE_PROD) down

.PHONY: deploy-logs
deploy-logs: ## Show production logs
	@echo -e "$(CYAN)Showing production logs...$(RESET)"
	@podman-compose -f $(COMPOSE_PROD) logs -f

.PHONY: deploy-restart
deploy-restart: deploy-down deploy ## Restart production containers

.PHONY: deploy-build
deploy-build: build deploy ## Build and deploy production containers

# ==============================================================================
# Utility Targets
# ==============================================================================

.PHONY: clean
clean: ## Clean up containers, volumes, and build artifacts
	@echo -e "$(YELLOW)Cleaning up containers and volumes...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) down -v 2>/dev/null || true
	@podman-compose -f $(COMPOSE_PROD) down -v 2>/dev/null || true
	@echo -e "$(YELLOW)Removing project images...$(RESET)"
	@podman rmi $(IMAGE_NAME):latest 2>/dev/null || true
	@podman rmi $(IMAGE_NAME):dev 2>/dev/null || true
	@echo -e "$(YELLOW)Removing build artifacts...$(RESET)"
	@rm -rf .next node_modules/.cache 2>/dev/null || true
	@echo -e "$(GREEN)Cleanup complete!$(RESET)"

.PHONY: clean-all
clean-all: clean ## Deep clean including node_modules
	@echo -e "$(RED)Performing deep clean (including node_modules)...$(RESET)"
	@rm -rf node_modules package-lock.json
	@echo -e "$(GREEN)Deep clean complete!$(RESET)"

.PHONY: prune
prune: ## Prune unused Podman resources
	@echo -e "$(YELLOW)Pruning unused Podman resources...$(RESET)"
	@podman system prune -f
	@podman volume prune -f
	@echo -e "$(GREEN)Prune complete!$(RESET)"

.PHONY: ps
ps: ## Show running containers
	@echo -e "$(CYAN)Running containers:$(RESET)"
	@podman ps --filter "label=com.wolfguard.project=$(PROJECT_NAME)"

.PHONY: images
images: ## Show project images
	@echo -e "$(CYAN)Project images:$(RESET)"
	@podman images | grep -E "$(PROJECT_NAME)|REPOSITORY" || echo "No project images found"

.PHONY: install
install: ## Install dependencies inside development container
	@echo -e "$(CYAN)Installing dependencies...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm install

.PHONY: update
update: ## Update dependencies inside development container
	@echo -e "$(CYAN)Updating dependencies...$(RESET)"
	@podman-compose -f $(COMPOSE_DEV) exec node-dev npm update

.PHONY: info
info: ## Show project information
	@echo -e "$(CYAN)╔══════════════════════════════════════════════════════════════╗$(RESET)"
	@echo -e "$(CYAN)║$(RESET)  $(MAGENTA)WolfGuard Website - Project Information$(RESET)                $(CYAN)║$(RESET)"
	@echo -e "$(CYAN)╚══════════════════════════════════════════════════════════════╝$(RESET)"
	@echo -e "$(BLUE)Project Name:$(RESET)      $(PROJECT_NAME)"
	@echo -e "$(BLUE)Image Name:$(RESET)        $(IMAGE_NAME)"
	@echo -e "$(BLUE)Build Date:$(RESET)        $(BUILD_DATE)"
	@echo -e "$(BLUE)Git Commit:$(RESET)        $(GIT_COMMIT)"
	@echo -e "$(BLUE)Containerfile:$(RESET)     $(CONTAINERFILE)"
	@echo -e "$(BLUE)Dev Containerfile:$(RESET) $(CONTAINERFILE_DEV)"
	@echo -e "$(BLUE)Compose Dev:$(RESET)       $(COMPOSE_DEV)"
	@echo -e "$(BLUE)Compose Prod:$(RESET)      $(COMPOSE_PROD)"
	@echo ""

# ==============================================================================
# Health Check Targets
# ==============================================================================

.PHONY: health
health: ## Check health of running containers
	@echo -e "$(CYAN)Checking container health...$(RESET)"
	@podman ps --filter "label=com.wolfguard.project=$(PROJECT_NAME)" --format "table {{.Names}}\t{{.Status}}\t{{.Health}}"

.PHONY: stats
stats: ## Show container resource usage statistics
	@echo -e "$(CYAN)Container resource usage:$(RESET)"
	@podman stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" \
		$(shell podman ps --filter "label=com.wolfguard.project=$(PROJECT_NAME)" -q)

# ==============================================================================
# Special Targets
# ==============================================================================

.DEFAULT_GOAL := help
