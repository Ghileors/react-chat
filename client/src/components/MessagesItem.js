import React from 'react';

export default function MessagesItem({ messages }) {
   return (
      <>
         {messages.map(message => (
            <li className="message-list_item message" key={message._id}>
               <p className="meta">{message.name} <span>{message.date}</span></p>
               <p style={{ color: message.color }} className="text">{message.content}</p>
            </li>
         ))}
      </>
   );
};