'use client';

import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useGithubData } from '../../../hooks/useGithubData';

interface NameCardProps {
  id: string;
}

const NameCard = ({ id }: NameCardProps) => {
  const { name, repos, followers } = useGithubData(id);

  const [mounted, setMounted] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [displayRepos, setDisplayRepos] = useState();
  const [displayFollowers, setDisplayFollowers] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDisplayName(name?.data?.name ?? 'N/A');
    setDisplayRepos(repos?.data?.repos ?? 'N/A');
    setDisplayFollowers(followers?.data?.followers ?? 'N/A');
  }, [name, repos, followers]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* GitHub Icon */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>

        {/* QR Code */}
        <div className="flex-shrink-0">
          <QRCode
            value={`https://github.com/${id}`}
            size={60}
            bgColor="#f0f0f0"
            fgColor="#333333"
          />
        </div>

        {/* GitHub URL */}
        <a
          href={`https://github.com/${id}`}
          className="text-blue-600 hover:underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.github.com/{id}
        </a>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 my-2"></div>

        {/* Stats */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Public Repos:</span>
            <span className="font-semibold">{displayRepos}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Followers:</span>
            <span className="font-semibold">{displayFollowers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
