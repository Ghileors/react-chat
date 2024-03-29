// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import jwt_decode from 'jwt-decode';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatForm from '../components/ChatForm';

const ENDPOINT = "ws://localhost:5050";

export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const token = JSON.parse(localStorage.getItem("userData")).token;
  const newSocket = io(ENDPOINT, {
    query: {
      token
    },
  });

  useEffect(() => {
    newSocket.emit("join");
    newSocket.on('message', message => {
      setMessages(msgs => [...msgs, message]);
    });
    newSocket.on('messages', (data) => {
      setMessages(data)
    });
    newSocket.on('users', (data) => {
      setUsers(data)
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      newSocket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chat-container">
      <Header />
      <main className="chat-main">
        <Sidebar users={users} />
        <ChatWindow messages={messages} />
      </main>
      <ChatForm message={message} sendMessage={sendMessage} setMessage={setMessage} />
    </div>
  );
}