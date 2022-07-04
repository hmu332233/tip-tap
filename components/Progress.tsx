import React from 'react';
import cn from 'classnames';

type Props = {
  on: boolean;
};

function Progress({ on }: Props) {
  return (
    <div className="w-full h-4">
      <div
        className={cn('relative w-0 h-full bg-primary', on && 'progress-on')}
      ></div>
    </div>
  );
}

export default Progress;
