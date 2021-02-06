import React from 'react';

export default function ChatForm({ message, setMessage, sendMessage }) {
  return (
    <div className="chat-form-container">
      <form id="chat-form">
        <input
          id="msg"
          type="text"
          name="content"
          value={message}
          placeholder="Enter Message"
          required
          autoComplete="off"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button type="button" className="btn" onClick={(e) => sendMessage(e)}>Send</button>
      </form>
    </div>
  );
};