import { useSettingContext } from 'contexts/SettingContext';
import React from 'react';

type Props = {};

function Counter({}: Props) {
  const [{ count }, { changeCount }] = useSettingContext();
  return (
    <div className="input-group justify-center">
      <button
        className="btn btn-primary"
        onClick={() => changeCount((v) => v - 1)}
      >
        -
      </button>
      <input type="number" className="input input-bordered" value={count} />
      <button
        className="btn btn-primary"
        onClick={() => changeCount((v) => v + 1)}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
