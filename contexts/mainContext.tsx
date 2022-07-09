import React, { createContext, useContext, useMemo, useState } from 'react';
import { MainContextValue } from 'types';

export const MainContext = createContext<MainContextValue>([
  { mode: 'pick', count: 1 },
  { changeMode: () => {}, changeCount: () => {} },
]);

export function useMainContext() {
  const value = useContext(MainContext);
  return value;
}

export function MainProvider({ children }: { children: JSX.Element }) {
  const [mode, setMode] = useState('pick');
  const [count, setCount] = useState(1);

  const actions = useMemo(
    () => ({
      changeMode(mode: string) {
        setMode(mode);
      },
      changeCount(changeFunc: (v: number) => number) {
        setCount(changeFunc);
      },
    }),
    [],
  );

  const value = useMemo<MainContextValue>(
    () => [{ mode, count }, actions],
    [mode, count, actions],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
