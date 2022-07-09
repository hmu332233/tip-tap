import React from 'react';
import Tabs from './Tabs';
import Counter from './Counter';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

function SettingModal({ isOpen, toggle }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id="setting-modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={toggle}
      />
      <label htmlFor="setting-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Settings</h3>
          <Tabs />
          <Counter />
        </label>
      </label>
    </>
  );
}

export default SettingModal;
