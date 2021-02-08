import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import { ChatPage } from './pages/ChatPage';
import { AuthPage } from './pages/AuthPage';

const ENDPOINT = "ws://localhost:5050";

const item = JSON.parse(localStorage.getItem("userData"));
const token = item ? item.token : null;

const newSocket = io(ENDPOINT, {
  query: {
    token
  },
});

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/chat" exact>
          <ChatPage socket={newSocket}/>
        </Route>
        <Redirect to="/chat" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
