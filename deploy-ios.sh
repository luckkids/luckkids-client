#!/bin/bash

# Colors for console output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Error handling function
handle_error() {
    echo -e "${RED}Error: $1${NC}"
    exit 1
}

# Print step message
print_step() {
    echo -e "\n${YELLOW}==> $1${NC}"
}

# Check if command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        handle_error "$1 is not installed. Please install it first."
    fi
}

# Initial checks
check_command "yarn"
check_command "pod"
check_command "fastlane"

# Clean up previous builds (optional)
# if [ "$1" == "--clean" ]; then
#     print_step "Cleaning previous builds..."
#     rm -rf node_modules
#     rm -rf ios/Pods
#     rm -rf ios/build
#     yarn cache clean
#     cd ios && pod cache clean --all && cd ..
# fi

# Install JavaScript dependencies
print_step "Installing JavaScript dependencies..."
yarn install || handle_error "Failed to install JavaScript dependencies"

# Navigate to iOS directory and install pods
print_step "Installing iOS dependencies..."
cd ios || handle_error "iOS directory not found"
pod install || handle_error "Failed to install pods"

# Run Fastlane for iOS
print_step "Running iOS Fastlane..."
fastlane beta || handle_error "iOS Fastlane failed"

echo -e "${GREEN}iOS build process completed successfully!${NC}"