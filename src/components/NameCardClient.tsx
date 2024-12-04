'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { useParams, useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

const NameCardClient = () => {
  const router = useRouter();
  const { id } = useParams();

  return (
    <main className="min-h-screen p-4 bg-gray-900 text-gray-100">
      <div className="max-w-2xl mx-auto mt-10">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
        >
          <IoChevronBack size={24} />
          <span className="ml-2">Back</span>
        </button>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
              <FaUserCircle size={36} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{id}</h1>
              <p className="text-gray-400">GitHub User</p>
            </div>
            <div>
              <QRCode
                value={`https://github.com/pyj2025`}
                size={80}
                bgColor="#f0f0f0"
                fgColor="#333333"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="font-semibold text-gray-300">Public Repos</p>
              <p className="text-2xl text-gray-100">0</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="font-semibold text-gray-300">Followers</p>
              <p className="text-2xl text-gray-100">0</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NameCardClient;
