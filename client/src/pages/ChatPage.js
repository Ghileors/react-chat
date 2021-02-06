// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatForm from '../components/ChatForm';

const ENDPOINT = "ws://localhost:5050";

export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  console.log("GET TOKEN!");
  const token = JSON.parse(localStorage.getItem("userData")).token;

  const newSocket = io(ENDPOINT, {
    query: {
      token
    },
  });

  useEffect(() => {
    newSocket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    newSocket.on('messages', (data) => {
      setMessages(data)
    });
    newSocket.on('users', (data) => {
      setUsers(data)
    });
    // eslint-disable-next-line
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      newSocket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const muteUser = id => {
    newSocket.emit('mute', id);
  }

  const banUser = id => {
    newSocket.emit('ban', id);
  }

  return (
    <div className="chat-container">
      <Header />
      <main className="chat-main">
        <Sidebar users={users} banUser={banUser} muteUser={muteUser} />
        <ChatWindow messages={messages} />
      </main>
      <ChatForm message={message} sendMessage={sendMessage} setMessage={setMessage} />
    </div>
  );
}