import { useSettingContext } from 'contexts/SettingContext';
import React from 'react';

type Props = {};

function Counter({}: Props) {
  const [{ count }, { changeCount }] = useSettingContext();
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Count</span>
      </label>
      <div className="input-group w-full">
        <button
          className="btn btn-primary"
          onClick={() => changeCount((v) => v - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="input input-bordered w-full"
          value={count}
          readOnly
        />
        <button
          className="btn btn-primary"
          onClick={() => changeCount((v) => v + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
