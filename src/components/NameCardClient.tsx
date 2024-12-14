'use client';

import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useGithubData } from '../../hooks/useGithubData';

interface NameCardClientProps {
  id: string;
}

const NameCardClient = ({ id }: NameCardClientProps) => {
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
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <FaUser className="w-12 h-12 text-gray-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{displayName}</h1>
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
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">Public Repos</p>
          <p className="text-xl">{displayRepos}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">Followers</p>
          <p className="text-xl">{displayFollowers}</p>
        </div>
      </div>
    </div>
  );
};

export default NameCardClient;
