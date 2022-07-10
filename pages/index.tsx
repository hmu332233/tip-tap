import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ITouch } from 'types';

import _sampleSize from 'lodash/sampleSize';

import { useSettingContext } from 'contexts/SettingContext';

import useToggle from 'hooks/useToggle';
import useTouches from 'hooks/useTouches';

import SettingButton from 'components/SettingButton';
import Cursor from 'components/Cursor';
import Progress from 'components/Progress';
import Background from 'components/Background';
import SettingModal from 'components/SettingModal';

const Home: NextPage = () => {
  const [{ mode, count }] = useSettingContext();
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const { ref, ongoingTouchMap, setActive } = useTouches();
  const ongoingTouches = Object.values(ongoingTouchMap);

  const [isSettingModalOpen, toggleSettingModalOpen] = useToggle(false);

  useEffect(() => {
    setActive(!isSettingModalOpen);
  }, [isSettingModalOpen, setActive]);

  useEffect(() => {
    if (ongoingTouches.length === 0) {
      return;
    }

    const selectingTimerId = setTimeout(() => {
      setSelecting(true);
    }, 500);

    const sampleTimerId = setTimeout(() => {
      const selectedTouches = _sampleSize<ITouch>(
        ongoingTouches,
        ongoingTouches.length,
      )!;
      setSelected(selectedTouches.map((touch) => touch.identifier));
    }, 3000);

    return () => {
      setSelecting(false);
      setSelected([]);
      clearTimeout(selectingTimerId);
      clearTimeout(sampleTimerId);
    };
  }, [ongoingTouches.length]);

  return (
    <div className="flex">
      <Background />
      <Progress on={selecting} />
      <div className="relative w-screen h-screen overflow-hidden" ref={ref}>
        {ongoingTouches
          .filter((touch, index) =>
            selected.length === 0 ? true : index < count,
          )
          .map((touch) => (
            <Cursor
              key={touch.identifier}
              x={touch.pageX}
              y={touch.pageY}
              color={touch.color}
            />
          ))}
      </div>
      <SettingButton onClick={toggleSettingModalOpen} />
      <SettingModal
        isOpen={isSettingModalOpen}
        toggle={toggleSettingModalOpen}
      />
    </div>
  );
};

export default Home;
