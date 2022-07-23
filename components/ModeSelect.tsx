import React from 'react';
import cn from 'classnames';
import { useSettingContext } from 'contexts/SettingContext';

type TabItem = {
  id: string;
  text: string;
};

const items: TabItem[] = [
  {
    id: 'pick',
    text: 'Pick',
  },
  {
    id: 'group',
    text: 'Group',
  },
  {
    id: 'order',
    text: 'Order',
  },
];

type Props = {};

function Tabs({}: Props) {
  const [, { changeMode }] = useSettingContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeMode(e.target.value);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Mode</span>
      </label>
      <select className="select select-primary w-full" onChange={handleChange}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Tabs;
