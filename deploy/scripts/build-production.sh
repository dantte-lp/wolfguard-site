#!/usr/bin/env bash

###############################################################################
# Production Build Script for WolfGuard Site
# Uses Buildah to build OCI-compliant container images
###############################################################################

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IMAGE_NAME="${IMAGE_NAME:-localhost/wolfguard-site}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
CONTAINERFILE="${CONTAINERFILE:-${PROJECT_ROOT}/deploy/config/Containerfile.prod}"
BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
GIT_COMMIT=$(git -C "${PROJECT_ROOT}" rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_dependencies() {
    log_info "Checking dependencies..."

    if ! command -v buildah &> /dev/null; then
        log_error "buildah is not installed. Please install buildah."
        exit 1
    fi

    if ! command -v podman &> /dev/null; then
        log_error "podman is not installed. Please install podman."
        exit 1
    fi

    log_success "All dependencies found"
}

build_image() {
    log_info "Building production image..."
    log_info "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
    log_info "Containerfile: ${CONTAINERFILE}"
    log_info "Build date: ${BUILD_DATE}"
    log_info "Git commit: ${GIT_COMMIT}"

    # Build with buildah
    buildah bud \
        --file "${CONTAINERFILE}" \
        --tag "${IMAGE_NAME}:${IMAGE_TAG}" \
        --build-arg BUILD_DATE="${BUILD_DATE}" \
        --build-arg GIT_COMMIT="${GIT_COMMIT}" \
        --layers \
        --force-rm \
        "${PROJECT_ROOT}"

    log_success "Image built successfully"
}

inspect_image() {
    log_info "Inspecting image..."

    # Get image size
    IMAGE_SIZE=$(podman images --format "{{.Size}}" "${IMAGE_NAME}:${IMAGE_TAG}")
    log_info "Image size: ${IMAGE_SIZE}"

    # Show image details
    podman inspect "${IMAGE_NAME}:${IMAGE_TAG}" | grep -A 3 "Labels"
}

test_image() {
    log_info "Testing image..."

    # Check if image can be started
    CONTAINER_ID=$(podman run -d --rm -p 3000:3000 "${IMAGE_NAME}:${IMAGE_TAG}")

    log_info "Container started: ${CONTAINER_ID}"

    # Wait for container to be ready
    sleep 5

    # Test health endpoint
    if curl -f http://localhost:3000/ &> /dev/null; then
        log_success "Image test passed"
    else
        log_error "Image test failed - service not responding"
        podman stop "${CONTAINER_ID}"
        exit 1
    fi

    # Stop test container
    podman stop "${CONTAINER_ID}"
    log_info "Test container stopped"
}

show_usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Build production container image for WolfGuard Site using Buildah.

OPTIONS:
    -h, --help          Show this help message
    -t, --tag TAG       Image tag (default: latest)
    -n, --name NAME     Image name (default: localhost/wolfguard-site)
    --no-test           Skip image testing
    --push REGISTRY     Push image to registry after build

EXAMPLES:
    # Build with default settings
    $0

    # Build with custom tag
    $0 --tag v1.0.0

    # Build and push to registry
    $0 --push ghcr.io/dantte-lp/wolfguard-site

ENVIRONMENT VARIABLES:
    IMAGE_NAME          Override default image name
    IMAGE_TAG           Override default image tag
    CONTAINERFILE       Path to Containerfile (default: deploy/config/Containerfile.prod)

EOF
}

# Main execution
main() {
    local SKIP_TEST=false
    local PUSH_REGISTRY=""

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_usage
                exit 0
                ;;
            -t|--tag)
                IMAGE_TAG="$2"
                shift 2
                ;;
            -n|--name)
                IMAGE_NAME="$2"
                shift 2
                ;;
            --no-test)
                SKIP_TEST=true
                shift
                ;;
            --push)
                PUSH_REGISTRY="$2"
                shift 2
                ;;
            *)
                log_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done

    echo ""
    log_info "========================================="
    log_info "WolfGuard Site - Production Build"
    log_info "========================================="
    echo ""

    check_dependencies
    build_image
    inspect_image

    if [[ "${SKIP_TEST}" == "false" ]]; then
        test_image
    else
        log_warning "Skipping image test"
    fi

    if [[ -n "${PUSH_REGISTRY}" ]]; then
        log_info "Pushing image to ${PUSH_REGISTRY}..."
        PUSH_TAG="${PUSH_REGISTRY}:${IMAGE_TAG}"
        podman tag "${IMAGE_NAME}:${IMAGE_TAG}" "${PUSH_TAG}"
        podman push "${PUSH_TAG}"
        log_success "Image pushed: ${PUSH_TAG}"
    fi

    echo ""
    log_success "========================================="
    log_success "Build completed successfully!"
    log_success "========================================="
    log_info "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
    log_info "To run: podman run -d -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
    echo ""
}

# Run main function
main "$@"
