import React from 'react';
import jwt_decode from 'jwt-decode'

export default function ListItem({ user, muteHandler, banHandler }) {
  const admin = jwt_decode(localStorage.getItem("userData")).admin
  return (
    <li className="user-list_item">
      {!user.isAdmin && admin && (
        <div className="btn-container">
          <button
            className="admin-control_btn mute-btn"
            onClick={() => {
              muteHandler(user._id);
              }}
          ></button>
          <button
                className="admin-control_btn ban-btn"
                onClick={() => {
                  banHandler(user._id);
                }}
          ></button>
        </div>
      )}
      <span style={{ color: user.color }}>{user.isAdmin && <span>Admin: </span>}{user.name}</span>
      {user.isOnline && <span className="online"></span>}
    </li>
  );
};