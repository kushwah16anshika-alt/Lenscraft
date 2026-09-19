import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture, Home, Compass, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center relative z-10">
      {/* Glow orb */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
        <Aperture className="w-10 h-10 animate-spin-slow text-cyan-400" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>ERROR 404 · FRAME OUT OF FOCUS</span>
      </div>

      <h1 className="text-6xl sm:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 mb-3 tracking-tight">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
        The Focal Plane Could Not Be Located
      </h2>

      <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
        The talent portfolio, shoot gallery, or directory coordinates you are attempting to visit might have been archived or moved to a different milestone.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>
        </Link>
        <Link to="/photographers">
          <Button variant="secondary" size="md">
            <Compass className="w-4 h-4 mr-2 text-cyan-400" />
            <span>Explore All Creators</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
