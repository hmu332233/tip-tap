import React from 'react';

type Props = {};

function Background({}: Props) {
  return (
    <div className="fixed w-screen h-screen">
      {/* <div className="w-full h-full absolute top-0 left-0">
        <div className="wave one"></div>
        <div className="wave two"></div>
        <div className="wave three"></div>
      </div> */}
      <div className="flex justify-center items-center animate-pulse uppercase absolute left-0 top-0 z-0 text-center text-3xl text-neutral-content font-bold w-full h-full tracking-[.4em]">
        Touch Screen
      </div>
    </div>
  );
}

export default Background;
