import React from 'react';

type Props = {};

function Flash({}: Props) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-base-100 flash-on" />
  );
}

export default Flash;
