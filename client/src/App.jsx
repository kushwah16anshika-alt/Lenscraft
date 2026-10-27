import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PlatformProvider } from './context/PlatformContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import CameraFlashTransition from './components/common/CameraFlashTransition';
import FloatingAssistantWidget from './components/common/FloatingAssistantWidget';
import AppRoutes from './routes/AppRoutes';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'lenscraft-google-client.apps.googleusercontent.com';

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <AuthProvider>
            <PlatformProvider>
              <ToastProvider>
                {/* Cinematic Camera Shutter & Strobe Flash Transition */}
                <CameraFlashTransition />
                <AppRoutes />
                {/* Technology 3: Floating Conversational AI Assistant */}
                <FloatingAssistantWidget />
              </ToastProvider>
            </PlatformProvider>
          </AuthProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;

