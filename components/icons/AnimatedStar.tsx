
import React from 'react';

export const StaticLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 100 100"
      className="text-primary"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="29" y1="35" x2="71" y2="65" />
        <line x1="29" y1="65" x2="71" y2="35" />
      </g>
    </svg>
  );
};
