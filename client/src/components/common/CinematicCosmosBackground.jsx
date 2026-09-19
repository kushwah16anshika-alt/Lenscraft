import React, { useEffect, useRef } from 'react';

const CinematicCosmosBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 10000), 160);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#38bdf8' : Math.random() > 0.5 ? '#818cf8' : '#ffffff',
    }));

    // Floating cinematic dust particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? 'rgba(0, 210, 255, ' : 'rgba(129, 140, 248, ',
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        const currentAlpha =
          star.alpha + Math.sin(time * 2 + star.twinklePhase) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.shadowBlur = star.radius > 1 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Draw Floating Dust Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00d2ff';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Canvas for Starfield & Floating Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Atmospheric Luminous Light Orbs */}
      <div
        className="absolute -top-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[160px] pointer-events-none animate-pulse-glow"
        style={{ animationDuration: '11s', animationDelay: '2s' }}
      />
      <div
        className="absolute top-[70%] left-[5%] w-[800px] h-[800px] rounded-full bg-sky-500/10 blur-[180px] pointer-events-none animate-pulse-glow"
        style={{ animationDuration: '14s', animationDelay: '4s' }}
      />
      <div
        className="absolute -bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none animate-pulse-glow"
        style={{ animationDuration: '9s', animationDelay: '1s' }}
      />

      {/* Subtle Grid / Horizon Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-transparent opacity-40 pointer-events-none" />
    </div>
  );
};

export default CinematicCosmosBackground;
