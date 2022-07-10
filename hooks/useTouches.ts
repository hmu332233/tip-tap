import { useEffect, useState, useRef } from 'react';
import { IOngoingTouchMap, ITouch } from 'types';

import _pickBy from 'lodash/pickBy';

function copyTouch(touch: any) {
  const color = colorForTouch(touch);
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    color,
  };
}

function colorForTouch(touch: ITouch) {
  const colorMap = [
    'primary',
    'secondary',
    'secondary-content',
    'accent',
    'neutral-content',
    'info',
    'info-content',
    'base-content',
    'success',
    'success-content',
    'warning',
    'error',
    'error-content',
  ];
  const index = touch.identifier % colorMap.length;
  return colorMap[index];
}

const useTouches = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ongoingTouchMap, setOngoingTouchMap] = useState<IOngoingTouchMap>({});

  useEffect(() => {
    if (!active || !ref.current) {
      return;
    }

    function handleMove(event: TouchEvent) {
      if (event.cancelable) event.preventDefault();
      const touchesObj: { [key: string]: any } = {};
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = copyTouch(event.changedTouches[i]);
        touchesObj[touch.identifier] = touch;
      }

      setOngoingTouchMap((arr) => ({ ...arr, ...touchesObj }));
    }

    function handleEnd(event: TouchEvent) {
      if (event.cancelable) event.preventDefault();
      const touchesObj: { [key: string]: any } = {};
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = copyTouch(event.changedTouches[i]);
        touchesObj[touch.identifier] = undefined;
      }

      setOngoingTouchMap((arr) =>
        _pickBy({ ...arr, ...touchesObj }, (v) => v !== undefined),
      );
    }

    ref.current.addEventListener('touchstart', handleMove);
    ref.current.addEventListener('touchmove', handleMove);
    ref.current.addEventListener('touchend', handleEnd);
    ref.current.addEventListener('touchcancel', handleEnd);

    return () => {
      ref.current?.removeEventListener('touchstart', handleMove);
      ref.current?.removeEventListener('touchmove', handleMove);
      ref.current?.removeEventListener('touchend', handleEnd);
      ref.current?.removeEventListener('touchcancel', handleEnd);
    };
  }, [active]);

  return { ref, ongoingTouchMap, setActive };
};

export default useTouches;
