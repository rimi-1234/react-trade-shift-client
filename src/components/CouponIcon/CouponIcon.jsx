import React from 'react';

// This is a simplified SVG representation of the coupons in your image.
export function CouponIcon({ className }) {
  return (
    <svg
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: 'rotate(-15deg)', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }}
    >
      {/* Second coupon (bottom) */}
      <path
        d="M190 60 H10 V110 H190 V60 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <path
        d="M10 60 V110 M190 60 V110"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text x="100" y="90" fontSize="10" fill="#34d399" textAnchor="middle" fontWeight="bold">ONLINE</text>
      <text x="100" y="80" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">DISCOUNT</text>
      
      {/* Main coupon (top) */}
      <path
        d="M180 20 H0 V70 H180 V20 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <path
        d="M0 20 V70 M180 20 V70"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text x="90" y="50" fontSize="20" fill="#34d399" textAnchor="middle" fontWeight="bold">50%</text>
      <text x="90" y="62" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">DISCOUNT ONLINE</text>
      <text x="30" y="30" fontSize="5" fill="#9ca3af" textAnchor="middle" writingMode="tb">BARCODE ONLY</text>
    </svg>
  );
}