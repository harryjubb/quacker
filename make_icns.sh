#!/usr/bin/env bash

# Make a .icns bundle for OS X

# Adapted from https://apple.stackexchange.com/a/402653/133503
# under https://creativecommons.org/licenses/by-sa/3.0/
# with modifications to the original

mkdir src/img/1F986_black_filled.iconset
sips -z 16 16     src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_16x16.png
sips -z 32 32     src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_16x16@2x.png
sips -z 32 32     src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_32x32.png
sips -z 64 64     src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_32x32@2x.png
sips -z 128 128   src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_128x128.png
sips -z 256 256   src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_128x128@2x.png
sips -z 256 256   src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_256x256.png
sips -z 512 512   src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_256x256@2x.png
sips -z 512 512   src/img/1F986_black_filled.png --out src/img/1F986_black_filled.iconset/icon_512x512.png
cp src/img/1F986_black_filled.png src/img/1F986_black_filled.iconset/icon_512x512@2x.png
iconutil -c icns src/img/1F986_black_filled.iconset
rm -R src/img/1F986_black_filled.iconset