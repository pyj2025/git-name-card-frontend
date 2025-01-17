import React from 'react';
import { FaGithub, FaUser } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import Separator from './separator';

interface NameCardProps {
  data: any;
}

const NameCard = ({ data }: NameCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[360px] min-h-[600px]">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaGithub className="w-6 h-6 text-black" />
            <span className="text-xl font-medium">Git Card</span>
          </div>
          <QRCode
            value={`https://github.com/${data.login}`}
            size={60}
            bgColor="#f0f0f0"
            fgColor="#333333"
          />
        </div>

        <div className="flex justify-center">
          {data.avatar_url ? (
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100">
              <img
                src={data.avatar_url}
                alt={`${data.login}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-lg">
              <FaUser className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>

        <div className="w-full space-y-1 text-gray-500 text-sm">
          {data.name && (
            <div className="flex justify-between items-center">
              <span>Name:</span>
              <span>
                {data.name} @{data.login}
              </span>
            </div>
          )}
          {data.bio && (
            <div className="flex flex-col">
              <span>Bio:</span>
              <span className="break-words">{data.bio}</span>
            </div>
          )}
        </div>
        <Separator />

        <div className="w-full space-y-1 text-gray-500 text-sm">
          {data.created_at && (
            <div className="flex justify-between items-center">
              <span>Born:</span>
              <span>{data.created_at}</span>
            </div>
          )}
          {data.updated_at && (
            <div className="flex justify-between items-center">
              <span>Updated At:</span>
              <span>{data.updated_at}</span>
            </div>
          )}
          {data.location && (
            <div className="flex justify-between items-center">
              <span>Location:</span>
              <span>{data.location}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="w-full space-y-1 text-gray-500 text-sm">
          <div className="flex justify-between items-center">
            <span>Following:</span>
            <span>{data.following}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Followers:</span>
            <span>{data.followers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Public Repos:</span>
            <span>{data.public_repos}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
