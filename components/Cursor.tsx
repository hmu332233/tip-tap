import React from 'react';

import cn from 'classnames';

type Props = {
  x: number;
  y: number;
  color?: string;
  order?: number;
};

function Cursor({ x, y, color = 'random', order }: Props) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className={cn('cursor', `bg-${color}`)} />
      {order && (
        <div className="absolute -top-5 -right-5 animate-bounce text-5xl text-primary-content font-extrabold z-10">
          {order}
        </div>
      )}
    </div>
  );
}

export default Cursor;
