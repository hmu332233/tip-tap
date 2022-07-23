import React from 'react';

type Props = {};

function Background({}: Props) {
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center animate-pulse uppercase text-center md:text-3xl sm:text-2xl text-xl text-neutral-content font-bold tracking-[.4em]">
      Tap Screen
    </div>
  );
}

export default Background;
