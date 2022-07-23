import React, { useState, useEffect } from 'react';

type Props = {
  onChange: (v: number) => void;
};

function Counter({ onChange }: Props) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    onChange(count);
  }, [count, onChange]);

  const handleMinusClick = () => {
    setCount((v) => {
      if (v === 1) {
        return 1;
      }
      return v - 1;
    });
  };

  const handlePlusClick = () => {
    setCount((v) => v + 1);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Count</span>
      </label>
      <div className="input-group w-full">
        <button className="btn btn-primary" onClick={handleMinusClick}>
          -
        </button>
        <input
          type="number"
          className="input input-bordered w-full"
          value={count}
          readOnly
        />
        <button className="btn btn-primary" onClick={handlePlusClick}>
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
