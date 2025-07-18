import DOMPurify from 'dompurify';

/**
 * Sanitizes SVG content to prevent XSS attacks
 * @param svgContent - Raw SVG string
 * @returns Sanitized SVG string safe for rendering
 */
export const sanitizeSVG = (svgContent: string): string => {
  if (!svgContent || typeof svgContent !== 'string') {
    return '';
  }

  // Configure DOMPurify for SVG sanitization
  const cleanSVG = DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ALLOWED_TAGS: [
      'svg', 'g', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
      'ellipse', 'text', 'tspan', 'defs', 'linearGradient', 'radialGradient',
      'stop', 'clipPath', 'mask', 'pattern', 'image', 'switch', 'foreignObject'
    ],
    ALLOWED_ATTR: [
      'viewBox', 'xmlns', 'width', 'height', 'd', 'fill', 'stroke', 'stroke-width',
      'stroke-linecap', 'stroke-linejoin', 'opacity', 'fill-opacity', 'stroke-opacity',
      'transform', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points',
      'class', 'id', 'style', 'clip-path', 'mask', 'filter'
    ],
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });

  return cleanSVG;
};

/**
 * Validates and sanitizes iframe content
 * @param iframeHtml - Raw iframe HTML string
 * @returns Sanitized iframe HTML or empty string if invalid
 */
export const sanitizeIframe = (iframeHtml: string): string => {
  if (!iframeHtml || typeof iframeHtml !== 'string') {
    return '';
  }

  // Only allow iframe tags from trusted domains
  const trustedDomains = [
    'google.com',
    'maps.google.com',
    'youtube.com',
    'vimeo.com'
  ];

  const cleanIframe = DOMPurify.sanitize(iframeHtml, {
    ALLOWED_TAGS: ['iframe'],
    ALLOWED_ATTR: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'style'],
    FORBID_ATTR: ['onload', 'onerror', 'onclick']
  });

  // Additional validation for iframe src
  if (cleanIframe.includes('<iframe')) {
    const srcMatch = cleanIframe.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      const src = srcMatch[1];
      const isValidDomain = trustedDomains.some(domain => 
        src.includes(domain) || src.startsWith('https://')
      );
      
      if (!isValidDomain) {
        console.warn('Blocked iframe from untrusted domain:', src);
        return '';
      }
    }
  }

  return cleanIframe;
};

/**
 * Validates URL to ensure it's safe
 * @param url - URL string to validate
 * @returns True if URL is safe, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    // Only allow https and http protocols
    return ['https:', 'http:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Sanitizes general HTML content
 * @param htmlContent - Raw HTML string
 * @returns Sanitized HTML string
 */
export const sanitizeHtml = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title'],
    FORBID_ATTR: ['style', 'onclick', 'onload', 'onerror']
  });
};