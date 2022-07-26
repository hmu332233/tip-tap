import useToggle from 'hooks/useToggle';
import React, { createContext, useContext, useMemo } from 'react';

type ContextType = {
  isOpen?: boolean;
  toggle?: () => void;
};
const SettingModalOpenContext = createContext<ContextType>({});

type ProviderProps = {
  children: React.ReactNode;
};
export function SettingModalOpenProvider({ children }: ProviderProps) {
  const [isOpen, toggle] = useToggle();
  const value = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);
  return (
    <SettingModalOpenContext.Provider value={value}>
      {children}
    </SettingModalOpenContext.Provider>
  );
}
export const useSettingModalOpenContext = () =>
  useContext(SettingModalOpenContext);
