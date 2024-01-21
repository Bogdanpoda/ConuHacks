import React, { createContext, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const mySet = new Set();

  return (
    <MyContext.Provider value={{ mySet }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);