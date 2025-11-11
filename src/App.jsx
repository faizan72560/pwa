import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const credentialsRef = useRef(null);

  useEffect(() => {
    // Check if biometric authentication is supported
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsBiometricSupported(available);
      } catch (err) {
        console.error('Error checking biometric support:', err);
        setIsBiometricSupported(false);
      }
    } else {
      setIsBiometricSupported(false);
    }
  };

  const registerBiometricCredentials = async () => {
    if (!isBiometricSupported) {
      alert('Biometric authentication is not supported on this device');
      return;
    }

    try {
      // Create a challenge for the authenticator
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      // In a real app, you would send this request to your server


      // Create credential creation options
      const credentialCreationOptions = {
        publicKey: {
          challenge: challenge,
          rp: {
            name: 'Biometric PWA App',
            id: window.location.hostname
          },
          user: {
            id: new Uint8Array(16),
            name: 'user@example.com',
            displayName: 'User'
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required'
          },
          timeout: 60000,
          attestation: 'direct'
        }
      };

      // Create the credential
      const credential = await navigator.credentials.create(credentialCreationOptions);
      credentialsRef.current = credential;
      setRegistrationSuccess(true);
      alert('Biometric registered successfully! You can now login with biometrics.');
    } catch (error) {
      console.error('Biometric registration failed:', error);
      alert('Biometric registration failed: ' + error.message);
    }
  };

  const handleBiometricLogin = async () => {
    if (!isBiometricSupported) {
      alert('Biometric authentication is not supported on this device');
      return;
    }

    if (!registrationSuccess) {
      alert('Please register your biometric first');
      return;
    }

    try {
      // Create a challenge for the authenticator
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Get credential request options
      const credentialRequestOptions = {
        publicKey: {
          challenge: challenge,
          allowCredentials: [],
          userVerification: 'required',
          timeout: 60000
        }
      };

      // Get the credential
      const assertion = await navigator.credentials.get(credentialRequestOptions);
      
      // In a real app, you would verify this assertion on your server
      console.log('Authentication successful:', assertion);
      setCurrentScreen('home');
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      alert('Biometric authentication failed: ' + error.message);
    }
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    // Simple validation for demo purposes
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="app">
      {currentScreen === 'welcome' && (
        <div className="screen welcome-screen">
          <h1>Biometric PWA App</h1>
          <p>This app uses biometric authentication for secure access</p>
          {!registrationSuccess && (
            <button 
              onClick={registerBiometricCredentials}
              disabled={!isBiometricSupported}
              className="biometric-btn"
            >
              {isBiometricSupported ? 'Register Biometric' : 'Biometric Not Supported'}
            </button>
          )}
          {registrationSuccess && (
            <button 
              onClick={handleBiometricLogin}
              className="biometric-btn"
            >
              Login with Biometric
            </button>
          )}
          <button onClick={() => setCurrentScreen('login')} className="login-btn">
            Login with Password
          </button>
        </div>
      )}

      {currentScreen === 'login' && (
        <div className="screen login-screen">
          <h2>Login</h2>
          <form onSubmit={handleFormLogin}>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <button onClick={() => setCurrentScreen('welcome')} className="back-btn">
            Back
          </button>
        </div>
      )}

      {currentScreen === 'home' && (
        <div className="screen home-screen">
          <h2>Home</h2>
          <p>Welcome to your secure app!</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;


