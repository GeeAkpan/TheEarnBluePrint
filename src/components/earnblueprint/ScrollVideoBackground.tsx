"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollVideoBackgroundProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const ScrollVideoBackground: React.FC<ScrollVideoBackgroundProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth out scroll values for 60fps animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform scroll progress into dynamic visual properties
  const scale = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 0.88, 0.82]);
  const borderRadius = useTransform(smoothProgress, [0, 0.3], ['0px', '28px']);
  const rotateX = useTransform(smoothProgress, [0, 0.4], [0, 12]);
  const opacity = useTransform(smoothProgress, [0, 0.7, 1], [0.95, 0.75, 0.3]);
  const videoY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

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

    // Create dynamic 3D video mesh nodes
    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 1,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      const scrollVal = smoothProgress.get();

      // Clear canvas with dark gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, 'rgba(13, 31, 60, 0.95)');
      bgGrad.addColorStop(0.5, 'rgba(8, 21, 43, 0.98)');
      bgGrad.addColorStop(1, 'rgba(5, 14, 29, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Draw grid perspective lines
      ctx.strokeStyle = `rgba(20, 184, 166, ${0.08 + scrollVal * 0.1})`;
      ctx.lineWidth = 1;

      const rotAngle = time * 0.2 + scrollVal * Math.PI;

      // Project 3D nodes into 2D canvas
      const projected = nodes.map((node) => {
        // Move with scroll speed
        node.z -= (0.5 + scrollVal * 3);
        if (node.z < 10) node.z = 800;

        // Apply 3D rotation
        const cosR = Math.cos(rotAngle * 0.1);
        const sinR = Math.sin(rotAngle * 0.1);
        const rx = node.x * cosR - node.y * sinR;
        const ry = node.x * sinR + node.y * cosR;

        const scale3d = fov / (fov + node.z);
        const px = cx + rx * scale3d;
        const py = cy + ry * scale3d;
        const pSize = node.size * scale3d * (1 + scrollVal * 0.5);

        return { px, py, pSize, z: node.z, scale3d };
      });

      // Render energy connection lines
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.px < -50 || p1.px > width + 50 || p1.py < -50 || p1.py > height + 50) continue;

        // Draw particle node
        const alpha = Math.min(1, (800 - p1.z) / 400) * (0.4 + scrollVal * 0.4);
        ctx.fillStyle = i % 3 === 0 ? `rgba(43, 171, 235, ${alpha})` : `rgba(20, 184, 166, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(1, p1.pSize), 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * alpha * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = i % 2 === 0 ? `rgba(20, 184, 166, ${lineAlpha})` : `rgba(43, 171, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw dynamic scroll energy ring in center
      const ringRadius = 180 + Math.sin(time) * 20 + scrollVal * 100;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(20, 184, 166, ${0.12 + Math.sin(time * 2) * 0.05})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden perspective-[1200px]">
      <motion.div
        style={{
          scale,
          borderRadius,
          rotateX,
          opacity,
          y: videoY,
        }}
        className="w-full h-full relative overflow-hidden transition-all duration-100 ease-out border border-[#14b8a6]/20 shadow-[0_0_80px_rgba(20,184,166,0.15)] backdrop-blur-xl"
      >
        <canvas ref={canvasRef} className="w-full h-full object-cover block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c] via-transparent to-[#0d1f3c]/60 pointer-events-none" />
      </motion.div>
    </div>
  );
};
