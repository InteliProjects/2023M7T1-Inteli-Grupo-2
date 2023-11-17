import React, { createContext, useContext, useState } from 'react';

const SelectedCategoryContext = createContext();

/**
 * Provider that stores the selected category
 * @param children: the children components
 * */
export function SelectedCategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
}

export function useSelectedCategory() {
  return useContext(SelectedCategoryContext);
}