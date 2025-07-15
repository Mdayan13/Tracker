#!/bin/bash

echo "Hey dude 👋 Installing your CLI..."

# Step 1: Install dependencies
npm install

# Step 2: Make the JS file executable
chmod +x babe.js

# Step 3: Create or overwrite symlink in ~/.local/bin
ln -sf "$(pwd)/babe.js" ~/.local/bin/babe

# Step 4: (Optional but safe) Ensure symlink is executable
chmod +x ~/.local/bin/babe

echo "✅ Installed! You can now run: babe gasPrice"

# Ensure ~/.local/bin is in PATH
if ! echo "$PATH" | grep -q "$HOME/.local/bin"; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
  source ~/.bashrc
  echo "✅ Added ~/.local/bin to PATH"
fi
