'use client';

import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useGithubData } from '../../../hooks/useGithubData';
import Separator from './separator';

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

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[360px] min-h-[500px]">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2">
          <FaGithub className="w-6 h-6 text-black" />
          <span className="text-xl font-medium">Git Card</span>
        </div>

        <div className="flex-shrink-0">
          <QRCode
            value={`https://github.com/${id}`}
            size={60}
            bgColor="#f0f0f0"
            fgColor="#333333"
          />
        </div>

        <p className="text-gray-500 text-sm">{today}</p>

        <Separator />

        <div className="w-full space-y-2 text-gray-500 text-sm">
          <div className="flex justify-between items-center">
            <span>Name:</span>
            <span>
              {displayName} @{id}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>URL:</span>
            <span>www.github.com/{id}</span>
          </div>
        </div>

        <Separator />

        <div className="w-full space-y-2 text-gray-500 text-sm">
          <div className="flex justify-between items-center">
            <span>Name:</span>
            <span>{displayName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Public Repos:</span>
            <span>{displayRepos}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Followers:</span>
            <span>{displayFollowers}</span>
          </div>
        </div>

        <Separator />

        <div className="mt-auto pt-4">
          <Barcode value={id} height={40} />
        </div>
      </div>
    </div>
  );
};

export default NameCard;
