import React from 'react';

import cn from 'classnames';

type Props = {
  x: number;
  y: number;
  color: string;
};

function DrawRound({ x, y, color }: Props) {
  return (
    // <div
    //   className="will-change-transform"
    //   style={{ transform: `translate(${x - 64}px, ${y - 64}px)` }}
    // >
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      {/* <div
        className={cn(
          'rounded-full w-32 h-32 border-8 border-dashed animate-spin',
          color && `border-${color}`,
        )}
      /> */}
      <div className="cursor" />
    </div>
  );
}

export default DrawRound;
