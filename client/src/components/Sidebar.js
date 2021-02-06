import React from 'react';

import UsersList from './UsersList';

export default function Sidebar({ users, banUser, muteUser }) {
  return (
    <div className="chat-sidebar">
      <h3>Users</h3>
      <UsersList users={users} banUser={banUser} muteUser={muteUser} />
    </div>
  );
};
