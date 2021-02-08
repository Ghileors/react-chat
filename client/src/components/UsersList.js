import React from 'react';

import UserItem from './UserItem';

export default function UsersList({ users, banUser, muteUser }) {
  return (
    <ul id="users">
      {users.map(user => (
        <UserItem key={user._id} user={user} muteHandler={muteUser} banHandler={banUser} />
      ))}
    </ul>
  );
}
