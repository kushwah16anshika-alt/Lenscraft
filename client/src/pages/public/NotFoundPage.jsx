import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Home } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] mb-6 shadow-2xs">
        <Camera className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h1 className="text-6xl font-serif font-extrabold text-[#171717] mb-2">404</h1>
      <h2 className="text-lg font-serif font-bold text-[#171717] mb-2">Frame Out of Focus / Page Not Found</h2>
      <p className="text-xs text-[#6B6258] max-w-md mb-8 leading-relaxed">
        The portfolio or directory page you are attempting to visit could not be located or may have been archived.
      </p>
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
