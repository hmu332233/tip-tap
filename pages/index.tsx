import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ITouch } from 'types';

import _ from 'lodash';

import { useSettingContext } from 'contexts/SettingContext';

import useToggle from 'hooks/useToggle';
import useTouches from 'hooks/useTouches';

import Setting from 'components/Setting';
import Cursor from 'components/Cursor';
import Progress from 'components/Progress';
import Background from 'components/Background';

const colors = [
  'primary',
  'secondary',
  'secondary-content',
  'accent',
  'neutral-content',
  'info',
  'info-content',
  'base-content',
  'success',
  'success-content',
  'warning',
  'error',
  'error-content',
];

const selectTouches = (touches: ITouch[], mode: string, count: number) => {
  const randomOrderTouches = _.shuffle<ITouch>(touches)!;

  switch (mode) {
    case 'group':
      return _.chain(randomOrderTouches)
        .map((touch, index) => ({
          ...touch,
          color: colors[index % count] || 'random',
        }))
        .value();
    case 'pick': {
      return randomOrderTouches.slice(0, count);
    }
    case 'order':
    default: {
      return randomOrderTouches;
    }
  }
};

const Home: NextPage = () => {
  const [{ mode, count }] = useSettingContext();
  const [selecting, setSelecting] = useState(false);
  const [selectedTouches, setSelectedTouches] = useState<ITouch[]>([]);
  const { ref, ongoingTouchMap } = useTouches();
  const ongoingTouches = Object.values(ongoingTouchMap);

  useEffect(() => {
    if (ongoingTouches.length === 0) {
      return;
    }

    const selectingTimerId = setTimeout(() => {
      setSelecting(true);
    }, 500);

    const sampleTimerId = setTimeout(() => {
      setSelectedTouches(selectTouches(ongoingTouches, mode, count));
    }, 3000);

    return () => {
      setSelecting(false);
      setSelectedTouches([]);
      clearTimeout(selectingTimerId);
      clearTimeout(sampleTimerId);
    };
  }, [ongoingTouches.length, count]);

  const targets =
    selectedTouches.length === 0 ? ongoingTouches : selectedTouches;

  return (
    <div className="flex">
      <Background />
      <Progress on={selecting} />
      <div className="relative w-screen h-screen overflow-hidden" ref={ref}>
        {targets.map((touch) => (
          <Cursor
            key={touch.identifier}
            x={touch.pageX}
            y={touch.pageY}
            color={touch.color}
          />
        ))}
      </div>

      <Setting>
        <Setting.Button />
        <Setting.Modal />
      </Setting>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const UA = req.headers['user-agent']!;
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );

  return {
    props: {},
    ...(!isMobile && {
      redirect: {
        permanent: false,
        destination: '/not-available',
      },
    }),
  };
};

export default Home;
