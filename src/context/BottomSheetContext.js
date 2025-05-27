import React, { createContext } from 'react';
import { useSharedValue } from 'react-native-reanimated';

export const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children }) => {
  const isOpen = useSharedValue(false);
  const toggleSheet = () => { isOpen.value = !isOpen.value; };

  return (
    <BottomSheetContext.Provider value={{ isOpen, toggleSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};