interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Multi-color authentic TikTok logo (cyan & red/magenta offset notes)
 */
export function TikTokBrandIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Cyan offset */}
      <path
        d="M19.2 6.5a4.7 4.7 0 0 1-3.6-4.2V2h-3v13.5a2.7 2.7 0 1 1-3.7-2.5c.3 0 .6.04.9.1V9.8a5.7 5.7 0 1 0 5.8 5.7V8.4a8 8 0 0 0 4.6 1.5V6.7c-.3-.1-.7-.1-1-.2z"
        fill="#25F4EE"
        transform="translate(-0.6, 0.4)"
      />
      {/* Red/Magenta offset */}
      <path
        d="M19.2 6.5a4.7 4.7 0 0 1-3.6-4.2V2h-3v13.5a2.7 2.7 0 1 1-3.7-2.5c.3 0 .6.04.9.1V9.8a5.7 5.7 0 1 0 5.8 5.7V8.4a8 8 0 0 0 4.6 1.5V6.7c-.3-.1-.7-.1-1-.2z"
        fill="#FE2C55"
        transform="translate(0.6, -0.4)"
      />
      {/* Black/white main overlay */}
      <path
        d="M19.2 6.5a4.7 4.7 0 0 1-3.6-4.2V2h-3v13.5a2.7 2.7 0 1 1-3.7-2.5c.3 0 .6.04.9.1V9.8a5.7 5.7 0 1 0 5.8 5.7V8.4a8 8 0 0 0 4.6 1.5V6.7c-.3-.1-.7-.1-1-.2z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Authentic LinkedIn brand icon (LinkedIn Blue #0A66C2)
 */
export function LinkedInBrandIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M6.94 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5.5 9h2.88v9.5H5.5V9zm4.68 0H13v1.3h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.16H16.6V13.9c0-1.08-.02-2.48-1.5-2.48-1.52 0-1.75 1.18-1.75 2.4v4.68h-2.88V9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Authentic GitHub Octocat logo (GitHub Purple/Indigo or dark fill #24292F / #EA4AAA)
 */
export function GitHubBrandIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#24292F" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.03 3 3 7.03 3 12c0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.43 0-.21-.01-.78-.01-1.53-2.5.54-3.03-1.21-3.03-1.21-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.11.98 2.62.75.08-.58.31-.98.57-1.21-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.09-.23-.4-1.15.09-2.39 0 0 .76-.24 2.48.93A8.62 8.62 0 0 1 12 7.07c.77 0 1.55.1 2.27.31 1.72-1.17 2.48-.93 2.48-.93.49 1.24.18 2.16.09 2.39.58.63.93 1.44.93 2.42 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.67 0 1.21-.01 2.18-.01 2.48 0 .24.16.52.62.43A9.01 9.01 0 0 0 21 12c0-4.97-4.03-9-9-9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Authentic Gmail / Google Mail Envelope logo with full official color strokes
 */
export function GmailBrandIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Red flap */}
      <path
        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
        fill="#FFFFFF"
      />
      {/* Blue left stroke */}
      <path
        d="M2 6V18C2 19.1 2.9 20 4 20H6V9L2 6Z"
        fill="#4285F4"
      />
      {/* Green right stroke */}
      <path
        d="M22 6V18C22 19.1 21.1 20 20 20H18V9L22 6Z"
        fill="#34A853"
      />
      {/* Yellow flap corner */}
      <path
        d="M18 9V4H17L12 8.5L7 4H6V9L12 14.5L18 9Z"
        fill="#EA4335"
      />
      {/* Dark red top/back crease */}
      <path
        d="M6 4L12 9.5L18 4H20C21.1 4 22 4.9 22 6L12 15L2 6C2 4.9 2.9 4 4 4H6Z"
        fill="#EA4335"
      />
      <path
        d="M2 6L12 13.5L22 6V6.5L12 14L2 6.5V6Z"
        fill="#C5221F"
      />
      {/* Subtle border to keep it crisp against any bg */}
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4285F4" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
}

/**
 * Authentic WhatsApp green logo (#25D366)
 */
export function WhatsAppBrandIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M17.5 14.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.3 0-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.9.8-.9 2 0 1.2.9 2.4 1 2.6.1.1 1.7 2.6 4.1 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.1-.5-.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
