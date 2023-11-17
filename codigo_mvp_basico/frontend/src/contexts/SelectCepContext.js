import React, { createContext, useContext, useState } from 'react';

const SelectedCepContext = createContext();

/**
 * Provider that stores the selected cep
 * @param children: the children components
 * */
export function SelectedCepProvider({ children }) {
  const [selectedCep, setSelectedCep] = useState('');

  return (
    <SelectedCepContext.Provider value={{ selectedCep, setSelectedCep }}>
      {children}
    </SelectedCepContext.Provider>
  );
}

export function useSelectedCep() {
  return useContext(SelectedCepContext);
}   