import React from 'react';

import UsersList from './UsersList';

export default function Sidebar({ users, socket }) {
  const muteUser = id => {
    socket.emit('mute', id);
  };

  const banUser = id => {
    socket.emit('ban', id);
  };

  return (
    <div className="chat-sidebar">
      <h3>Users</h3>
      <UsersList users={users} banUser={banUser} muteUser={muteUser} />
    </div>
  );
}
