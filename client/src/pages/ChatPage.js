import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatForm from '../components/ChatForm';

const ENDPOINT = "ws://localhost:5050";

const item = JSON.parse(localStorage.getItem("userData"));
const token = item ? item.token : null;

const newSocket = io(ENDPOINT, {
  query: {
    token
  },
});

export const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const auth = useContext(AuthContext);

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
    newSocket.on('logout', () => {
      auth.logout();
      history.push('/')
    })
  }, [setMessages, setUsers, auth, history]);

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