import React from 'react';

const Loader = () => {
  return (
    <div className="terminal-loader border border-[#333] bg-[#1a1a1a] text-[#0f0] font-mono text-base p-[1.5em_1em] w-[12em] shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded relative overflow-hidden box-border">
      <div className="terminal-header absolute top-0 left-0 right-0 h-[1.5em] bg-[#333] px-[0.4em] box-border flex justify-between items-center">
        <div className="terminal-title leading-[1.5em] text-[#eee] text-xs">Status</div>
        <div className="terminal-controls flex gap-1">
          <div className="control close w-[0.6em] h-[0.6em] rounded-full bg-[#e33]" />
          <div className="control minimize w-[0.6em] h-[0.6em] rounded-full bg-[#ee0]" />
          <div className="control maximize w-[0.6em] h-[0.6em] rounded-full bg-[#0b0]" />
        </div>
      </div>
      <div className="text inline-block whitespace-nowrap overflow-hidden border-r-[0.2em] border-r-green-500 mt-[1.5em] animate-type-delete animate-blink-cursor">Loading...</div>
    </div>
  );
}

export default Loader;
