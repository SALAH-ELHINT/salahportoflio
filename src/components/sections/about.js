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

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
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

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'React.js / Next.js / Vue.js / Angular',
    'Laravel / PHP / Node.js',
    'Python / Django / Selenium',
    'React Native (Expo) / Flutter',
    'MySQL / PostgreSQL / MongoDB',
    'Multi-tenant SaaS & RBAC',
    'Linux VPS / Nginx / CI/CD',
    'REST API Design & Integration',
    'Web Scraping & Data Pipelines',
    'Cloudflare / PostHog / Analytics',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I'm Salah a Lead Full-Stack Engineer & System Architect based in{' '}
              <strong>Casablanca, Morocco</strong>. I build and own entire products:{' '}
              database design, backend APIs, frontend UIs, mobile apps, and cloud infrastructure
              all under one roof.
            </p>

            <p>
              My biggest projects to date:{' '}
              <strong>
                <a href="https://allo-clients.com" target="_blank" rel="noreferrer">
                  AlloClients
                </a>
              </strong>{' '}
              a live multi-tenant SaaS ecosystem with 3 interconnected platforms (acting as CTO), and{' '}
              <strong>
                <a href="https://demo.numa.ma/" target="_blank" rel="noreferrer">
                  Numa ERP
                </a>
              </strong>{' '}
              a fully solo-built enterprise ERP with <strong>140+ database tables</strong>,
              covering Finance, CRM, HR, Inventory, and RBAC. Delivered for clients in{' '}
              <strong>France, Canada & Morocco</strong>.
            </p>

            <p>
              <strong>1st Prize MoroccoAI Hackathon 2022</strong> for building an
              NLP-powered pipeline to scrape and analyze African government procurement data.
              Currently completing a <strong>Master's in Software Engineering & Distributed
              Systems</strong> at Hassan II University.
            </p>

            <p>Technologies I work with daily:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Salah El Hint - Lead Full-Stack Engineer"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
