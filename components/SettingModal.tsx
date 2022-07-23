import { useSettingContext } from 'contexts/SettingContext';

import React from 'react';
import ModeSelect from './ModeSelect';
import Counter from './Counter';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

function SettingModal({ isOpen, toggle }: Props) {
  const [{ mode }, { changeCount, changeMode }] = useSettingContext();

  const hideCounter = mode === 'order';
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
            <ModeSelect onChange={changeMode} />
            {!hideCounter && <Counter onChange={changeCount} />}
          </div>
        </label>
      </label>
    </>
  );
}

export default SettingModal;
