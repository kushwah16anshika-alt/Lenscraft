import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PlatformProvider } from './context/PlatformContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlatformProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </PlatformProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
