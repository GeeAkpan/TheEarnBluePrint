import React from 'react';

interface ModeToggleProps {
  mode: 'web2' | 'web3';
  onChangeMode: (newMode: 'web2' | 'web3') => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChangeMode }) => {
  return (
    <div 
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-1.5 rounded-2xl glass-panel select-none border border-[var(--card-border)] shadow-lg"
    >
      {/* Web2 Toggle Option */}
      <button
        onClick={() => onChangeMode('web2')}
        className={`flex flex-col items-center justify-center gap-1.5 px-2.5 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
          mode === 'web2' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'
        }`}
      >
        <span className="text-sm font-black leading-none">{mode === 'web2' ? '◉' : '○'}</span>
        <span style={{ writingMode: 'vertical-rl' }} className="font-display">Web2</span>
      </button>

      {/* Web3 Toggle Option */}
      <button
        onClick={() => onChangeMode('web3')}
        className={`flex flex-col items-center justify-center gap-1.5 px-2.5 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
          mode === 'web3' 
            ? 'bg-purple-600 text-white shadow-md' 
            : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'
        }`}
      >
        <span className="text-sm font-black leading-none">{mode === 'web3' ? '◉' : '○'}</span>
        <span style={{ writingMode: 'vertical-rl' }} className="font-display">Web3</span>
      </button>
    </div>
  );
};

export default ModeToggle;
