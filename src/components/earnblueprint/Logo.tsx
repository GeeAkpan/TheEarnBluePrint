import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  showText = true,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Icon Mark with Blueprint Grid & Upward Arrow */}
      <div className="w-[38px] h-[38px] rounded-[10px] bg-[#0d2248] border border-[#14b8a6]/40 shadow-lg relative flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        {/* Subtle Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0V40M20 0V40M30 0V40M0 10H40M0 20H40M0 30H40" stroke="#14b8a6" strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>

        {/* Upward Bold Arrow */}
        <svg
          className="w-5 h-5 text-[#14b8a6] relative z-10 transform transition-transform duration-300 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3L4 11H9V21H15V11H20L12 3Z" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span
          className={`font-space text-lg font-bold tracking-tight transition-colors ${
            variant === 'dark'
              ? 'text-gray-900'
              : variant === 'light'
              ? 'text-white'
              : 'text-current'
          }`}
        >
          The Earn <span className="font-extrabold">Blueprint</span>
          <span className="text-[#14b8a6]">.</span>
        </span>
      )}
    </div>
  );
};
