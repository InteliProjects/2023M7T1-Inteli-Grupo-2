import React, { createContext, useContext, useState } from 'react';

const OrderStatusContext = createContext();

/**
 * Provider that stores the order status
 * @param children: the children components
 * */
export function StatusProvider({ children }) {
  const [status, setStatus] = useState(null);

  return (
    <OrderStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </OrderStatusContext.Provider>
  );
}

export function useStatus() {
  return useContext(OrderStatusContext);
}