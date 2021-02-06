import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [ready, setReady] = useState(false);
  const [admin, setAdmin] = useState(false);

  const login = useCallback((jwtToken, name, isAdmin) => {
    setToken(jwtToken);
    setUserName(name);
    setAdmin(isAdmin);

    console.log("TOKEN CREATED!");
    localStorage.setItem(storageName, JSON.stringify({
      userName: name, token: jwtToken, admin: isAdmin
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userName, data.admin);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, userName, admin, ready };
};
