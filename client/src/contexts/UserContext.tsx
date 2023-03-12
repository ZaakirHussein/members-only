import { React, createContext, useState, useReducer } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({ data }) {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const [auth, setAuth] = useState(initialState);

  const value = {
    auth,
    setAuth,
  };

  return <UserContext.Provider value={value}>{data}</UserContext.Provider>;
}
