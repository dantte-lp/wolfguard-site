#!/bin/bash

echo "=== Analyzing WolfGuard Site HTML Structure ==="
echo ""

# Fetch the HTML
HTML=$(curl -s http://localhost:8080/)

echo "1. Checking main sections presence..."
echo ""

# Check for each section
for section in "features" "quickstart" "links"; do
    if echo "$HTML" | grep -q "id=\"$section\""; then
        echo "✓ Section #$section found"
    else
        echo "✗ Section #$section NOT FOUND"
    fi
done

echo ""
echo "2. Analyzing container structure for each section..."
echo ""

# Extract and analyze each section's container structure
echo "=== Hero Section (look for gradient background) ==="
echo "$HTML" | grep -o 'class="[^"]*min-h-\[90vh\][^"]*"' | head -1
echo ""

echo "=== Features Section ==="
echo "$HTML" | grep -A 2 'id="features"' | head -3
echo ""

echo "=== QuickStart Section ==="
echo "$HTML" | grep -A 2 'id="quickstart"' | head -3
echo ""

echo "=== Links Section ==="
echo "$HTML" | grep -A 2 'id="links"' | head -3
echo ""

echo "3. Looking for max-w-7xl mx-auto containers..."
echo ""
echo "$HTML" | grep -o '<div class="[^"]*max-w-7xl mx-auto[^"]*"' | head -5

echo ""
echo "4. Checking for potential CSS issues..."
echo ""
echo "Extracting CSS file links:"
echo "$HTML" | grep -o '<link.*\.css[^>]*>' | head -5