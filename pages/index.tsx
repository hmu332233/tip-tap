// import DrawRound from 'components/DrawRound';
import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
import { useEffect } from 'react';

function log(msg: any) {
  const p = document.getElementById('log');
  if (!p) {
    return;
  }

  p.innerHTML = msg + '\n' + p.innerHTML;
}

function drawRound(ctx: any, touch: any) {
  ctx?.clearRect(0, 0, 600, 600);
  // ctx.fillRect(touch.pageX - 20, touch.pageY - 20, 40,40); // and a square at the end

  ctx.arc(touch.pageX, touch.pageY, 40, 0, 2 * Math.PI, false); // a circle at the start
  ctx.fill();
}

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
  log('color for touch with identifier ' + touch.identifier + ' = ' + color);
  return color;
}

var ongoingTouches: any = {};

function handleStart(evt: any) {
  evt.preventDefault();
  log('touchstart.');
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  if (!ctx) {
    return;
  }

  for (var i = 0; i < touches.length; i++) {
    log('touchstart:' + i + '...');
    const touch = copyTouch(touches[i]);
    ongoingTouches[touch.identifier] = touch;

    ctx.beginPath();
    // ctx.arc(touch.pageX, touch.pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
    // ctx.fillStyle = touch.color;
    // ctx.fill();
    drawRound(ctx, touch);
    log('touchstart:' + i + '.');
  }
}

function startup() {
  var el = document.getElementsByTagName('canvas')[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchcancel', handleCancel, false);
  el.addEventListener('touchmove', handleMove, false);
  log('initialized.');
}

function handleMove(evt: any) {
  evt.preventDefault();
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  if (!ctx) {
    return;
  }

  for (var i = 0; i < touches.length; i++) {
    // var color = colorForTouch(touches[i]);
    // var idx = ongoingTouchIndexById(touches[i].identifier);

    const touch = ongoingTouches[touches[i].identifier];
    const newTouch = copyTouch(touches[i]);

    if (touch) {
      log('continuing touch ' + touch.identifier);
      ctx.beginPath();
      log('ctx.moveTo(' + newTouch.pageX + ', ' + newTouch.pageY + ');');
      // ctx.moveTo(touch.pageX, touch.pageY);
      // log('ctx.lineTo(' + touch.pageX + ', ' + touch.pageY + ');');
      // ctx.lineTo(newTouch.pageX, newTouch.pageY);
      // ctx.lineWidth = 40;
      // ctx.strokeStyle = newTouch.color;
      // ctx.stroke();

      drawRound(ctx, newTouch);
      ongoingTouches[newTouch.identifier] = newTouch;
      log('.');
    } else {
      log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt: any) {
  evt.preventDefault();
  log('touchend');
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  if (!ctx) {
    return;
  }

  for (var i = 0; i < touches.length; i++) {
    // var color = colorForTouch(touches[i]);
    // var idx = ongoingTouchIndexById(touches[i].identifier);
    const touch = ongoingTouches[touches[i].identifier];
    const newTouch = copyTouch(touches[i]);

    if (touch) {
      ctx.lineWidth = 40;
      ctx.fillStyle = touch.color;
      ctx.beginPath();
      // ctx.moveTo(touch.pageX, touch.pageY);
      // ctx.lineTo(newTouch.pageX, newTouch.pageY);

      drawRound(ctx, newTouch);
      ongoingTouches[touch.identifier] = null;
    } else {
      log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt: any) {
  evt.preventDefault();
  log('touchcancel.');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    ongoingTouches[touches[i].identifier] = null;
  }
}

const Home: NextPage = () => {
  useEffect(() => {
    startup();
  }, []);
  return (
    <div>
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{ border: 'solid black 1px' }}
      >
        Your browser does not support canvas element.
      </canvas>
      Log: <pre id="log" style={{ border: '1px solid #ccc' }}></pre>
    </div>
  );
};

export default Home;
