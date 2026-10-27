import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CinematicCosmosBackground from '../common/CinematicCosmosBackground';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#f8fafc] relative selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden max-w-full w-full">
      <CinematicCosmosBackground />
      <Navbar />
      <main className="flex-1 relative z-10 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

