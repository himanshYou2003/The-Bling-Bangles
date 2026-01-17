#!/bin/bash

# Create placeholder images for all 50 bangles
# Each bangle gets 3 images (different angles)

echo "Creating placeholder images for bangles..."

for i in {1..50}; do
  # Create 3 images for each bangle (angle 1, 2, 3)
  for angle in {1..3}; do
    # Create a simple SVG placeholder
    cat > "public/images/bangles/$i/$angle.svg" << EOF
<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad$i" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E6C78B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#D4A373;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="#0B0B0B"/>
  <circle cx="400" cy="500" r="300" fill="url(#grad$i)" opacity="0.8"/>
  <text x="400" y="480" font-family="Arial" font-size="48" fill="#FFFFFF" text-anchor="middle">Bangle #$i</text>
  <text x="400" y="540" font-family="Arial" font-size="32" fill="#E6C78B" text-anchor="middle">Angle $angle</text>
</svg>
EOF
  done
  echo "Created images for bangle $i"
done

echo "All placeholder images created!"
