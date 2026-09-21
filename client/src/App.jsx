import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PlatformProvider } from './context/PlatformContext';
import CameraFlashTransition from './components/common/CameraFlashTransition';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
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
  );
}

export default App;

