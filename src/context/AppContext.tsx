'use client';

import { createContext, useContext } from 'react';

type AppContextType = {};

type Props = {
  children: React.ReactNode;
};

const appContextDefaultValues: AppContextType = {};

const AppContext = createContext<AppContextType>(appContextDefaultValues);

export const useAppContext = () => useContext(AppContext);

const value = {};

export const AppProvider = ({ children }: Props) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
