#!/bin/bash

echo "Hey dude 👋 Installing your CLI..."

# Step 1: Install dependencies
npm install

# Step 2: Make the JS file executable
chmod +x babe.js

# Step 3: Create or overwrite symlink in ~/.local/bin
mkdir ~/.tracker
mkdir ~/.tracker/bin
ln -sf "$(pwd)/babe.js" ~/.tracker/bin/babe

# Step 4: (Optional but safe) Ensure symlink is executable
chmod +x ~/.tracker/bin/babe

echo "✅ Installed! You can now run: babe gasPrice"

# Ensure ~/.local/bin is in PATH
if ! echo "$PATH" | grep -q "$HOME/.tracker/bin"; then
  echo 'export PATH="$HOME/.tracker/bin:$PATH"' >> ~/.bashrc
  source ~/.bashrc
  echo "✅ Added ~/.tracker/bin to PATH"
fi
