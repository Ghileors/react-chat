import React from 'react';

import UsersList from './UsersList';

export default function Sidebar({ users }) {
    return (
        <div className="chat-sidebar">
          <h3>Users</h3>
          <UsersList users={ users }/>
        </div>
    );
};
