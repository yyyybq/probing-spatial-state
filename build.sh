#!/bin/bash
# Build index.html (a standalone page for GitHub Pages or local viewing) from page.html,
# the body-only source that is also published as the Claude artifact preview.
cd "$(dirname "$0")" || exit 1
{
  echo '<!doctype html>'
  echo '<html lang="en">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  sed -n '1,/<!-- body -->/p' page.html | sed '$d'
  echo '</head>'
  echo '<body>'
  sed -n '/<!-- body -->/,$p' page.html | sed '1d'
  echo '</body>'
  echo '</html>'
} > index.html
echo "wrote $(pwd)/index.html ($(wc -c < index.html) bytes)"
