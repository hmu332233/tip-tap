import React, { createContext, useContext, useMemo, useState } from 'react';
import { SettingContextValue } from 'types';

export const SettingOptionContext = createContext<SettingContextValue>([
  { mode: 'pick', count: 1 },
  { changeMode: () => {}, changeCount: () => {} },
]);

export function useSettingOptionContext() {
  const value = useContext(SettingOptionContext);
  return value;
}

export function SettingOptionProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState('pick');
  const [count, setCount] = useState(1);

  const actions = useMemo(
    () => ({
      changeMode(mode: string) {
        setMode(mode);
      },
      changeCount(v: number) {
        setCount(v);
      },
    }),
    [],
  );

  const value = useMemo<SettingContextValue>(
    () => [{ mode, count }, actions],
    [mode, count, actions],
  );

  return (
    <SettingOptionContext.Provider value={value}>
      {children}
    </SettingOptionContext.Provider>
  );
}
