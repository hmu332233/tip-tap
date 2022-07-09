import { useMainContext } from 'contexts/mainContext';
import React from 'react';

type Props = {};

function Counter({}: Props) {
  const [{ count }, { changeCount }] = useMainContext();
  return (
    <div className="input-group">
      <button className="btn" onClick={() => changeCount((v) => v - 1)}>
        -
      </button>
      <input type="number" className="input input-bordered" value={count} />
      <button className="btn" onClick={() => changeCount((v) => v + 1)}>
        +
      </button>
    </div>
  );
}

export default Counter;
