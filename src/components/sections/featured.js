import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { trackEvent } from '@services/analytics';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (max-width: 768px) {
    gap: 50px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--light-navy);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  border: 1px solid rgba(100, 255, 218, 0.05);
  transition: var(--transition);

  &:hover {
    border-color: rgba(100, 255, 218, 0.2);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  @media (max-width: 768px) {
    padding: 25px;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
  }

  .project-title-area {
    display: flex;
    flex-direction: column;
  }

  .project-overline {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;

    .overline-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 4px;
      background-color: rgba(100, 255, 218, 0.1);
      border: 1px solid var(--green);
      color: var(--green);
      font-size: var(--fz-xxs);
      white-space: nowrap;
    }

    .award-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 4px;
      background-color: rgba(255, 215, 0, 0.1);
      border: 1px solid gold;
      color: gold;
      font-size: var(--fz-xxs);
      white-space: nowrap;
    }
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    margin: 0;
    font-weight: 700;

    a {
      color: inherit;
      text-decoration: none;
      transition: var(--transition);
      &:hover {
        color: var(--green);
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: left;

    p {
      margin: 0;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: 600;
    }
  }

  .project-custom-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    .custom-link {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--green);
      background-color: rgba(100, 255, 218, 0.05);
      border: 1px solid rgba(100, 255, 218, 0.2);
      padding: 6px 12px;
      border-radius: 4px;
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        background-color: rgba(100, 255, 218, 0.15);
        border-color: var(--green);
        transform: translateY(-2px);
      }
    }
  }

  .project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 25px;
    border-top: 1px solid rgba(100, 255, 218, 0.05);
    padding-top: 20px;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 15px;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      white-space: nowrap;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 6px;
      border-radius: 4px;
      transition: var(--transition);
      background-color: transparent;

      &:hover {
        color: var(--green);
        background-color: rgba(100, 255, 218, 0.1);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledGalleryContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .main-display {
    position: relative;
    width: 100%;
    height: 520px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #0b192f;
    border: 1px solid rgba(100, 255, 218, 0.08);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--green);
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(100, 255, 218, 0.08);

      .nav-button {
        opacity: 1;
      }

      .zoom-overlay {
        opacity: 1;
        svg {
          transform: scale(1.1);
        }
      }
    }

    @media (max-width: 768px) {
      height: 380px;
    }

    @media (max-width: 480px) {
      height: 260px;
    }

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background-color: #0b192f;
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(10, 25, 47, 0.85);
    border: 1px solid var(--green);
    color: var(--green);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease, background-color 0.3s ease;

    &:hover {
      background: var(--green);
      color: var(--navy);
    }

    &.prev {
      left: 15px;
    }

    &.next {
      right: 15px;
    }

    svg {
      width: 18px;
      height: 18px;
      stroke-width: 2.5;
    }
  }

  .zoom-overlay {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: rgba(10, 25, 47, 0.85);
    border: 1px solid rgba(100, 255, 218, 0.3);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 5;

    svg {
      width: 20px;
      height: 20px;
      color: var(--green);
      transition: transform 0.3s ease;
    }
  }

  .thumbnails-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 5px;
  }

  .thumbnail-item {
    width: 60px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(100, 255, 218, 0.2);
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.25s ease;
    background-color: #0b192f;

    &.active {
      opacity: 1;
      border-color: var(--green);
      box-shadow: 0 0 8px rgba(100, 255, 218, 0.4);
      transform: scale(1.05);
    }

    &:hover {
      opacity: 0.8;
    }

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const StyledLightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }

  .lightbox-content {
    position: relative;
    max-width: 92vw;
    max-height: 88vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    background-color: #0b192f;
    border: 1px solid rgba(100, 255, 218, 0.2);

    img,
    video {
      max-width: 92vw;
      max-height: 88vh;
      object-fit: contain;
      display: block;
    }
  }

  .close-button {
    position: absolute;
    top: 25px;
    right: 25px;
    background: transparent;
    border: none;
    color: var(--lightest-slate);
    font-size: 36px;
    cursor: pointer;
    transition: var(--transition);
    z-index: 10000;

    &:hover {
      color: var(--green);
      transform: scale(1.1);
    }
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(10, 25, 47, 0.85);
    border: 1px solid var(--green);
    color: var(--green);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    transition: var(--transition);

    &:hover {
      background: var(--green);
      color: var(--navy);
    }

    &.prev {
      left: 30px;
    }

    &.next {
      right: 30px;
    }

    svg {
      width: 22px;
      height: 22px;
      stroke-width: 2.5;
    }

    @media (max-width: 768px) {
      width: 38px;
      height: 38px;
      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }
    }
  }
`;

const ProjectMediaGallery = ({ media, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Autoplay functionality - cycles if not in lightbox and current media is not a video
  useEffect(() => {
    if (media.length <= 1 || lightboxIndex !== null) {
      return;
    }

    // If the currently active media is a video, do not auto-advance
    if (media[activeIndex] && media[activeIndex].type === 'video') {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % media.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [media, activeIndex, lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev + 1) % media.length);
        setActiveIndex(prev => (prev + 1) % media.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev - 1 + media.length) % media.length);
        setActiveIndex(prev => (prev - 1 + media.length) % media.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, media.length]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const handleNext = e => {
    e.stopPropagation();
    setActiveIndex(prev => (prev + 1) % media.length);
  };

  const handlePrev = e => {
    e.stopPropagation();
    setActiveIndex(prev => (prev - 1 + media.length) % media.length);
  };

  const openLightbox = e => {
    e.stopPropagation();
    setLightboxIndex(activeIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = e => {
    e.stopPropagation();
    setLightboxIndex(prev => {
      const nextIdx = (prev + 1) % media.length;
      setActiveIndex(nextIdx);
      return nextIdx;
    });
  };

  const prevLightbox = e => {
    e.stopPropagation();
    setLightboxIndex(prev => {
      const prevIdx = (prev - 1 + media.length) % media.length;
      setActiveIndex(prevIdx);
      return prevIdx;
    });
  };

  const activeMedia = media[activeIndex];

  return (
    <>
      <StyledGalleryContainer>
        <div
          className="main-display"
          onClick={openLightbox}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              openLightbox(e);
            }
          }}
          role="button"
          tabIndex={0}>
          {activeMedia.type === 'image' ? (
            <img src={activeMedia.src} alt={`${title} screenshot`} />
          ) : (
            <video key={activeIndex} src={activeMedia.src} muted playsInline autoPlay loop />
          )}

          {media.length > 1 && (
            <>
              <button className="nav-button prev" onClick={handlePrev} aria-label="Previous item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="nav-button next" onClick={handleNext} aria-label="Next item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="zoom-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </div>
        </div>

        {media.length > 1 && (
          <div className="thumbnails-row">
            {media.map((item, idx) => (
              <div
                key={idx}
                className={`thumbnail-item ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}>
                {item.type === 'image' ? (
                  <img src={item.src} alt={`${title} thumb ${idx + 1}`} />
                ) : (
                  <video src={item.src} muted playsInline />
                )}
              </div>
            ))}
          </div>
        )}
      </StyledGalleryContainer>
      {lightboxIndex !== null && (
        <StyledLightbox
          className="active"
          onClick={closeLightbox}
          onKeyDown={e => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              closeLightbox();
            }
          }}
          role="button"
          tabIndex={0}>
          <button className="close-button" onClick={closeLightbox} aria-label="Close zoom window">
            &times;
          </button>

          {media.length > 1 && (
            <>
              <button
                className="lightbox-nav prev"
                onClick={prevLightbox}
                aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="lightbox-nav next" onClick={nextLightbox} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {media[lightboxIndex].type === 'image' ? (
              <img src={media[lightboxIndex].src} alt={`${title} zoomed ${lightboxIndex + 1}`} />
            ) : (
              <video src={media[lightboxIndex].src} muted playsInline autoPlay loop controls />
            )}
          </div>
        </StyledLightbox>
      )}
    </>
  );
};

ProjectMediaGallery.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['image', 'video']).isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

const PROJECTS_DATA = [
  {
    title: 'AlloClients SaaS Ecosystem',
    overline: 'Featured Project',
    badge: 'Acting CTO · France',
    description: `<strong>Problem:</strong> Independent therapists in France lacked a unified digital workspace, forcing them to manually coordinate client bookings, marketing websites, and scheduling workflows.<br/><br/>
    <strong>Solution:</strong> Architected and built as sole developer and acting CTO a complete ecosystem of <strong>3 live, interconnected platforms</strong>: a public SEO-optimized booking directory (<a href="https://allo-therapeute.fr" target="_blank" rel="noreferrer">allo-therapeute.fr</a>), a marketing site, and a full-featured SaaS management app (<a href="https://app.allo-clients.com" target="_blank" rel="noreferrer">app.allo-clients.com</a>). Features include automated scheduling, multi-tenant RBAC, real-time data sync, and a behavioral analytics layer.`,
    tech: [
      'Laravel',
      'React.js',
      'MySQL',
      'Multi-tenant SaaS',
      'DevOps (VPS)',
      'Nginx',
      'Cloudflare',
      'RESTful API',
    ],
    external: 'https://allo-clients.com',
    github: '',
    links: [
      { label: 'Public Directory', url: 'https://allo-therapeute.fr' },
      { label: 'SaaS App', url: 'https://app.allo-clients.com' },
      { label: 'Marketing Platform', url: 'https://allo-clients.com' },
    ],
    media: [
      { type: 'video', src: '/jobs/AlloClients/systemx.mp4' },
      { type: 'video', src: '/jobs/AlloClients/allo therapitre.mp4' },
      { type: 'video', src: '/jobs/AlloClients/allo clients.mp4' },
      { type: 'image', src: '/jobs/AlloClients/AlloClients.jpg' },
    ],
  },
  {
    title: 'ZemExpress Logistics & Mobile Platform',
    overline: 'Featured Project',
    badge: 'Lead Developer · CyberScale',
    description: `<strong>Problem:</strong> Logistics networks and drivers suffer from delayed notification alerts, lack of real-time mapping details, and system restrictions that suppress critical dispatcher alerts on locked devices.<br/><br/>
    <strong>Solution:</strong> Built a high-performance logistics and ride-hailing system. Developed a robust React Native (Expo) mobile driver app integrated with a custom Laravel REST API. Engineered custom background ride notifications and alarms bypassing OS limits, paired with Google Maps turn-by-turn routing to streamline driver pick-ups.`,
    tech: [
      'Laravel',
      'React.js',
      'React Native (Expo)',
      'MySQL',
      'Capacitor',
      'RESTful API',
      'Google Maps API',
      'DevOps',
    ],
    external: 'https://play.google.com/store/apps/details?id=com.zemexpress.app',
    github: '',
    links: [
      {
        label: 'Google Play Store',
        url: 'https://play.google.com/store/apps/details?id=com.zemexpress.app',
      },
      { label: 'Case Study', url: 'https://cyber-scale.me/etudes-de-cas' },
    ],
    media: [
      { type: 'image', src: '/jobs/ZemExpress/zemexpress.jpg' },
      { type: 'image', src: '/jobs/ZemExpress/playstore.png' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress1.webp' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress2.webp' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress3.webp' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress4.webp' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress5.webp' },
      { type: 'image', src: '/jobs/ZemExpress/zemexpress6.webp' },
    ],
  },
  {
    title: 'Numa ERP SaaS Platform',
    overline: 'Featured Project',
    badge: 'Solo Architect · Freelance',
    description: `<strong>Problem:</strong> Growing enterprises outgrow rigid, off-the-shelf management tools and require customized, integrated workflows for multi-warehouse stocks, payroll, and invoicing that scale seamlessly.<br/><br/>
    <strong>Solution:</strong> Single-handedly designed and built a <strong>full-scale enterprise SaaS ERP</strong> from the first whiteboard sketch to production. The system spans <strong>140+ database tables</strong> and includes modules for Finance & Treasury, Multi-warehouse Inventory, CRM & Sales Pipeline, HR & Payroll, and granular Role-Based Access Control.`,
    tech: [
      'React.js',
      'Laravel',
      'MySQL · 140+ Tables',
      'Redux',
      'Cloud VPS',
      'RBAC',
      'RESTful API',
    ],
    external: 'https://demo.numa.ma/',
    github: '',
    media: [
      { type: 'video', src: '/jobs/Numa/numa.mp4' },
      { type: 'image', src: '/jobs/Numa/numa.jpg' },
    ],
  },
  {
    title: 'Wifina Connectivity Service',
    overline: 'Featured Project',
    badge: 'Full Stack Developer · CyberScale',
    description: `<strong>Problem:</strong> Hospitality venues and public places find it difficult to securely authenticate guests, manage session bandwidth, and track analytics on public networks.<br/><br/>
    <strong>Solution:</strong> Developed Wifina, a secure connectivity and hotspot service. Built responsive control portals and administrator dashboards to monitor network load, track user connection history, regulate session limits, and analyze real-time usage metrics.`,
    tech: ['Laravel', 'React.js', 'MySQL', 'RESTful API', 'DevOps', 'Nginx'],
    external: 'https://wifina.be',
    github: '',
    links: [
      { label: 'Live Platform', url: 'https://wifina.be' },
      { label: 'Case Study', url: 'https://cyber-scale.me/etudes-de-cas' },
    ],
    media: [
      { type: 'video', src: '/jobs/Wifina/wifina2.mp4' },
      { type: 'image', src: '/jobs/Wifina/wifina.jpg' },
    ],
  },
  {
    title: 'GetProcure Tender Management Platform',
    overline: 'Featured Project',
    badge: 'Lead Developer',
    description: `<strong>Problem:</strong> Businesses lose hundreds of bidding opportunities because government and corporate procurement contracts (tenders) are scattered across countless separate portals globally.<br/><br/>
    <strong>Solution:</strong> Engineered a centralized procurement discovery and tender management platform. Developed custom Python scraping crawlers to aggregate international bids, adding a smart matching engine, personalized search alerts, and interactive analytics dashboards.`,
    tech: ['React', 'Laravel', 'Python', 'Scrapy', 'MySQL', 'Redux', 'REST API', 'Tailwind CSS'],
    external: '',
    github: '',
    media: [
      { type: 'image', src: '/jobs/GetProcure/GetProcure1.png' },
      { type: 'image', src: '/jobs/GetProcure/GetProcure2.png' },
      { type: 'image', src: '/jobs/GetProcure/GetProcure3.png' },
      { type: 'image', src: '/jobs/GetProcure/GetProcure4.png' },
      { type: 'image', src: '/jobs/GetProcure/GetProcure5.png' },
    ],
  },
  {
    title: 'MoroccoAI Tender Scraping & NLP Pipeline',
    overline: 'Featured Project',
    badge: '1st Prize MoroccoAI Hackathon 2022',
    description: `<strong>Problem:</strong> African public call-for-tender opportunities are unstructured, published across fragmented national web portals, and lack standardized search capability.<br/><br/>
    <strong>Solution:</strong> Awarded <strong>1st Prize in the MoroccoAI challenge</strong>. Engineered an automated pipeline using Python and Selenium to scrape contracts, using Natural Language Processing (NLP) to extract key contract fields and classify bidding categories.`,
    tech: ['Python', 'NLP', 'Selenium', 'Data Science', 'Machine Learning', 'Data Visualization'],
    external: 'https://morocco.ai/events/conferences/MoroccoAI-Conference-2022',
    github: 'https://github.com/SALAH-ELHINT/morocco-ai-challenge',
    media: [{ type: 'image', src: '/jobs/MoroccoAI/MoroccoAI.jpg' }],
  },
  {
    title: 'OHM - INRH Portal',
    overline: 'Featured Project',
    badge: 'Frontend Web Developer · Archipel Digital',
    description: `<strong>Problem:</strong> Public scientific institutions like Morocco's National Marine Research Institute (INRH) require secure, high-performance web portals that internal staff can easily edit without coding knowledge.<br/><br/>
    <strong>Solution:</strong> Led frontend engineering using Angular and SCSS to construct a pixel-perfect, accessible web portal. Seamlessly integrated the application with a Strapi headless CMS, enabling staff to manage research publications and content blocks independently.`,
    tech: ['Angular', 'TypeScript', 'Strapi CMS', 'Bootstrap', 'SCSS', 'RESTful API'],
    external: 'https://ohm.ma/',
    github: '',
    media: [{ type: 'video', src: '/jobs/OHM/ohm.mp4' }],
  },
  {
    title: 'MinutePrint E-commerce & Automation Platform',
    overline: 'Featured Project',
    badge: 'Web Developer',
    description: `<strong>Problem:</strong> Local printing businesses lose hours manually checking print layouts, calculating custom dimensions, and matching catalog prices with external suppliers.<br/><br/>
    <strong>Solution:</strong> Built an automated e-commerce web platform. Combined a WooCommerce storefront with a Laravel dashboard and custom Python background scripts to automate supplier pricing updates, sync inventory levels, and handle custom printing workflows.`,
    tech: [
      'WordPress',
      'WooCommerce',
      'Laravel',
      'MySQL',
      'Web Scraping',
      'Python',
      'REST API',
      'Node.js',
    ],
    external: 'https://minuteprint.ma',
    github: '',
    media: [{ type: 'video', src: '/jobs/InfiniPrint/infinitiprint.mp4' }],
  },
];

const Featured = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I've Built
      </h2>

      <StyledProjectsGrid>
        {PROJECTS_DATA.map((project, i) => (
          <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
            <div className="project-header">
              <div className="project-title-area">
                <div className="project-overline">
                  <span>{project.overline}</span>
                  {project.badge && (
                    <span
                      className={
                        project.badge.includes('1st Prize') || project.badge.includes('Hackathon')
                          ? 'award-badge'
                          : 'overline-badge'
                      }>
                      {project.badge}
                    </span>
                  )}
                </div>
                <h3 className="project-title">
                  {project.external || project.github ? (
                    <a
                      href={project.external || project.github}
                      onClick={() =>
                        trackEvent('project_card_click', {
                          title: project.title,
                          position: 'featured_title',
                        })
                      }
                      target="_blank"
                      rel="noreferrer">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
              </div>
            </div>

            <div
              className="project-description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

            {project.links && project.links.length > 0 && (
              <div className="project-custom-links">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    onClick={() => {
                      trackEvent('project_card_click', {
                        title: project.title,
                        position: 'featured_custom_link',
                        label: link.label,
                      });
                      trackEvent('external_link_click', {
                        url: link.url,
                        title: project.title,
                        label: link.label,
                      });
                    }}
                    target="_blank"
                    rel="noreferrer"
                    className="custom-link">
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <ProjectMediaGallery media={project.media} title={project.title} />

            <div className="project-footer">
              {project.tech && project.tech.length > 0 && (
                <ul className="project-tech-list">
                  {project.tech.map((techName, idx) => (
                    <li key={idx}>{techName}</li>
                  ))}
                </ul>
              )}

              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    onClick={() =>
                      trackEvent('github_click', {
                        url: project.github,
                        title: project.title,
                        source: 'featured_footer',
                      })
                    }
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noreferrer">
                    <Icon name="GitHub" />
                  </a>
                )}
                {project.external && (
                  <a
                    href={project.external}
                    onClick={() => {
                      trackEvent('cta_click', {
                        name: 'project_external_view',
                        title: project.title,
                        url: project.external,
                      });
                      trackEvent('external_link_click', {
                        url: project.external,
                        title: project.title,
                        source: 'featured_footer',
                      });
                    }}
                    aria-label="External Link"
                    className="external"
                    target="_blank"
                    rel="noreferrer">
                    <Icon name="External" />
                  </a>
                )}
              </div>
            </div>
          </StyledProject>
        ))}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
