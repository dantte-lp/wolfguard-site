#!/bin/bash
set -e

# Правильная обрезка логотипов WolfGuard по содержимому
# Убираем пустое пространство, оставляя только рисунок с минимальными отступами

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_DIR="$SCRIPT_DIR/public"

cd "$PUBLIC_DIR"

echo "✂️  Правильная обрезка логотипов WolfGuard..."
echo ""

# Процесс обрезки для каждого логотипа
for i in 1 2 3; do
    INPUT="logo-$i.png"

    if [ ! -f "$INPUT" ]; then
        echo "❌ $INPUT not found"
        continue
    fi

    echo "📐 Обрабатываю $INPUT..."

    # 1. Автоматическая обрезка с учетом темного фона и свечения
    # -fuzz 15% - учитывает градиенты и свечение вокруг объектов
    # -trim - обрезает пустое пространство
    # +repage - сбрасывает виртуальный canvas
    CROPPED="logo-$i-cropped.png"
    magick "$INPUT" -fuzz 15% -trim +repage "$CROPPED"

    # Получаем размеры после обрезки
    DIMS=$(magick identify -format "%wx%h" "$CROPPED")
    echo "   Размер после обрезки: $DIMS"

    # 2. Добавляем небольшие отступы (2% от размера) для эстетики
    PADDED="logo-$i-padded.png"
    magick "$CROPPED" -bordercolor none -border 2%x2% "$PADDED"

    DIMS_PADDED=$(magick identify -format "%wx%h" "$PADDED")
    echo "   Размер с отступами: $DIMS_PADDED"

    # 3. Создаем версии разных размеров из обрезанного варианта

    # Для иконки (только иконка волка, без текста) - если нужно
    # Создаем квадратную версию для favicon/иконок
    ICON="logo-$i-icon.png"

    # Определяем, что обрезать для иконки в зависимости от варианта
    if [ "$i" -eq 3 ]; then
        # logo-3 - вертикальный, берем только верхнюю часть (щит)
        magick "$PADDED" -gravity North -crop 100%x65%+0+0 +repage -resize 512x512 "$ICON"
    else
        # logo-1 и logo-2 - горизонтальные, берем левую часть (иконка)
        magick "$PADDED" -gravity West -crop 30%x100%+0+0 +repage -resize 512x512 "$ICON"
    fi

    # Favicon sizes (от иконки)
    magick "$ICON" -resize 16x16 "favicon-$i-16.png"
    magick "$ICON" -resize 32x32 "favicon-$i-32.png"
    magick "$ICON" -resize 192x192 "favicon-$i-192.png"
    magick "$ICON" -resize 512x512 "favicon-$i-512.png"

    # Логотипы для сайта (полные с текстом)
    magick "$PADDED" -resize 256x "logo-$i-256.png"
    magick "$PADDED" -resize 128x "logo-$i-128.png"
    magick "$PADDED" -resize 64x "logo-$i-64.png"

    # Полноразмерная версия
    cp "$PADDED" "logo-$i-full.png"

    echo "   ✅ Создано: cropped, padded, icon, + размеры"
    echo ""
done

echo "📊 Сравнение размеров:"
echo ""
echo "Оригиналы:"
ls -lh logo-1.png logo-2.png logo-3.png 2>/dev/null | awk '{print "  " $9 ": " $5}'

echo ""
echo "Обрезанные с отступами:"
ls -lh logo-*-padded.png 2>/dev/null | awk '{print "  " $9 ": " $5}'

echo ""
echo "Иконки (512x512):"
ls -lh logo-*-icon.png 2>/dev/null | awk '{print "  " $9 ": " $5}'

echo ""
echo "Размеры для сайта:"
ls -lh logo-*-256.png logo-*-128.png logo-*-64.png 2>/dev/null | awk '{print "  " $9 ": " $5}'

echo ""
echo "✨ Обрезка завершена!"
echo ""
echo "Рекомендации по использованию:"
echo ""
echo "Для ГОРИЗОНТАЛЬНОГО логотипа (header, footer):"
echo "  - Используй logo-2 (самый компактный)"
echo "  - Файл: logo-2-padded.png или logo-2-128.png"
echo ""
echo "Для ИКОНКИ/FAVICON:"
echo "  - Используй logo-3-icon.png (большой детальный щит)"
echo "  - Или logo-2-icon.png (простая иконка)"
echo ""
echo "Для социальных сетей (квадрат):"
echo "  - logo-3-icon.png (512x512)"
echo ""
