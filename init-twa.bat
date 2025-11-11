@echo off
cd /d "E:\Pwa App\twa-app"
echo localhost | npx @bubblewrap/cli init --manifest="http://localhost:5176/manifest.json"