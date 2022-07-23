import React, { useState, useEffect } from 'react';

type Props = {
  onChange: (v: number) => void;
};

function Counter({ onChange }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onChange(count);
  }, [count, onChange]);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Count</span>
      </label>
      <div className="input-group w-full">
        <button
          className="btn btn-primary"
          onClick={() => setCount((v) => v - 1)}
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
          onClick={() => setCount((v) => v + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
