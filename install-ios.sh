#!/bin/bash

# Colors for console output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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

# Initial requirement checks
print_step "Checking requirements..."
check_command "yarn"
check_command "pod"

# Install JavaScript dependencies
print_step "Installing JavaScript dependencies..."
yarn install || handle_error "Failed to install JavaScript dependencies"

# Navigate to iOS directory and install pods
print_step "Installing iOS dependencies..."
cd ios || handle_error "iOS directory not found"
pod install --repo-update || handle_error "Failed to install CocoaPods dependencies"
cd ..

# Check for common iOS setup issues
print_step "Checking iOS setup..."
if [ ! -f "ios/Podfile.lock" ]; then
    echo -e "${YELLOW}Warning: Podfile.lock not found. This might cause version inconsistencies.${NC}"
fi

if [ ! -d "ios/Pods" ]; then
    echo -e "${YELLOW}Warning: Pods directory not found. There might be an issue with pod installation.${NC}"
fi

# Success message with next steps
echo -e "${GREEN}Installation completed successfully!${NC}"
echo -e "\nNext steps:"
echo -e "1. Open ${YELLOW}ios/[YourProject].xcworkspace${NC} in Xcode"
echo -e "2. Select your target device"
echo -e "3. Build and run the project (⌘ + R)"
echo -e "\nTo run the app from the command line:"
echo -e "yarn ios"