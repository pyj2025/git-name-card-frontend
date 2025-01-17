'use client';

import React, { useState, useEffect } from 'react';
import { FaGithub, FaUser } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import Separator from './separator';
import LoadingSpinner from './loading-spinner';

type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  hireable: boolean | null;
  type: string;
};

interface NameCardProps {
  id: string;
  setLoading: (flag: boolean) => void;
}

const NameCard = ({ id, setLoading }: NameCardProps) => {
  const [userData, setUserData] = useState<UserType | undefined>();

  useEffect(() => {
    const fetchRepo = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({
          login: id,
          id: 0,
          avatar_url: '',
          html_url: '',
          name: '',
          company: null,
          blog: '',
          location: null,
          email: null,
          bio: null,
          twitter_username: null,
          public_repos: 0,
          public_gists: 0,
          followers: 0,
          following: 0,
          created_at: '',
          updated_at: '',
          hireable: null,
          type: '',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRepo();
    }
  }, [id]);

  // const today = new Date().toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  if (!userData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[360px] min-h-[600px]">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaGithub className="w-6 h-6 text-black" />
            <span className="text-xl font-medium">Git Card</span>
          </div>
          <QRCode
            value={`https://github.com/${id}`}
            size={60}
            bgColor="#f0f0f0"
            fgColor="#333333"
          />
        </div>

        <div className="flex justify-center">
          {userData.avatar_url ? (
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100">
              <img
                src={userData.avatar_url}
                alt={`${id}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-lg">
              <FaUser className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>
        {/* <p className="text-gray-500 text-sm text-center">{today}</p> */}
        <div className="w-full space-y-1 text-gray-500 text-sm">
          {userData.name && (
            <div className="flex justify-between items-center">
              <span>Name:</span>
              <span>
                {userData.name} @{id}
              </span>
            </div>
          )}
          {userData.bio && (
            <div className="flex flex-col">
              <span>Bio:</span>
              <span className="break-words">{userData.bio}</span>
            </div>
          )}
        </div>
        <Separator />

        <div className="w-full space-y-1 text-gray-500 text-sm">
          {userData.created_at && (
            <div className="flex justify-between items-center">
              <span>Born:</span>
              <span>{userData.created_at}</span>
            </div>
          )}
          {userData.updated_at && (
            <div className="flex justify-between items-center">
              <span>Updated At:</span>
              <span>{userData.updated_at}</span>
            </div>
          )}
          {userData.location && (
            <div className="flex justify-between items-center">
              <span>Location:</span>
              <span>{userData.location}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="w-full space-y-1 text-gray-500 text-sm">
          <div className="flex justify-between items-center">
            <span>Following:</span>
            <span>{userData.following}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Followers:</span>
            <span>{userData.followers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Public Repos:</span>
            <span>{userData.public_repos}</span>
          </div>
        </div>
        {/* <div className="mt-auto pt-2 border">
          <Barcode value={id} height={20} />
        </div> */}
      </div>
    </div>
  );
};

export default NameCard;
