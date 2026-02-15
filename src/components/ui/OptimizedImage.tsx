import { useState, useEffect, type ImgHTMLAttributes } from 'react';
import { FileImage, Loader2 } from 'lucide-react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loaderClassName?: string;
  errorFallback?: React.ReactNode;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loaderClassName = '',
  errorFallback,
  objectFit = 'cover',
  priority = false,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };

    img.onerror = () => {
      setError(true);
      setLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit];

  if (error) {
    return (
      <div
        style={containerStyle}
        className={`flex items-center justify-center rounded ${className} 
        bg-gradient-to-r from-gray-200/75 via-gray-300/75 to-gray-200/75 bg-[length:200%_100%] animate-gradient text-gray-600 hover:bg-gray-300`}
      >
        {errorFallback || (
          <div className="text-gray-400 text-center p-4"> 
            <FileImage size={32} strokeWidth={1.5} className='mx-auto mb-2' />
            <p className="text-sm">❌Failed to load</p>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={containerStyle}
        className={`flex items-center justify-center bg-gray-100 rounded animate-pulse ${loaderClassName}`}
      >
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc!}
      alt={alt}
      width={width}
      height={height}
      className={`${objectFitClass} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
    />
  );
};