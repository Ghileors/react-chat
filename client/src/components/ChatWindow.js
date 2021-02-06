import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';

import MessagesItem from './MessagesItem'

export default function ChatWindow({messages}) {
  return <div className="chat-messages">
    <ul>
      <MessagesItem messages={ messages }/>
    </ul>
  </div>;
}
