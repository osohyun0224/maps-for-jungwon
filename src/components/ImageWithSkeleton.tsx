'use client';

import { useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  style?: React.CSSProperties;
}

const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
  className,
  objectFit = "cover",
  style
}: ImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: 'relative', width, height }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Skeleton width="100%" height="100%" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ 
          ...style, 
          objectFit, 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s' 
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton; 