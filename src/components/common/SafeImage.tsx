'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  priority?: boolean;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'square',
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-50 flex items-center justify-center ${aspectClasses[aspectRatio]} ${containerClassName}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-4 text-slate-400 gap-1 text-center">
          <Package size={28} className="stroke-1 text-slate-300" />
          <span className="text-[11px] font-medium text-slate-400">
            Image Unavailable
          </span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      )}
    </div>
  );
};
