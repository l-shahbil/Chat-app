'use client';

import { useEffect, useRef, useState } from 'react';
import supabase from '@/lib/supabase';
import Message from './Message';
import Input from './Input';
import { FaUsers } from "react-icons/fa";

export default function ChatBox({ username }) {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error) setMessages(data);
    };

    fetchMessages();

    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    await supabase.from('messages').insert([{ content: input, sender: username, created_at: new Date() }]);

    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container w-full">
      <div className="chat-header w-full flex gap-4 items-center justify-end">
        <p className='text-2xl'>
        غرفة لدردشة
        </p>
      <FaUsers className='w-9 h-9'/>
        </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full md:w-1/2 bg-transparent mx-auto">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} currentUser={username} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Input value={input} onChange={(e) => setInput(e.target.value)} onSubmit={sendMessage} />
    </div>
  );
}
