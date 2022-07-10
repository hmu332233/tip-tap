import React, { createContext, useContext, useMemo, useState } from 'react';
import { SettingContextValue } from 'types';

export const SettingContext = createContext<SettingContextValue>([
  { mode: 'pick', count: 1 },
  { changeMode: () => {}, changeCount: () => {} },
]);

export function useSettingContext() {
  const value = useContext(SettingContext);
  return value;
}

export function SettingProvier({ children }: { children: JSX.Element }) {
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

  const value = useMemo<SettingContextValue>(
    () => [{ mode, count }, actions],
    [mode, count, actions],
  );

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
}