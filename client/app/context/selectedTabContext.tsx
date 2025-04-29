"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedTabContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const SelectedTabContext = createContext<SelectedTabContextType | undefined>(undefined);

export const SelectedTabProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<string>("AddPodcast");

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  );
};

export const useSelectedTab = () => {
  const context = useContext(SelectedTabContext);
  if (!context) {
    throw new Error("useSelectedTab must be used inside SelectedTabProvider");
  }
  return context;
};
