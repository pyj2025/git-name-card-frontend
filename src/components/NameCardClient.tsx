'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { MdEmail, MdLanguage } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import QRCode from 'react-qr-code';

interface NameCardClientProps {
  id: string;
}

const NameCardClient = ({ id }: NameCardClientProps) => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push('/')}
        className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600"
      >
        <IoChevronBack size={24} />
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{id}</h1>
            <p className="text-gray-600 mt-1">@{id}</p>
            <p className="text-gray-600">GitHub User</p>
          </div>
          <div className="flex-shrink-0">
            <QRCode
              value={`https://github.com/${id}`}
              size={80}
              bgColor="#f0f0f0"
              fgColor="#333333"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center text-gray-600 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <MdEmail className="text-2xl" />
              <a
                href="mailto:example@email.com"
                className="hover:text-blue-500 text-sm"
              >
                example@email.com
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center text-gray-600 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <MdLanguage className="text-2xl" />
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 text-sm"
              >
                example.com
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center text-gray-600 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-2xl" />
              <a
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 text-sm"
              >
                linkedin.com/in/example
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Public Repos</p>
            <p className="text-xl">0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Followers</p>
            <p className="text-xl">0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NameCardClient;
