import React from 'react';
import { format } from 'date-fns';
import { FaGithub, FaUser } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import Separator from './separator';

export type UserType = {
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

const SectionContainerStyle = 'w-full space-y-1 text-gray-500 text-sm';
const SectionLineStyle = 'flex justify-between items-center';

interface NameCardProps {
  data: UserType;
}

const NameCard = ({ data }: NameCardProps) => {
  return (
    <div className="bg-white p-4 pt-6 rounded-lg shadow-lg w-[360px] min-h-[600px] flex flex-col justify-between">
      <div className="flex flex-col space-y-4">
        <div className={SectionLineStyle}>
          <div className="flex items-center gap-2">
            <FaGithub className="w-6 h-6 text-black" />
            <span className="text-xl font-medium">
              {data.name || 'N/A'} @{data.login}
            </span>
          </div>
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

        <div className={SectionContainerStyle}>
          {data.bio && (
            <div className="flex flex-col">
              <span>Bio:</span>
              <span className="break-words">{data.bio}</span>
            </div>
          )}
        </div>
        <Separator />

        <div className={SectionContainerStyle}>
          {data.created_at && (
            <div className={SectionLineStyle}>
              <span>Born:</span>
              <span>{format(new Date(data.created_at), 'MMM dd yyyy')}</span>
            </div>
          )}
          {data.updated_at && (
            <div className={SectionLineStyle}>
              <span>Updated At:</span>
              <span>
                {format(new Date(data.updated_at), 'MMM dd yyyy, HH:mm:ss')}
              </span>
            </div>
          )}
          {data.location && (
            <div className={SectionLineStyle}>
              <span>Location:</span>
              <span>{data.location}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className={SectionContainerStyle}>
          <div className={SectionLineStyle}>
            <span>Public Repos:</span>
            <span>{data.public_repos}</span>
          </div>
          <div className={SectionLineStyle}>
            <span>Public Gists:</span>
            <span>{data.public_gists}</span>
          </div>
          <div className={SectionLineStyle}>
            <span>Following:</span>
            <span>{data.following}</span>
          </div>
          <div className={SectionLineStyle}>
            <span>Followers:</span>
            <span>{data.followers}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {data.blog ? (
          <div className="flex justify-center gap-16">
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Github</div>
              <QRCode
                value={data.html_url}
                size={40}
                bgColor="#f0f0f0"
                fgColor="#333333"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Blog</div>
              <QRCode
                value={data.blog}
                size={40}
                bgColor="#f0f0f0"
                fgColor="#333333"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <QRCode
                value={data.html_url}
                size={60}
                bgColor="#f0f0f0"
                fgColor="#333333"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameCard;
