#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🔧 Installing Chromium and dependencies..."

# Install Chromium and dependencies
apt-get update
apt-get install -y \
  chromium \
  chromium-browser \
  chromium-sandbox \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils \
  --no-install-recommends

# Detect Chromium executable path
echo "🔍 Detecting Chromium executable path..."
if [ -f "/usr/bin/chromium-browser" ]; then
  CHROME_PATH="/usr/bin/chromium-browser"
elif [ -f "/usr/bin/chromium" ]; then
  CHROME_PATH="/usr/bin/chromium"
elif [ -f "/usr/bin/google-chrome" ]; then
  CHROME_PATH="/usr/bin/google-chrome"
elif [ -f "/usr/bin/google-chrome-stable" ]; then
  CHROME_PATH="/usr/bin/google-chrome-stable"
else
  echo "❌ Could not find Chromium executable!"
  echo "Available binaries in /usr/bin:"
  ls -la /usr/bin | grep -i chrome || true
  ls -la /usr/bin | grep -i chromium || true
  exit 1
fi

echo "✅ Found Chromium at: $CHROME_PATH"
echo "$CHROME_PATH" > .chrome_path

# Verify executable
$CHROME_PATH --version || echo "⚠️ Warning: Could not verify Chrome version"

# Clean up
rm -rf /var/lib/apt/lists/*

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

echo "✅ Build completed successfully!"
