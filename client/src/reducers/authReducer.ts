import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const res = await axios.get(`/api/user/info`);
        axios.defaults.headers.common['x-auth-token'] = token;

        dispatch({
          type: 'LOGIN',
          payload: {
            user: res.data.user,
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };
};
