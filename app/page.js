'use client';

import { useState } from 'react';
import ChatBox from './components/ChatBox';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">أدخل اسمك</h2>
          <input
            type="text"
            className="input-field w-full mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="send-button w-full" onClick={() => setIsLoggedIn(true)}>
            دخول
          </button>
        </div>
      ) : (
        <ChatBox username={username} />
      )}
    </div>
  );
}
