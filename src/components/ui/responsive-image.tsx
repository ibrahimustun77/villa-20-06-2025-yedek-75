import React from 'react';
import { getResponsiveImageProps, ResponsiveImageProps } from '@/utils/imageUtils';

interface ResponsiveImageComponentProps extends ResponsiveImageProps {
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const ResponsiveImage: React.FC<ResponsiveImageComponentProps> = ({
  src,
  alt,
  className,
  sizes,
  loading = 'lazy'
}) => {
  const imageProps = getResponsiveImageProps(src, alt, className, sizes);
  
  return (
    <img
      src={imageProps.src}
      alt={imageProps.alt}
      className={imageProps.className}
      srcSet={imageProps.srcSet}
      sizes={imageProps.sizes}
      loading={loading}
      decoding="async"
    />
  );
};

export default ResponsiveImage;