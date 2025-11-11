const { spawn } = require('child_process');

// Change to the twa-app directory
process.chdir('E:/Pwa App/twa-app');

// Spawn the bubblewrap process
const bubblewrap = spawn('npx', ['@bubblewrap/cli', 'init', '--manifest=http://localhost:5176/manifest.json'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Provide inputs sequentially
const inputs = [
  'localhost\n',  // Domain
  '/\n',          // URL path
  'y\n',          // Continue with default options
  'Biometric PWA\n',  // App name
  'com.example.biometricpwa\n',  // Package name
  '1.0.0\n',      // Version name
  '1\n',          // Version code
  'Biometric PWA\n',  // Launcher name
  '#000000\n',    // Theme color
  '#ffffff\n',    // Background color
  'y\n',          // Include splash screen
  'y\n',          // Include notification delegation
  'y\n',          // Include location delegation
  'y\n'           // Include Play Billing
];

let inputIndex = 0;

bubblewrap.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  
  // Check if we need to provide input
  if (output.includes('?') && inputIndex < inputs.length) {
    bubblewrap.stdin.write(inputs[inputIndex]);
    inputIndex++;
  }
});

bubblewrap.on('close', (code) => {
  console.log(`Bubblewrap process exited with code ${code}`);
});