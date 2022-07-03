// import DrawRound from 'components/DrawRound';
import DrawRound from 'components/DrawRound';
import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IOngoingTouches, ITouch } from 'types';
import { getRandomNumber } from 'utils';

const log = process.env.NODE_ENV === 'development' ? console.log : () => {};

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
    'accent',
    'neutral',
    'info',
    'success',
    'warning',
    'error',
  ];
  const index = touch.identifier % colorMap.length;
  return colorMap[index];
}

const useTouches = () => {
  const [ongoingTouches, setOngoingTouches] = useState<IOngoingTouches>({});

  useEffect(() => {
    function handleStart(event: TouchEvent) {
      if (event.cancelable) event.preventDefault();
      log('touchstart.');
      // event.changedTouches.length;

      const touchesObj: { [key: string]: any } = {};
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = copyTouch(event.changedTouches[i]);
        touchesObj[touch.identifier] = touch;
      }

      setOngoingTouches((arr) => ({ ...arr, ...touchesObj }));
    }

    function handleMove(event: TouchEvent) {
      if (event.cancelable) event.preventDefault();

      const touchesObj: { [key: string]: any } = {};
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = copyTouch(event.changedTouches[i]);
        touchesObj[touch.identifier] = touch;
      }

      setOngoingTouches((arr) => ({ ...arr, ...touchesObj }));
    }

    function handleEnd(event: TouchEvent) {
      if (event.cancelable) event.preventDefault();
      log('touchend');

      const touchesObj: { [key: string]: any } = {};
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = copyTouch(event.changedTouches[i]);
        touchesObj[touch.identifier] = undefined;
      }

      setOngoingTouches((arr) => ({ ...arr, ...touchesObj }));
    }

    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);
    document.addEventListener('touchmove', handleMove);

    return () => {
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
      document.removeEventListener('touchmove', handleMove);
    };
  }, []);
  return ongoingTouches;
};

const Home: NextPage = () => {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ongoingTouches = useTouches();
  useEffect(() => {
    log(ongoingTouches);
    const touches = Object.values(ongoingTouches).filter(Boolean);
    log(touches);
    if (touches.length === 0) {
      setSelecting(false);
      return;
    }

    setSelecting(true);
  }, [ongoingTouches]);

  useEffect(() => {
    if (!selecting) {
      return;
    }

    log('start selecting!');

    const touches = Object.values(ongoingTouches).filter(Boolean);
    const id = setTimeout(() => {
      const index = getRandomNumber(0, touches.length - 1);
      setSelected(touches[index].identifier);
      log('selected', touches[index].identifier);
    }, 3000);

    return () => {
      setSelected(null);
      clearTimeout(id);
    };
  }, [selecting]);
  return (
    <div className="flex">
      {Object.values(ongoingTouches)
        .filter(Boolean)
        .filter((touch) =>
          selected !== null ? touch.identifier === selected : true,
        )
        .map((touch) => (
          <DrawRound
            key={touch.identifier}
            x={touch.pageX}
            y={touch.pageY}
            color={touch.color}
          />
        ))}
    </div>
  );
};

export default Home;
