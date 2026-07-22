import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  mode: 'web2' | 'web3';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    // More nodes in Web3 to draw the decentralized network grid
    const particleCount = mode === 'web2' ? 45 : 75;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const colors = mode === 'web2'
        ? ['rgba(37, 99, 235, 0.08)', 'rgba(14, 165, 233, 0.06)', 'rgba(71, 85, 105, 0.04)']
        : ['rgba(182, 0, 168, 0.18)', 'rgba(0, 245, 255, 0.15)', 'rgba(16, 185, 129, 0.12)'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (mode === 'web2' ? 0.25 : 0.45),
          vy: (Math.random() - 0.5) * (mode === 'web2' ? 0.25 : 0.45),
          size: Math.random() * (mode === 'web2' ? 5 : 3.5) + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render ambient radial gradient behind the particles
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 200,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );

      if (mode === 'web2') {
        gradient.addColorStop(0, '#FAFBFD');
        gradient.addColorStop(0.5, '#F1F5F9');
        gradient.addColorStop(1, '#E2E8F0');
      } else {
        gradient.addColorStop(0, '#0F0712'); // Dark purple glow center
        gradient.addColorStop(0.5, '#0C0C0C');
        gradient.addColorStop(1, '#050505');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & Draw Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby nodes in Web3 mode to form a decentralized web network
        if (mode === 'web3') {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect if within 120px range
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              // Fade connection line opacity based on distance
              ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
