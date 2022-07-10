import React from 'react';
import ModeSelect from './ModeSelect';
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
          <h3 className="text-xl font-bold">Settings</h3>
          <div className="flex flex-col gap-2 mt-3">
            <ModeSelect />
            <Counter />
          </div>
        </label>
      </label>
    </>
  );
}

export default SettingModal;
