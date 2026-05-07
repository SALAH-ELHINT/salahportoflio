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
    'React Native (Expo) / Capacitor / Flutter',
    'MySQL / PostgreSQL / MongoDB',
    'Multi-tenant SaaS & RBAC Architecture',
    'DevOps: Linux VPS / Nginx / CI/CD',
    'Cloudflare / Server Management',
    'REST API Design & Integration',
    'Web Scraping & Data Pipelines',
    'PostHog / Data Analytics',
    'Git / GitHub / Bitbucket / Postman',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Salah, a Lead Full-Stack Engineer & System Architect based in Casablanca,
              Morocco. I take absolute end-to-end ownership of complex SaaS platforms, enterprise
              web systems, and mobile applications — from the first concept to final cloud
              deployment. My core focus is engineering highly scalable, high-performance digital
              ecosystems that drive real business growth.
            </p>

            <p>
              Currently pursuing my{' '}
              <strong>Master's in Software Engineering & Distributed Systems</strong> at Hassan II
              University, I have a proven track record of single-handedly architecting massive
              platforms — including a multi-tenant SaaS ecosystem for therapists (
              <a href="https://allo-clients.com" target="_blank" rel="noreferrer">
                AlloClients
              </a>
              ) and a full enterprise ERP with 140+ database tables (
              <a href="https://demo.numa.ma/" target="_blank" rel="noreferrer">
                Numa ERP
              </a>
              ). I have delivered successful projects for clients in France, Canada, and Morocco.
            </p>

            <p>
              I am also a <strong>1st Prize winner at the MoroccoAI Hackathon 2022</strong>, where I
              built an NLP-powered platform to scrape and analyze African government procurement
              tenders. I speak fluent English, French, Arabic, and Berber — making global
              collaboration seamless.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
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
