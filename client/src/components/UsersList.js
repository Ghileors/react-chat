import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';

import UserItem from './UserItem';

export default function UsersList({ users }) {
  const { request } = useHttp();
  
  const muteHandler = useCallback(
    async _id => {
      try {
        await request('/chat/mute', 'PUT', { _id, isMuted: true });
      } catch (err) {}
    },
    [request],
  );

  const banHandler = useCallback(
    async _id => {
      try {
        await request('/chat/ban', 'PUT', { _id, isBanned: true });
      } catch (err) {}
    },
    [request],
  );

  return (
    <ul id="users">
      <UserItem users={ users } muteHandler={muteHandler} banHandler={banHandler}/>
    </ul>
  );
}
