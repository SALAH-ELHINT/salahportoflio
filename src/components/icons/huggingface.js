import React from 'react';
import PropTypes from 'prop-types';

const IconHuggingFace = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`feather feather-hugging-face ${className}`}
    {...props}>
    {/* Face circle */}
    <circle cx="12" cy="12" r="10" />

    {/* Eyes */}
    <path d="M8 9.05v-.1" />
    <path d="M16 9.05v-.1" />

    {/* Smiling mouth */}
    <path d="M16 14a4 4 0 01-8 0" />

    {/* Hugging arms */}
    <path d="M21 12c-1.2-1.2-2.4-1.2-3.6 0M6.6 12c-1.2-1.2-2.4-1.2-3.6 0" />
  </svg>
);

IconHuggingFace.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconHuggingFace;
