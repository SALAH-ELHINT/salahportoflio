import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      display: block;
      margin-bottom: 20px;
    }
  }
`;

const StyledText = styled.div`
  p {
    margin-bottom: 20px;
    color: var(--slate);
  }
`;

const StyledSkillsTitle = styled.p`
  margin: 40px 0 20px 0;
  font-family: var(--font-mono);
  color: var(--lightest-slate);
  font-size: var(--fz-md);
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: block;
    position: relative;
    width: 200px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--lightest-navy);

    @media (max-width: 768px) {
      width: 100px;
    }
  }
`;

const StyledSkillsDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCategoryPanel = styled.div`
  background: var(--light-navy);
  border: 1px solid rgba(100, 255, 218, 0.05);
  border-radius: 12px;
  padding: 22px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.5);

  @media (max-width: 480px) {
    padding: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--green), transparent);
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.15);
    box-shadow: 0 20px 40px -20px rgba(2, 12, 27, 0.7), 0 0 15px rgba(100, 255, 218, 0.04);

    &::before {
      background: linear-gradient(90deg, var(--green), var(--navy));
      opacity: 1;
      height: 4px;
    }

    .panel-header .indicator {
      background-color: var(--green);
      box-shadow: 0 0 12px var(--green);
    }
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(100, 255, 218, 0.08);
    padding-bottom: 10px;

    .indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: rgba(100, 255, 218, 0.25);
      transition: all 0.3s ease;
    }

    h4 {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--lightest-slate);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const StyledSkillBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(2, 12, 27, 0.4);
  border: 1px solid rgba(100, 255, 218, 0.06);
  border-radius: 4px;
  padding: 6px 10px;
  transition: all 0.2s ease;
  cursor: default;

  @media (max-width: 480px) {
    padding: 5px 8px;
    gap: 6px;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.03);
    border-color: var(--green);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(100, 255, 218, 0.05);

    .icon-wrapper {
      color: var(--green);
      transform: scale(1.05);
    }

    .badge-name {
      color: var(--green);
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    color: var(--green);
    transition: all 0.2s ease;
    flex-shrink: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .badge-name {
    font-size: var(--fz-xxs);
    font-family: var(--font-mono);
    color: var(--slate);
    transition: all 0.2s ease;
    line-height: 1.2;
    white-space: nowrap;

    @media (max-width: 400px) {
      font-size: 10px;
    }

    @media (max-width: 350px) {
      white-space: normal;
      word-break: break-all;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

// Icon Components
const ReactIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
  </svg>
);

const VueIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="18 3 12 14 6 3" />
    <polyline points="14.5 3 12 7.5 9.5 3" />
  </svg>
);

const SvelteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M19 8.5c0-1.38-1.13-2.5-2.5-2.5H12L8 2.5C7.2 1.7 5.8 1.7 5 2.5s-.8 2.1 0 2.9l4 4.1H4.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5H9l4 4.1c.8.8 2.2.8 3 0s.8-2.1 0-2.9l-4-4.1h4.5c1.38 0 2.5-1.12 2.5-2.5z" />
  </svg>
);

const LaravelIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M18.5 4H10A1.5 1.5 0 0 0 8.5 5.5v9A1.5 1.5 0 0 0 10 16h8.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 18.5 4Z" />
    <path d="M8.5 7.5H4A1.5 1.5 0 0 0 2.5 9v9A1.5 1.5 0 0 0 4 19.5h8.5a1.5 1.5 0 0 0 1.5-1.5V16" />
  </svg>
);

const NodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const PythonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2c1.2 0 2.4.4 3.4 1.2A6 6 0 0 1 18 8v4h-6v2h8c.6 0 1.1.2 1.5.6.4.4.5.9.5 1.4A6 6 0 0 1 18 22c-1.2 0-2.4-.4-3.4-1.2A6 6 0 0 1 12 16v-4h6V8h-8c-.6 0-1.1-.2-1.5-.6C8.1 7 8 6.5 8 6a6 6 0 0 1 4-4z" />
  </svg>
);

const GoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const KotlinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M2 2h20L2 22V2z" />
    <path d="M2 12h10l10-10" />
  </svg>
);

const SwiftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 21c-3.5-3.5-7.5-6.5-10-11.5 2.5 1.5 5 2 7.5 1.5-2-1.5-3.5-4-4-6.5C8 7 10 9 11.5 11.5c-1-3-1.5-6.5-.5-9.5 1.5 3 3.5 5.5 6 7-1.5-4-.5-8.5 2-12-1 4.5.5 8.5 3.5 11.5-2-1-4.5-1.5-7-1.5 2.5 2.5 5.5 4.5 9 6-4-1-8-1-11.5.5.5.5 1 1 1.5 1.5z" />
  </svg>
);

const FastApiIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GraphQLIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="8.5" x2="22" y2="15.5" />
    <line x1="2" y1="15.5" x2="22" y2="8.5" />
  </svg>
);

const ReduxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const SassIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6a3 3 0 0 0-3 3c0 3 6 1.5 6 4.5a3 3 0 0 1-6 0" />
  </svg>
);

const TailwindIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 3c-1.2 0-2.4.6-3.2 1.7C7.2 6.6 6 9.4 6 12s1.2 5.4 2.8 7.3c.8 1.1 2 1.7 3.2 1.7 1.2 0 2.4-.6 3.2-1.7C16.8 17.4 18 14.6 18 12s-1.2-5.4-2.8-7.3c-.8-1.1-2-1.7-3.2-1.7z" />
  </svg>
);

const PostgresqlIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" />
  </svg>
);

const DynamodbIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="4" rx="1" />
    <rect x="2" y="11" width="20" height="4" rx="1" />
    <rect x="2" y="17" width="20" height="4" rx="1" />
  </svg>
);

const ElasticsearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AwsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M6 14.5a3 3 0 0 0 6 0V11a3 3 0 0 0-6 0v3.5z" />
    <path d="M12 13.5a3 3 0 0 0 6 0V11a3 3 0 0 0-6 0v2.5z" />
    <path d="M4 20h16" />
  </svg>
);

const DockerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M22 12.5a.5.5 0 0 1-.5.5H19a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1h2.5a.5.5 0 0 1 .5.5v4z" />
    <rect x="2" y="12" width="14" height="6" rx="1" />
    <rect x="6" y="8" width="3" height="3" rx="0.5" />
    <rect x="10" y="8" width="3" height="3" rx="0.5" />
  </svg>
);

const KubernetesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="12 2 22 6.5 22 17.5 12 22 2 17.5 2 6.5" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const TerraformIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const ArgoCdIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
    <path d="M12 12v10" />
  </svg>
);

const GithubActionsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CircleCiIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22" />
  </svg>
);

const DatadogIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const SentryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
  </svg>
);

const PlaywrightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const FigmaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 9h3.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5H12V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22 3.5 3.5 0 0 1 5 18.5z" />
  </svg>
);

const SlackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MobileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const MongoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 2c-.5 2.5-3.5 6-3.5 9.5s2 6.5 3.5 8.5c1.5-2 3.5-5 3.5-8.5S12.5 4.5 12 2z" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const TerminalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const GitIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
    <line x1="6" y1="9" x2="6" y2="15" />
  </svg>
);

const ServerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const SaasIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ScrapingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ApiIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CmsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const AgileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);


const getSkillIcon = iconName => {
  switch (iconName) {
    case 'react':
      return <ReactIcon />;
    case 'vue':
      return <VueIcon />;
    case 'svelte':
      return <SvelteIcon />;
    case 'laravel':
      return <LaravelIcon />;
    case 'node':
      return <NodeIcon />;
    case 'python':
      return <PythonIcon />;
    case 'go':
      return <GoIcon />;
    case 'kotlin':
      return <KotlinIcon />;
    case 'swift':
      return <SwiftIcon />;
    case 'fastapi':
      return <FastApiIcon />;
    case 'graphql':
      return <GraphQLIcon />;
    case 'redux':
      return <ReduxIcon />;
    case 'sass':
      return <SassIcon />;
    case 'tailwind':
      return <TailwindIcon />;
    case 'postgresql':
      return <PostgresqlIcon />;
    case 'dynamodb':
      return <DynamodbIcon />;
    case 'elasticsearch':
      return <ElasticsearchIcon />;
    case 'aws':
      return <AwsIcon />;
    case 'docker':
      return <DockerIcon />;
    case 'kubernetes':
      return <KubernetesIcon />;
    case 'terraform':
      return <TerraformIcon />;
    case 'argocd':
      return <ArgoCdIcon />;
    case 'githubactions':
      return <GithubActionsIcon />;
    case 'circleci':
      return <CircleCiIcon />;
    case 'datadog':
      return <DatadogIcon />;
    case 'sentry':
      return <SentryIcon />;
    case 'playwright':
      return <PlaywrightIcon />;
    case 'figma':
      return <FigmaIcon />;
    case 'slack':
      return <SlackIcon />;
    case 'git':
      return <GitIcon />;
    case 'github':
      return <GithubIcon />;
    case 'mobile':
      return <MobileIcon />;
    case 'database':
      return <DatabaseIcon />;
    case 'mongodb':
      return <MongoIcon />;
    case 'terminal':
      return <TerminalIcon />;
    case 'server':
      return <ServerIcon />;
    case 'saas':
      return <SaasIcon />;
    case 'scraping':
      return <ScrapingIcon />;
    case 'api':
      return <ApiIcon />;
    case 'wordpress':
      return <CmsIcon />;
    case 'agile':
      return <AgileIcon />;
    default:
      return null;
  }
};

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const categories = [
    {
      title: 'Back-end & APIs',
      skills: [
        { name: 'Golang', icon: 'go' },
        { name: 'Python', icon: 'python' },
        { name: 'Laravel & PHP', icon: 'laravel' },
        { name: 'Node.js & Express', icon: 'node' },
        { name: 'FastAPI', icon: 'fastapi' },
        { name: 'GraphQL', icon: 'graphql' },
        { name: 'Kotlin', icon: 'kotlin' },
      ],
    },
    {
      title: 'Front-end Development',
      skills: [
        { name: 'React & Next.js', icon: 'react' },
        { name: 'Vue.js', icon: 'vue' },
        { name: 'Svelte', icon: 'svelte' },
        { name: 'TypeScript', icon: 'terminal' },
        { name: 'Redux', icon: 'redux' },
        { name: 'Sass / SCSS', icon: 'sass' },
        { name: 'Tailwind CSS', icon: 'tailwind' },
        { name: 'HTML5 & CSS3', icon: 'react' },
      ],
    },
    {
      title: 'Mobile Development',
      skills: [
        { name: 'Swift', icon: 'swift' },
        { name: 'Kotlin', icon: 'kotlin' },
        { name: 'Flutter', icon: 'mobile' },
        { name: 'React Native & Expo', icon: 'mobile' },
        { name: 'Capacitor Apps', icon: 'mobile' },
      ],
    },
    {
      title: 'Databases & Storage',
      skills: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL', icon: 'database' },
        { name: 'DynamoDB', icon: 'dynamodb' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Elasticsearch', icon: 'elasticsearch' },
      ],
    },
    {
      title: 'DevOps & Cloud',
      skills: [
        { name: 'AWS', icon: 'aws' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Kubernetes', icon: 'kubernetes' },
        { name: 'Terraform', icon: 'terraform' },
        { name: 'Argo CD', icon: 'argocd' },
        { name: 'Nginx & Cloudflare', icon: 'server' },
        { name: 'Linux VPS Mgt.', icon: 'terminal' },
      ],
    },
    {
      title: 'CI/CD & Monitoring',
      skills: [
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'Circle CI', icon: 'circleci' },
        { name: 'DataDog', icon: 'datadog' },
        { name: 'Sentry', icon: 'sentry' },
        { name: 'Git & GitHub', icon: 'git' },
      ],
    },
    {
      title: 'Testing & Automation',
      skills: [
        { name: 'Playwright', icon: 'playwright' },
        { name: 'Web Scraping (Selenium)', icon: 'scraping' },
        { name: 'Postman API Testing', icon: 'api' },
        { name: 'Serial Comm & Sensors', icon: 'terminal' },
      ],
    },
    {
      title: 'Tools & Management',
      skills: [
        { name: 'Figma', icon: 'figma' },
        { name: 'Slack', icon: 'slack' },
        { name: 'Agile (Scrum / Notion)', icon: 'agile' },
        { name: 'ClickUp Management', icon: 'agile' },
        { name: 'WordPress & WooCommerce', icon: 'wordpress' },
        { name: 'Strapi CMS', icon: 'wordpress' },
      ],
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Salah, a versatile Full-Stack Engineer and Software Developer based in{' '}
              <strong>Casablanca, Morocco</strong>. I specialize in designing and scaling end-to-end
              digital systems, handling everything from secure database design and robust back-end
              APIs to polished frontend interfaces, mobile applications, and automated DevOps
              workflows.
            </p>

            <p>
              Over the course of my career, I have partnered with a diverse range of clients
              including fast-growing startups and established international enterprises both
              remotely and on-site. I build high-performance SaaS ecosystems, custom enterprise ERP
              platforms, secure mobile systems, and AI-driven automation pipelines tailored to solve
              complex business challenges.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Salah ElHint - Lead Full-Stack Engineer"
            />
          </div>
        </StyledPic>
      </div>

      <StyledSkillsTitle>Technologies & tools I work with:</StyledSkillsTitle>

      <StyledSkillsDashboard>
        {categories.map((category, i) => (
          <StyledCategoryPanel key={i}>
            <div className="panel-header">
              <div className="indicator"></div>
              <h4>{category.title}</h4>
            </div>
            <div className="skills-grid">
              {category.skills.map((skill, j) => (
                <StyledSkillBadge key={j}>
                  <div className="icon-wrapper">{getSkillIcon(skill.icon)}</div>
                  <span className="badge-name">{skill.name}</span>
                </StyledSkillBadge>
              ))}
            </div>
          </StyledCategoryPanel>
        ))}
      </StyledSkillsDashboard>
    </StyledAboutSection>
  );
};

export default About;
