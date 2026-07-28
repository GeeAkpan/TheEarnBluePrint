import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface AppleScrollMotionGraphicProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const AppleScrollMotionGraphic: React.FC<AppleScrollMotionGraphicProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track page scroll progress relative to hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring physics for 60fps Apple-like motion feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  });

  // Apple-style 3D Transform mapping as user scrolls down
  const rotateX = useTransform(smoothProgress, [0, 0.45, 0.9], [22, 5, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-8, 2, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 0.95], [0.86, 0.98, 1.05]);
  const frameY = useTransform(smoothProgress, [0, 1], ['0px', '45px']);
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [0.95, 0.95, 0.8]);

  // Parallax layers for internal graphic and reflections
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1.08, 1.02]);
  const glareX = useTransform(smoothProgress, [0, 1], ['-100%', '200%']);
  const badgeRightY = useTransform(smoothProgress, [0, 1], ['0px', '-50px']);
  const badgeLeftY = useTransform(smoothProgress, [0, 1], ['0px', '40px']);

  // Background 3D Particle Grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 50;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.6,
      y: (Math.random() - 0.5) * height * 1.6,
      z: Math.random() * 800 + 100,
      size: Math.random() * 2 + 1,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      const scrollVal = smoothProgress.get();

      // Ambient background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, 'rgba(13, 31, 60, 0.85)');
      bgGrad.addColorStop(0.5, 'rgba(8, 21, 43, 0.95)');
      bgGrad.addColorStop(1, 'rgba(5, 14, 29, 0.98)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      const rotAngle = time * 0.15 + scrollVal * Math.PI;

      // Render 3D node network
      const projected = nodes.map((node) => {
        node.z -= (0.4 + scrollVal * 2.5);
        if (node.z < 10) node.z = 800;

        const cosR = Math.cos(rotAngle * 0.08);
        const sinR = Math.sin(rotAngle * 0.08);
        const rx = node.x * cosR - node.y * sinR;
        const ry = node.x * sinR + node.y * cosR;

        const scale3d = fov / (fov + node.z);
        const px = cx + rx * scale3d;
        const py = cy + ry * scale3d;
        const pSize = node.size * scale3d * (1 + scrollVal * 0.4);

        return { px, py, pSize, z: node.z };
      });

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.px < -50 || p1.px > width + 50 || p1.py < -50 || p1.py > height + 50) continue;

        const alpha = Math.min(1, (800 - p1.z) / 400) * (0.35 + scrollVal * 0.35);
        ctx.fillStyle = i % 3 === 0 ? `rgba(43, 171, 235, ${alpha})` : `rgba(20, 184, 166, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(1, p1.pSize), 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * alpha * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = i % 2 === 0 ? `rgba(20, 184, 166, ${lineAlpha})` : `rgba(43, 171, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center overflow-hidden perspective-[1400px] select-none">
      {/* Dynamic Ambient Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover opacity-90" />
      </div>

      {/* Main Apple-Style 3D Motion Graphic Showcase Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          y: frameY,
          opacity,
        }}
        className="relative z-10 w-full max-w-[1020px] aspect-[16/10] sm:aspect-[16/9] mx-auto rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 p-2 sm:p-3 border border-white/25 shadow-[0_20px_90px_rgba(20,184,166,0.28)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_30px_120px_rgba(20,184,166,0.4)]"
      >
        {/* Outer Frame Glass Bezel & Top Notch */}
        <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-[#0d1f3c] overflow-hidden border border-white/15 flex flex-col">
          
          {/* Hardware Top Bar Accent */}
          <div className="w-full h-8 sm:h-9 bg-[#08152b]/90 border-b border-white/10 px-4 flex items-center justify-between z-30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            </div>

            {/* Center Status Badge */}
            <div className="px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-space font-medium text-teal-300 flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              EARN BLUEPRINT 3D MATRIX ENGINE
            </div>

            <div className="text-[10px] font-space text-gray-400 tracking-wider">SCROLL CONTROLLED</div>
          </div>

          {/* Graphic Image Canvas Display */}
          <div className="relative flex-1 w-full h-full overflow-hidden bg-black/40">
            <motion.img
              src="/hero_motion_graphic_3d.png"
              alt="The Earn Blueprint 3D Financial Vault Motion Graphic"
              style={{ scale: imageScale }}
              className="w-full h-full object-cover object-center transition-transform duration-700"
            />

            {/* Apple Glossy Diagonal Glare Sweep */}
            <motion.div
              style={{ x: glareX }}
              className="absolute inset-0 w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 pointer-events-none z-20"
            />

            {/* Vignette & Radial Light Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0d1f3c]/70 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c] via-transparent to-transparent opacity-80 pointer-events-none z-10" />
          </div>
        </div>

        {/* Floating Interactive 3D Parallax HUD Badges */}
        {/* Top-Right Floating Analytics Badge */}
        <motion.div
          style={{ y: badgeRightY }}
          className="absolute -top-6 -right-4 sm:-right-8 z-30 px-4 py-2.5 rounded-2xl bg-[#08152b]/90 border border-teal-500/40 shadow-[0_10px_30px_rgba(20,184,166,0.3)] backdrop-blur-xl flex items-center gap-3 text-white"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/50 flex items-center justify-center text-teal-300 text-sm font-bold">
            📈
          </div>
          <div>
            <div className="text-xs font-space font-bold text-teal-300">REAL-TIME YIELD ANALYTICS</div>
            <div className="text-[10px] text-gray-300">+78.4% Revenue Growth</div>
          </div>
        </motion.div>

        {/* Bottom-Left Floating Blueprint Badge */}
        <motion.div
          style={{ y: badgeLeftY }}
          className="absolute -bottom-6 -left-4 sm:-left-8 z-30 px-4 py-2.5 rounded-2xl bg-[#08152b]/90 border border-sky-500/40 shadow-[0_10px_30px_rgba(43,171,235,0.3)] backdrop-blur-xl flex items-center gap-3 text-white"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 text-sm font-bold">
            🔒
          </div>
          <div>
            <div className="text-xs font-space font-bold text-sky-300">FINANCIAL VAULT MATRIX</div>
            <div className="text-[10px] text-gray-300">Verified Income Blueprints</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AppleScrollMotionGraphic;
