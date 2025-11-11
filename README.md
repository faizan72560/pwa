# PWA Biometric Authentication App

## Features
- Progressive Web App (PWA) that can be installed on mobile devices
- Biometric authentication using WebAuthn API (fingerprint, face recognition)
- React-based frontend with Vite tooling

## How to Use

### Development
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Visit `http://localhost:5174` in your browser

### Production Build
1. Run `npm run build` to create a production build
2. The built files will be in the `dist` folder

### Installing as PWA
1. Open the app in a modern browser (Chrome, Edge, Firefox, Safari)
2. Look for the install prompt or click the install icon in the address bar
3. Follow the prompts to install the app on your device

## Biometric Authentication
The app uses the Web Authentication API (WebAuthn) for biometric authentication:
- On first use, you'll need to register your biometric credentials
- Subsequent logins can use biometric authentication
- Works with fingerprint sensors, face recognition, and other platform authenticators

## Generating APK for Android
To generate an APK file for Android devices:

1. Visit [PWA Builder](https://www.pwabuilder.com/)
2. Enter your app's URL
3. Follow the steps to generate an Android package
4. Download the generated APK file

Alternatively, you can use Trusted Web Activities (TWA):
1. Create a Digital Asset Links file
2. Use Android Studio to create a TWA wrapper
3. Build the APK using Android Studio

## Browser Support
- Chrome 67+ (Android and Desktop)
- Edge 18+ (Android and Desktop)
- Firefox 60+ (Desktop)
- Safari 13+ (macOS)