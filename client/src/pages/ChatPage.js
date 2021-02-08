import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatForm from '../components/ChatForm';

export const ChatPage = ({socket}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('messages', (data) => {
      setMessages(data)
    });
    socket.on('users', (data) => {
      setUsers(data)
    });
    socket.on('logout', () => {
      auth.logout();
      history.push('/')
    });
  }, [setMessages, setUsers, auth, history, socket]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chat-container">
      <Header socket={socket}/>
      <main className="chat-main">
        <Sidebar users={users} socket={socket} />
        <ChatWindow messages={messages} />
      </main>
      <ChatForm message={message} sendMessage={sendMessage} setMessage={setMessage} />
    </div>
  );
}