// import DrawRound from 'components/DrawRound';
import DrawRound from 'components/DrawRound';
import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IOngoingTouches } from 'types';

const log =
  // process.env.NODE_ENV === 'development'
  true
    ? (msg: any) => {
        const p = document.getElementById('log');
        if (!p) {
          return;
        }

        p.innerHTML = msg + '\n' + p.innerHTML;
      }
    : () => {};

function copyTouch(touch: any) {
  const color = colorForTouch(touch);
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    color,
  };
}

function colorForTouch(touch: any) {
  const r = (touch.identifier % 16).toString(16); // make it a hex digit
  const g = (Math.floor(touch.identifier / 3) % 16).toString(16); // make it a hex digit
  const b = (Math.floor(touch.identifier / 7) % 16).toString(16); // make it a hex digit
  const color = '#' + r + g + b;
  // log('color for touch with identifier ' + touch.identifier + ' = ' + color);
  return color;
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
    // document.addEventListener('touchmove', handleMove);

    return () => {
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
      // document.removeEventListener('touchmove', handleMove);
    };
  }, []);
  return ongoingTouches;
};

const Home: NextPage = () => {
  const ongoingTouches = useTouches();
  useEffect(() => {
    log(JSON.stringify(ongoingTouches));
  }, [ongoingTouches]);
  return (
    <div>
      <div className="flex">
        {Object.values(ongoingTouches)
          .filter(Boolean)
          .map((touch) => (
            <DrawRound key={touch.identifier} x={touch.pageX} y={touch.pageY} />
          ))}
      </div>
      Log: <pre id="log" style={{ border: '1px solid #ccc' }}></pre>
    </div>
  );
};

export default Home;
