import React from 'react';

export default function MessagesItem({ message }) {
  return (
     <li className="message-list_item message">
         <p>{new Date(message.date).toUTCString()}</p>
         <p style={{ color: message.color }} className="meta">{message.name}</p>
         <p style={{ color: message.color }} className="text">{message.content}</p>
      </li>
         
   );
};