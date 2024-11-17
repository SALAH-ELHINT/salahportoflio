import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* Hexagonal Background */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />

        {/* Letter S */}
        <path
          d="M28.5,38.2c0-4.8,3.9-8.7,8.7-8.7c4.8,0,8.7,3.9,8.7,8.7c0,2.4-1,4.6-2.6,6.2l-6.2,6.2
          c-1.6,1.6-2.6,3.8-2.6,6.2c0,4.8,3.9,8.7,8.7,8.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </g>
  </svg>
);

export default IconLogo;
