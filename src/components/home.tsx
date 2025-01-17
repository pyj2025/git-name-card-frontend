'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [githubId, setGithubId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubId.trim()) {
      router.push(`/namecard/${githubId}`);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              GitHub Card Generator
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <label
                htmlFor="githubId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GitHub Username
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="githubId"
                  type="text"
                  value={githubId}
                  onChange={(e) => setGithubId(e.target.value)}
                  placeholder="Enter your GitHub username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Your name card will be created based on the GitHub username you
              entered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
