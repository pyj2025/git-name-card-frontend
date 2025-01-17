'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import * as htmlToImage from 'html-to-image';
import dynamic from 'next/dynamic';
import { FiDownload, FiShare2 } from 'react-icons/fi';
import LoadingSpinner from './loading-spinner';
import { UserType } from './name-card';

const NameCard = dynamic(() => import('./name-card'), {
  ssr: false,
});

const ButtonStyle =
  'p-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:transform-none enabled:hover:bg-gray-50 enabled:hover:shadow enabled:hover:-translate-y-0.5';

const ButtonIconStyle = 'w-5 h-5';

interface CardPageProps {
  id: string;
}

const CardPage = ({ id }: CardPageProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preloadedImage, setPreloadedImage] = useState<string>('');

  const [userData, setUserData] = useState<UserType>({
    login: '',
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
        setUserData((prev) =>
          JSON.stringify(prev) === JSON.stringify(data) ? prev : data
        );

        if (data.avatar_url) {
          const base64Image = await convertImageToBase64(data.avatar_url);
          setPreloadedImage(base64Image);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const convertImageToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image:', error);
      throw error;
    }
  };

  const waitForImageLoad = (img: HTMLImageElement): Promise<void> => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
      }
    });
  };

  const generateImage = async (): Promise<string> => {
    if (!cardRef.current) throw new Error('Card reference not found');

    const avatar = cardRef.current.querySelector('img');
    if (avatar && preloadedImage) {
      avatar.src = preloadedImage;
      await waitForImageLoad(avatar);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return htmlToImage.toJpeg(cardRef.current, {
      quality: 1,
      cacheBust: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      imagePlaceholder: preloadedImage,
      filter: (node) => {
        const className = node.className || '';
        return !className.includes('skip-download');
      },
    });
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();

      const blob = await (await fetch(dataUrl)).blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.download = `${id}-github-card.png`;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${id}-github-card.png`, {
        type: 'image/png',
      });

      if (navigator.share) {
        await navigator.share({
          title: 'GitHub Card',
          text: 'GitHub Card',
          files: [file],
        });
      } else {
        const shareUrl = window.location.href;
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600"
        >
          <IoChevronBack size={24} />
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center px-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div ref={cardRef}>
            <NameCard data={userData} />
          </div>
        )}
      </div>

      <div className="w-full max-w-sm mx-auto grid grid-cols-2 gap-3 p-6">
        <button
          onClick={handleDownload}
          className={ButtonStyle}
          disabled={isLoading || isGenerating}
        >
          <FiDownload className={ButtonIconStyle} />
          <span>{isGenerating ? 'Processing...' : 'Download'}</span>
        </button>

        <button
          onClick={handleShare}
          className={ButtonStyle}
          disabled={isLoading || isGenerating}
        >
          <FiShare2 className={ButtonIconStyle} />
          <span>{isGenerating ? 'Processing...' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
};

export default CardPage;
