import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CinematicCosmosBackground from '../common/CinematicCosmosBackground';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#f8fafc] relative selection:bg-sky-500/30 selection:text-sky-200">
      <CinematicCosmosBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

