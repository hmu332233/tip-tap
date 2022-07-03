import React from 'react';

type Props = {
  x: number;
  y: number;
};

function DrawRound({ x, y }: Props) {
  return (
    <div
      className="will-change-transform"
      style={{ transform: `translate(${x - 64}px, ${y - 64}px)` }}
    >
      <div className="rounded-full w-32 h-32 border-8 border-dashed animate-spin" />
    </div>
  );
}

export default DrawRound;
