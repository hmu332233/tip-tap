import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ITouch } from 'types';

import cn from 'classnames';
import _ from 'lodash';

import { useSettingOptionContext } from 'contexts/SettingOptionContext';

import useTouches from 'hooks/useTouches';

import Setting from 'components/Setting';
import Cursor from 'components/Cursor';
import Progress from 'components/Progress';
import Background from 'components/Background';
import GithubIcon from 'components/GithubIcon';

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
    case 'group': {
      return randomOrderTouches.map((touch, index) => ({
        ...touch,
        color: colors[index % count] || 'random',
      }));
    }
    case 'pick': {
      return randomOrderTouches.slice(0, count).map((touch, index) => ({
        ...touch,
        color: colors[index],
      }));
    }
    case 'order': {
      return randomOrderTouches.map((touch, index) => ({
        ...touch,
        order: index + 1,
      }));
    }
    default: {
      return randomOrderTouches;
    }
  }
};

const Home: NextPage = () => {
  // const [selectState, setSelectState] = useState('waiting');
  const [{ mode, count }] = useSettingOptionContext();
  const [selecting, setSelecting] = useState(false);

  const { ref, ongoingTouches } = useTouches();
  const [selectedTouches, setSelectedTouches] = useState<ITouch[]>([]);

  useEffect(() => {
    if (ongoingTouches.length === 0) {
      return;
    }

    const selectingTimerId = setTimeout(() => {
      setSelecting(true);
      // setSelectState('selecting');
    }, 500);

    const sampleTimerId = setTimeout(() => {
      setSelectedTouches(selectTouches(ongoingTouches, mode, count));
      window.navigator.vibrate(200);
      // setSelectState('selected');
    }, 3000);

    return () => {
      setSelecting(false);
      clearTimeout(selectingTimerId);
      clearTimeout(sampleTimerId);
    };
  }, [ongoingTouches.length, count]);

  useEffect(() => {
    if (selectedTouches.length === 0) {
      return;
    }

    const timerId = setTimeout(() => {
      setSelectedTouches([]);
      // setSelectState('waiting');
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [selectedTouches]);

  const isSeletComplete = selectedTouches.length !== 0;
  const targets = isSeletComplete ? selectedTouches : ongoingTouches;

  return (
    <>
      <Background />
      <div
        className={cn(
          'relative w-screen h-screen overflow-hidden',
          isSeletComplete && 'flash-on',
        )}
        ref={ref}
      >
        {targets.map((touch) => (
          <Cursor
            key={touch.identifier}
            x={touch.pageX}
            y={touch.pageY}
            color={touch.color}
            order={touch.order}
          />
        ))}
      </div>
      <Progress on={selecting} />
      <Setting>
        <Setting.Button />
        <Setting.Modal />
      </Setting>
      <GithubIcon />
    </>
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
