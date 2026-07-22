import React, { useEffect, useRef } from 'react';

interface LiquidBackgroundProps {
  mode: 'web2' | 'web3';
}

interface Node {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angleOffset: number;
}

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const spacing = 55; // Grid spacing density
    let cols = 0;
    let rows = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initGrid();
    };

    const initGrid = () => {
      nodes = [];
      cols = Math.ceil(canvas.width / spacing) + 1;
      rows = Math.ceil(canvas.height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          nodes.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            angleOffset: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const update = (time: number) => {
      const mouse = mouseRef.current;
      const mouseRadius = 200; // Repulsion radius
      const forceMultiplier = mode === 'web2' ? 0.045 : 0.07;
      const springStiffness = 0.025;
      const damping = 0.86;

      nodes.forEach((node) => {
        // 1. Spring return force (pull back to home coordinates)
        const springForceX = (node.baseX - node.x) * springStiffness;
        const springForceY = (node.baseY - node.y) * springStiffness;
        node.vx += springForceX;
        node.vy += springForceY;

        // 2. Ambient waving (flows dynamically over time)
        const waveSpeed = time * 0.0015;
        node.vx += Math.sin(waveSpeed + node.angleOffset) * 0.04;
        node.vy += Math.cos(waveSpeed + node.angleOffset) * 0.04;

        // 3. Mouse deflection repulsion
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius; // 0 to 1 scaling
            const angle = Math.atan2(dy, dx);
            node.vx += Math.cos(angle) * force * forceMultiplier * 14;
            node.vy += Math.sin(angle) * force * forceMultiplier * 14;
          }
        }

        // Apply updates & damping friction
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= damping;
        node.vy *= damping;
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      update(time);

      // Styles
      const lineColor = mode === 'web2' 
        ? 'rgba(37, 99, 235, 0.035)' 
        : 'rgba(182, 0, 168, 0.07)';

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8;

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const i1 = r * cols + c;
          const i2 = r * cols + (c + 1);
          const i3 = (r + 1) * cols + c;
          const i4 = (r + 1) * cols + (c + 1);

          const n1 = nodes[i1];
          const n2 = nodes[i2];
          const n3 = nodes[i3];
          const n4 = nodes[i4];

          if (!n1 || !n2 || !n3 || !n4) continue;

          // Draw triangulated grid lines
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.lineTo(n3.x, n3.y);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(n2.x, n2.y);
          ctx.lineTo(n4.x, n4.y);
          ctx.lineTo(n3.x, n3.y);
          ctx.closePath();
          ctx.stroke();

          // Draw dynamic liquid blob fill near mouse
          if (mouseRef.current.active) {
            const centerDist = Math.sqrt(
              Math.pow((n1.x + n4.x) / 2 - mouseRef.current.x, 2) +
              Math.pow((n1.y + n4.y) / 2 - mouseRef.current.y, 2)
            );
            if (centerDist < 170) {
              const opacity = 0.038 * (1 - centerDist / 170);
              ctx.fillStyle = mode === 'web2'
                ? `rgba(37, 99, 235, ${opacity})`
                : `rgba(0, 245, 255, ${opacity * 1.5})`;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    resizeCanvas();
    draw(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-all duration-1000"
    />
  );
};

export default LiquidBackground;
