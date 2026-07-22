import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface MetricsSectionProps {
  mode: 'web2' | 'web3';
}

interface CountUpProps {
  end: number;
  suffix?: string;
  trigger: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = "", trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1200; // Total animation length in ms
    const stepTime = 20; // Interval step in ms (~50fps)
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;
    
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [trigger, end]);

  return <span>{count}{suffix}</span>;
};

export const MetricsSection: React.FC<MetricsSectionProps> = ({ mode }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const metrics = [
    {
      value: <CountUp end={6} suffix="+" trigger={isInView} />,
      label: "Years Experience"
    },
    {
      value: <CountUp end={30} suffix="+" trigger={isInView} />,
      label: "Products & Campaigns"
    },
    {
      value: <CountUp end={100} suffix="K+" trigger={isInView} />,
      label: "Community Members Reached"
    },
    {
      value: <span className="font-display font-black">Millions</span>,
      label: "Marketing Impressions"
    },
    {
      value: <CountUp end={20} suffix="+" trigger={isInView} />,
      label: "Projects Delivered"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="metrics" 
      className="py-20 px-6 sm:px-10 max-w-6xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Impact
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Ecosystem Metrics
          </h2>
        </FadeIn>

        {/* Metrics Counters Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-6 text-center select-none">
          {metrics.map((item, index) => (
            <FadeIn 
              key={index}
              delay={index * 0.1} 
              y={30}
              className="glass-panel rounded-3xl p-6 border border-[var(--card-border)] flex flex-col justify-center items-center gap-3 min-h-[140px] hover:scale-[1.02] transition-transform duration-300"
            >
              <div 
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
                className="font-display font-black leading-none text-[var(--text-color)]"
              >
                {item.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] leading-snug">
                {item.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
