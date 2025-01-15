'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import * as htmlToImage from 'html-to-image';
import dynamic from 'next/dynamic';

const NameCard = dynamic(() => import('./name-card'), {
  ssr: false,
});

interface CardPageProps {
  id: string;
}

const CardPage = ({ id }: CardPageProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1.0,
        backgroundColor: '#ffffff',
        width: 670,
        height: 280,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      const link = document.createElement('a');
      link.download = `${id}-github-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen p-6 flex flex-col">
      {/* Back button container */}
      <div className="w-full">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600"
        >
          <IoChevronBack size={24} />
        </button>
      </div>

      {/* Card container - centered */}
      <div className="flex-grow flex items-center justify-center">
        <div ref={cardRef}>
          <NameCard id={id} />
        </div>
      </div>

      {/* Download button container */}
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={handleDownload}
          className="w-full p-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CardPage;
