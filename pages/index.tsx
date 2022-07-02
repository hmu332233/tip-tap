import DrawRound from 'components/DrawRound';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + '\n' + p.innerHTML;
}

function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function copyTouch(touch) {
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
  };
}

function colorForTouch(touch) {
  var r = touch.identifier % 16;
  var g = Math.floor(touch.identifier / 3) % 16;
  var b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = '#' + r + g + b;
  log('color for touch with identifier ' + touch.identifier + ' = ' + color);
  return color;
}

var ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  log('touchstart.');
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    log('touchstart:' + i + '...');
    ongoingTouches.push(copyTouch(touches[i]));
    var color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
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

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      log('continuing touch ' + idx);
      ctx.beginPath();
      log(
        'ctx.moveTo(' +
          ongoingTouches[idx].pageX +
          ', ' +
          ongoingTouches[idx].pageY +
          ');',
      );
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      log('ctx.lineTo(' + touches[i].pageX + ', ' + touches[i].pageY + ');');
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
      log('.');
    } else {
      log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log('touchend');
  var el = document.getElementsByTagName('canvas')[0];
  var ctx = el.getContext('2d');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
      ongoingTouches.splice(idx, 1); // remove it; we're done
    } else {
      log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log('touchcancel.');
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
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
