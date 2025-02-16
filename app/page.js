'use client';

import { useState } from 'react';
import ChatBox from './components/ChatBox';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 text-right">
      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-3">اسم المستخدم</h2>
          <form action="#" onSubmit={() => username.trim() === "" ? false : setIsLoggedIn(true)}>

            <input
              type="text"
              className="input-field w-full mb-3 border-2 p-2 rounded-md text-right"
              value={username}
              placeholder='ادخل اسم لمتسخدم'
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="send-button w-full px-4 py-2 bg-blue-500 text-white rounded-md">
              دخول
            </button>
          </form>
        </div>
      ) : (
        <ChatBox username={username} />
      )}
    </div>
  );
}
