import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PlatformProvider } from './context/PlatformContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import CameraFlashTransition from './components/common/CameraFlashTransition';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <PlatformProvider>
            <ToastProvider>
              {/* Cinematic Camera Shutter & Strobe Flash Transition */}
              <CameraFlashTransition />
              <AppRoutes />
            </ToastProvider>
          </PlatformProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

