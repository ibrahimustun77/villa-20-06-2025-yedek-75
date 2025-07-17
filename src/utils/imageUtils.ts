/**
 * Image utility functions for responsive image handling
 */

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Generates responsive image URLs from Unsplash with different sizes
 */
export const generateUnsplashSrcSet = (baseUrl: string): string => {
  if (!baseUrl.includes('unsplash.com')) {
    return baseUrl;
  }
  
  // Extract the base URL without query parameters
  const [url] = baseUrl.split('?');
  
  return [
    `${url}?w=400&q=75 400w`,
    `${url}?w=800&q=75 800w`,
    `${url}?w=1200&q=75 1200w`,
    `${url}?w=1600&q=75 1600w`
  ].join(', ');
};

/**
 * Generates responsive image URLs from Supabase Storage with different sizes
 * For now, returns the original URL as we need to implement resizing on Supabase
 */
export const generateSupabaseSrcSet = (baseUrl: string): string => {
  // For Supabase URLs, we would need to implement image transformations
  // For now, return the original URL
  return baseUrl;
};

/**
 * Determines the appropriate srcset based on the image source
 */
export const generateSrcSet = (src: string): string => {
  if (src.includes('unsplash.com')) {
    return generateUnsplashSrcSet(src);
  }
  
  if (src.includes('supabase') || src.startsWith('/lovable-uploads/')) {
    return generateSupabaseSrcSet(src);
  }
  
  return src;
};

/**
 * Default sizes attribute for responsive images
 */
export const defaultSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/**
 * Responsive image component props with optimized loading
 */
export const getResponsiveImageProps = (
  src: string, 
  alt: string, 
  className?: string,
  sizes?: string
): ResponsiveImageProps & { srcSet?: string; sizes: string } => {
  const srcSet = generateSrcSet(src);
  
  return {
    src,
    alt,
    className,
    srcSet: srcSet !== src ? srcSet : undefined,
    sizes: sizes || defaultSizes
  };
};