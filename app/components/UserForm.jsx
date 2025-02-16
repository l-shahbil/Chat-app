'use client';
import { useState } from 'react';

const UserForm = ({ onUserSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      localStorage.setItem('chat_username', username);
      onUserSubmit(username);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Enter your name to join the chat:</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded">
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default UserForm;
