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
    case 'laravel':
      return <LaravelIcon />;
    case 'node':
      return <NodeIcon />;
    case 'python':
      return <PythonIcon />;
    case 'mobile':
      return <MobileIcon />;
    case 'database':
      return <DatabaseIcon />;
    case 'mongodb':
      return <MongoIcon />;
    case 'terminal':
      return <TerminalIcon />;
    case 'git':
      return <GitIcon />;
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
      title: 'Back-end',
      skills: [
        { name: 'Laravel & PHP', icon: 'laravel' },
        { name: 'Node.js & Express', icon: 'node' },
        { name: 'Python & Django', icon: 'python' },
        { name: 'wxPython Desktop Apps', icon: 'python' },
      ],
    },
    {
      title: 'Front-end',
      skills: [
        { name: 'React.js & Next.js', icon: 'react' },
        { name: 'Vue.js & Angular', icon: 'vue' },
        { name: 'TypeScript & SCSS', icon: 'terminal' },
        { name: 'Tailwind CSS & CSS', icon: 'react' },
        { name: 'Bootstrap & Redux', icon: 'react' },
      ],
    },
    {
      title: 'Mobile',
      skills: [
        { name: 'React Native & Expo', icon: 'mobile' },
        { name: 'Flutter', icon: 'mobile' },
        { name: 'Capacitor Apps', icon: 'mobile' },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MySQL & PostgreSQL', icon: 'database' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Database Architecture', icon: 'database' },
      ],
    },
    {
      title: 'Devops and cloud',
      skills: [
        { name: 'Linux VPS & Server Mgt.', icon: 'terminal' },
        { name: 'Nginx & Cloudflare', icon: 'server' },
        { name: 'CI/CD & Git Deploy', icon: 'git' },
      ],
    },
    {
      title: 'Architecture',
      skills: [
        { name: 'Multi-tenant SaaS & RBAC', icon: 'saas' },
        { name: 'Microservices & APIs', icon: 'api' },
        { name: 'WebSockets & Real-time', icon: 'api' },
      ],
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git, GitHub & Bitbucket', icon: 'git' },
        { name: 'Postman API Testing', icon: 'api' },
        { name: 'Agile (Scrum / Notion)', icon: 'agile' },
        { name: 'ClickUp Management', icon: 'agile' },
      ],
    },
    {
      title: 'Other',
      skills: [
        { name: 'Scraping (Selenium / BS4)', icon: 'scraping' },
        { name: 'Data Analysis & PostHog', icon: 'scraping' },
        { name: 'WordPress & WooCommerce', icon: 'wordpress' },
        { name: 'Strapi CMS', icon: 'wordpress' },
        { name: 'Serial Comm & Sensors', icon: 'terminal' },
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

      <StyledSkillsTitle>Technologies I work with daily:</StyledSkillsTitle>

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
