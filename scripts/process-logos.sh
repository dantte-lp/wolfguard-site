#!/bin/bash
set -e

# Process WolfGuard logos
# Auto-trim, create multiple sizes, optimize

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_DIR="$SCRIPT_DIR/public"

cd "$PUBLIC_DIR"

echo "🎨 Processing WolfGuard logos..."
echo ""

# Process each logo
for i in 1 2 3; do
    INPUT="logo-$i.png"

    if [ ! -f "$INPUT" ]; then
        echo "❌ $INPUT not found, skipping"
        continue
    fi

    echo "📝 Processing $INPUT..."

    # 1. Auto-trim (remove transparent/white borders)
    TRIMMED="logo-$i-trimmed.png"
    convert "$INPUT" -trim +repage "$TRIMMED"

    # 2. Get dimensions after trim
    DIMS=$(identify -format "%wx%h" "$TRIMMED")
    echo "   Trimmed dimensions: $DIMS"

    # 3. Create square version (add padding if needed)
    SQUARE="logo-$i-square.png"
    convert "$TRIMMED" -background transparent -gravity center -extent 1:1 "$SQUARE"

    # 4. Create various sizes from square version

    # Favicon sizes
    convert "$SQUARE" -resize 16x16 "favicon-$i-16.png"
    convert "$SQUARE" -resize 32x32 "favicon-$i-32.png"
    convert "$SQUARE" -resize 192x192 "favicon-$i-192.png"
    convert "$SQUARE" -resize 512x512 "favicon-$i-512.png"

    # Logo sizes for website
    convert "$SQUARE" -resize 64x64 "logo-$i-64.png"
    convert "$SQUARE" -resize 128x128 "logo-$i-128.png"
    convert "$SQUARE" -resize 256x256 "logo-$i-256.png"

    # SVG version (using autotrace if available, otherwise skip)
    if command -v autotrace &> /dev/null; then
        autotrace -output-file "logo-$i.svg" -output-format svg "$SQUARE" 2>/dev/null || true
    fi

    echo "   ✅ Created multiple sizes"
done

echo ""
echo "📊 File sizes:"
ls -lh logo-*.png favicon-*.png 2>/dev/null | awk '{print $9, $5}'

echo ""
echo "✨ Logo processing complete!"
echo ""
echo "Available logo variants:"
echo "  - logo-1, logo-2, logo-3 (original 1024x1024)"
echo "  - logo-X-trimmed.png (auto-trimmed)"
echo "  - logo-X-square.png (square with padding)"
echo "  - logo-X-64/128/256.png (website logos)"
echo "  - favicon-X-16/32/192/512.png (favicon sizes)"
echo ""
echo "Recommended usage:"
echo "  1. Choose your preferred logo variant (1, 2, or 3)"
echo "  2. Copy logo-X-256.png → logo.png (main logo)"
echo "  3. Copy favicon-X-32.png → favicon.png (favicon)"
echo "  4. Update index.html with new favicon"
