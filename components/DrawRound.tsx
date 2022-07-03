import React from 'react';

type Props = {
  x: number;
  y: number;
};

function DrawRound({ x, y }: Props) {
  return (
    <div
      className="will-change-transform"
      style={{ transform: `translate(${x - 40}px, ${y - 40}px)` }}
    >
      <div className="rounded-full w-20 h-20 border-8 border-dashed animate-spin" />
    </div>
  );
}

export default DrawRound;
