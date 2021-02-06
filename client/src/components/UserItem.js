import React from 'react';

export default function ListItem({ users, muteHandler, banHandler }) {  
    return (
      <>
      {users.map(user => (
         <li className="user-list_item" key={user._id}>
           {!user.isAdmin && (
             <div className="btn-container">
               <button
                 className="admin-control_btn mute-btn"
                 onClick={() => {
                   muteHandler(user._id);
                 }}
               >
               </button>
               <button
                 className="admin-control_btn ban-btn"
                 onClick={() => {
                   banHandler(user._id);
                 }}
               >
               </button>
             </div>
           )}
           <span style={{color: user.color}}>{user.name}</span>
           {user.isOnline && <span className="online"></span>} 
         </li>
       ))}
      </>
   );
};