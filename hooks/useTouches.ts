import { useEffect, useState, useRef } from 'react';
import { IOngoingTouchMap, ITouch } from 'types';

import _pickBy from 'lodash/pickBy';

function copyTouch(touch: any) {
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    color: 'random',
  };
}

const useTouches = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ongoingTouchMap, setOngoingTouchMap] = useState<IOngoingTouchMap>({});

  useEffect(() => {
    const element = ref.current;
    if (!element) {
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

    element.addEventListener('touchstart', handleMove);
    element.addEventListener('touchmove', handleMove);
    element.addEventListener('touchend', handleEnd);
    element.addEventListener('touchcancel', handleEnd);

    return () => {
      element.removeEventListener('touchstart', handleMove);
      element.removeEventListener('touchmove', handleMove);
      element.removeEventListener('touchend', handleEnd);
      element.removeEventListener('touchcancel', handleEnd);
    };
  }, [ref]);

  return { ref, ongoingTouchMap };
};

export default useTouches;
