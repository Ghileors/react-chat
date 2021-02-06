import {createContext} from 'react';

function noop() {};

export const AuthContext = createContext({
  token: null,
  userName: null,
  admin: false,
  login: noop,
  logout: noop,
  isAuthenticated: false
});
