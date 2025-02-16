'use client';

import { useState, useEffect, useRef } from 'react';
import supabase from '@/lib/supabaseClient';
import Message from './Message';
import Input from './Input';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // الاشتراك في التحديثات باستخدام Supabase Realtime
    const channel = supabase.channel('messages');
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      setMessages((prevMessages) => [payload.new, ...prevMessages]);
    });

    channel.subscribe();

    // إلغاء الاشتراك عند تفكيك المكون
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() === '' || !username.trim()) return;

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: message, sender: username }]);

    if (error) {
      console.error('Failed to send message:', error);
    } else {
      setMessage('');
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username);
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-box">
      {!username ? (
        <div className="username-form">
          <h2 className="text-center font-bold text-xl">Enter your name</h2>
          <form onSubmit={handleUsernameSubmit} className="flex flex-col space-y-4 mt-4">
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg">Enter Chat</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="messages">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            <div ref={endOfMessagesRef}></div>
          </div>
          <div className="input-container">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onSubmit={sendMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
