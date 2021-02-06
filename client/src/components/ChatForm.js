import React, { useState, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';


export default function ChatForm({ message, setMessage, sendMessage }) {
  // const { request } = useHttp();
  // const [form, setForm] = useState({
  // 	content: '',
  // });

  // const changeHandler = event => {
  // 	setForm({ ...form, [event.target.name]: event.target.value });
  // };

  // const submitHandler = useCallback(async () => {
  //   try {
  //     const data = await request('/chat/messages', 'POST', {...form});
  //     setForm(data);
  //   } catch (err) {};
  // }, [request, form]);

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
        <button type="submit" className="btn" onClick={(e) => sendMessage(e)}>Send</button>
      </form>
    </div>
  );
};