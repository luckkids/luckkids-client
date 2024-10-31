#!/bin/bash
# clean.sh
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "\n${YELLOW}==> $1${NC}"
}

print_step "Cleaning project..."

# Clean yarn
print_step "Cleaning yarn cache and node_modules..."
rm -rf node_modules
yarn cache clean

# Clean iOS
print_step "Cleaning iOS builds and pods..."
cd ios
rm -rf Pods
rm -rf build
pod cache clean --all
cd ..

echo -e "${GREEN}Clean completed successfully!${NC}"
