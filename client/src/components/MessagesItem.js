import React, { useEffect, useRef } from 'react';

export default function MessagesItem({ messages }) {
   const messagesEndRef = useRef(null);
   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
   }
   useEffect(() => {
      scrollToBottom()
   }, [messages]);
   return (
      <>
         {messages.map(message => (
            <li className="message-list_item message" key={message._id}>
               <p style={{ color: message.color }} className="meta">{message.name} <span>{message.date}</span></p>
               <p style={{ color: message.color }} className="text">{message.content}</p>
            </li>
         ))}
         <div ref={messagesEndRef} />
      </>
   );
};