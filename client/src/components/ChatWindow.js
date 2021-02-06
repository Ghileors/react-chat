import React from 'react';

import MessagesItem from './MessagesItem'

export default function ChatWindow({ messages }) {
  return <div className="chat-messages">
    <ul>
      <MessagesItem messages={messages} />
    </ul>
  </div>;
}
