'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HomeClient = () => {
  const [githubId, setGithubId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubId.trim()) {
      router.push(`/namecard/${githubId}`);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          GitHub NameCard Generator
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={githubId}
            onChange={(e) => setGithubId(e.target.value)}
            placeholder="Enter GitHub Username"
            className="w-full mb-4 px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Create NameCard
          </button>
        </form>
      </div>
    </main>
  );
};

export default HomeClient;
