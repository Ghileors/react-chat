import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = ({socket}) => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    // socket.emit('login', {...form});
    // socket.on('token', token => {
    //   console.log(token);
    // });
    
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      message(data.message);
      auth.login(data.token, data.userName, data.admin);
    } catch (err) {
      console.log(`Error from post request: ${err.message}`)
    };
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1><i className="fas fa-smile"></i> Join to Chat</h1>
      </header>
      <main className="join-main">
        <form>
          <div className="form-control">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              value={form.name}
              id="name"
              placeholder="Enter name..."
              required
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              id="password"
              placeholder="Enter password..."
              required
              onChange={changeHandler}
            />
          </div>
          <button
            type="submit" className="btn" onClick={loginHandler} disabled={loading}>Join Chat</button>
        </form>
      </main>
    </div>
  )
};
