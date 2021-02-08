import React, {useRef, useEffect} from 'react';
import MessagesItem from './MessagesItem'

export default function ChatWindow({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
     scrollToBottom()
  }, [messages]);
  
  return <div className="chat-messages">
    <ul>
      {messages.map(message => (
        <MessagesItem key={message._id} message={message} />
        ))}
    </ul>
    <div ref={messagesEndRef} />
  </div>;
}
