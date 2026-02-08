#!/bin/bash
# Test SSG routing configuration
# Run from project root: bash scripts/test-routing.sh

set -e

echo "Testing SSG routing configuration..."
echo ""

DIST="dist"
if [ ! -d "$DIST" ]; then
  echo "❌ dist/ not found. Run: npm run build"
  exit 1
fi

# File structure check
echo "=== File structure ==="
for path in "index.html" "servicios/index.html" "nosotros/index.html" "contacto/index.html"; do
  if [ -f "$DIST/$path" ]; then
    echo "  ✅ $path exists"
  else
    echo "  ❌ $path missing"
  fi
done

if [ -f "$DIST/.htaccess" ]; then
  echo "  ✅ .htaccess in dist/"
else
  echo "  ⚠️  .htaccess not in dist/ (copy manually or run build)"
fi
echo ""

# Routing expectations
echo "=== Routing expectations ==="
echo "  /              → index.html (home)"
echo "  /servicios     → servicios/index.html (if exists) or index.html (SPA)"
echo "  /nosotros      → nosotros/index.html (if exists) or index.html (SPA)"
echo "  /contacto      → contacto/index.html (if exists) or index.html (SPA)"
echo "  /other         → index.html (SPA fallback)"
echo "  /assets/*      → serve file if exists"
echo ""

# Optional: quick HTTP test if Python server is running
if command -v curl >/dev/null 2>&1; then
  echo "=== Quick URL test (requires server on port 8000) ==="
  echo "  Start server: cd dist && python3 -m http.server 8000"
  echo "  Then run: curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/"
  echo ""
fi

echo "Done. For full Apache test use: https://htaccess.madewithlove.com/"
