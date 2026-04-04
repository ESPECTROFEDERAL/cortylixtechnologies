// === Security Utilities ===

/** Allowed image MIME types for uploads */
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

/** Max file size: 5MB */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Dangerous file extensions */
const BLOCKED_EXTENSIONS = new Set([
  'exe', 'php', 'js', 'sh', 'bat', 'cmd', 'ps1', 'py', 'rb', 'pl',
  'cgi', 'htm', 'html', 'svg', 'swf', 'jar', 'war',
]);

export const validateImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return 'Only JPG, PNG, WebP, and GIF images are allowed.';
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (BLOCKED_EXTENSIONS.has(ext)) {
    return 'This file type is not allowed.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be under 5MB.';
  }
  return null;
};

/** Sanitize text input — strip HTML tags */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

/** Sanitize URL input */
export const sanitizeUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
};

/** Rate limiter for client-side use */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
};

export const getRateLimitRemainingTime = (key: string): number => {
  const entry = rateLimitMap.get(key);
  if (!entry) return 0;
  const remaining = entry.resetTime - Date.now();
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
};
