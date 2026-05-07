import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { CSSTransition } from 'react-transition-group';

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 400px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 5px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .location {
    margin-bottom: 20px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    opacity: 0.75;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;

    .tech-tag {
      display: inline-block;
      padding: 3px 10px;
      border: 1px solid var(--green);
      border-radius: 3px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.5;
    }
  }
`;

const Jobs = () => {
  const jobsData = [
    {
      frontmatter: {
        title: 'Lead Developer (Acting CTO)',
        company: 'AlloClients',
        location: 'France · Remote',
        range: 'Oct 2025 – Present',
        url: 'https://allo-clients.com',
        tech: [
          'Laravel',
          'React.js',
          'MySQL',
          'Multi-tenant SaaS',
          'RBAC',
          'DevOps',
          'Cloud VPS',
          'Nginx',
          'Cloudflare',
        ],
      },
      html: `<ul>
        <li>Served as Lead Developer & Acting CTO, spearheading the complete design and development of the AlloClients technical ecosystem — an integrated platform connecting a high-traffic public booking directory with a SaaS management app for independent therapists.</li>
        <li><strong>Platforms:</strong> <a href="https://allo-therapeute.fr" target="_blank" rel="noreferrer">allo-therapeute.fr</a> · <a href="https://allo-clients.com" target="_blank" rel="noreferrer">allo-clients.com</a> · <a href="https://app.allo-clients.com" target="_blank" rel="noreferrer">app.allo-clients.com</a></li>
        <li><strong>Multi-tenant SaaS Architecture:</strong> Designed a system connecting the booking platform with the practitioner management dashboard, ensuring seamless data synchronization.</li>
        <li><strong>Full-Stack Development:</strong> Built the complete frontend (React.js) and backend (Laravel), engineering the core business logic for appointment handling and data management.</li>
        <li><strong>Automated Scheduling:</strong> Created an automated appointment scheduling system and optimized the overall data flow within the application.</li>
        <li><strong>DevOps & Cloud:</strong> Configured and optimized cloud infrastructure and deployment pipelines, managing Linux VPS servers, databases, Nginx, and Cloudflare security.</li>
        <li><strong>Data Analytics:</strong> Built a core analytics system to track platform usage, analyze user behavior, and drive data-informed product improvements.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Full Stack Developer',
        company: 'CyberScale',
        location: 'France · Remote',
        range: 'Mar 2025 – Present',
        url: 'https://cyber-scale.me',
        tech: ['Laravel', 'React.js', 'React Native', 'MySQL', 'REST API', 'DevOps', 'Cloud VPS'],
      },
      html: `<ul>
        <li>Acted as a core Full Stack Developer, taking complete ownership of multiple web, mobile, and SaaS applications from concept to deployment. Successfully delivered high-impact projects including <strong>Klaid</strong>, <strong>ZemExpress</strong>, <strong>Wifina</strong>, and <strong>Isovea</strong>.</li>
        <li><strong>Architecture & End-to-End Development:</strong> Architected scalable frontend and backend systems for multi-tenant SaaS, web, and mobile platforms. Orchestrated services, managed data pipelines, and built infrastructures designed for future growth.</li>
        <li><strong>Database & Analytics:</strong> Engineered highly efficient database structures and optimized complex queries. Built comprehensive tracking systems to analyze user behavior and drive data-informed improvements.</li>
        <li><strong>Client Management & Product Ownership:</strong> Held full technical responsibility across the project lifecycle. Conducted direct client consultations to translate business requirements into actionable digital solutions.</li>
        <li><strong>Mobile Engineering & APIs:</strong> Built and integrated robust backend APIs with mobile applications, ensuring seamless, real-time data flow across interconnected platforms.</li>
        <li><strong>DevOps & Cloud Deployment:</strong> Managed the complete deployment lifecycle — configured server infrastructures for absolute security, high availability, and continuous scalability.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Senior Full-Stack Engineer & System Architect',
        company: 'Numa',
        location: 'Remote · Freelance',
        range: 'Sep 2024 – Feb 2025',
        url: '#',
        tech: [
          'Laravel',
          'React.js',
          'MySQL (140+ Tables)',
          'Redux',
          'Cloud VPS',
          'RBAC',
          'RESTful API',
        ],
      },
      html: `<ul>
        <li>Designed, architected, and single-handedly developed <strong>Numa ERP</strong> — a massive, highly competitive SaaS ERP platform tailored for enterprise management. Took absolute ownership of the entire product lifecycle from UI/UX to deployment.</li>
        <li><strong>Massive Database Architecture:</strong> Designed a complex, scalable database with <strong>over 140 tables</strong> to support intricate business logic and robust multi-tenant SaaS capabilities.</li>
        <li><strong>End-to-End UI/UX & Frontend:</strong> Designed every screen and user flow. Built a dynamic, responsive frontend using React.js, ensuring lightning-fast navigation for enterprise operations.</li>
        <li><strong>High-Performance Backend:</strong> Programmed a secure API and backend using Laravel, engineered to handle heavy data processing and complex relational queries.</li>
        <li><strong>Enterprise Modules:</strong> Finance & Operations (Sales, Purchases, Treasury), Advanced Stock Control with multi-warehouse support, CRM & Pipeline, and a complete HR suite (attendance, payroll, expenses).</li>
        <li><strong>Admin, Security & Analytics:</strong> Developed a granular Role-Based Access Control (RBAC) system, dynamic dashboards with deep analytics, and customizable document styling.</li>
        <li><strong>DevOps & Deployment:</strong> Managed the full deployment pipeline on Cloud VPS, optimizing server architecture for high availability and continuous scalability.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Frontend Web Developer',
        company: 'Archipel Digital',
        location: 'Casablanca, Morocco · On-site',
        range: 'Jan 2024 – Aug 2024',
        url: 'https://archipel.group',
        tech: [
          'Angular',
          'Vue.js',
          'Tailwind CSS',
          'Strapi CMS',
          'TypeScript',
          'SCSS',
          'Bootstrap',
          'REST API',
        ],
      },
      html: `<ul>
        <li>Developed dynamic frontends using <strong>Angular</strong> and <strong>Vue.js</strong>, ensuring robust performance and seamless user experience across multiple client platforms.</li>
        <li>Integrated REST APIs and managed data flow between frontend and backend, optimizing system architecture for scalability and efficiency.</li>
        <li>Worked with <strong>Strapi</strong> headless CMS to build and integrate content management systems with the frontend, ensuring smooth API communication and data handling.</li>
        <li>Converted designs from PSD, XD, and <strong>Figma</strong> into pixel-perfect, fully responsive code adhering to modern web standards.</li>
        <li>Leveraged <strong>Tailwind CSS</strong> and Bootstrap to accelerate development while maintaining design consistency and responsiveness across platforms.</li>
        <li>Wrote efficient, maintainable styles using <strong>SCSS</strong>, fixing UI bugs in Angular projects and implementing best practices for web performance, accessibility, and SEO.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Web Developer',
        company: 'InfiniPrint',
        location: 'Casablanca, Morocco · On-site',
        range: 'Feb 2024 – Mar 2024',
        url: 'https://infiniprint.ma',
        tech: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'Custom Plugins'],
      },
      html: `<ul>
        <li>Developed and enhanced the company's web presence for a digital printing business using <strong>WordPress</strong> and <strong>WooCommerce</strong>.</li>
        <li>Set up and managed products, custom themes, and plugins to ensure the seamless functioning of the e-commerce platform.</li>
        <li>Created, customized, and managed website content including product pages and category structures.</li>
        <li>Collaborated with cross-functional teams to deliver high-quality web solutions aligned with business requirements.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Mobile Application Developer',
        company: 'Origin Control',
        location: 'Canada · Remote',
        range: 'Dec 2023 – Jan 2024',
        url: '#',
        tech: ['React Native', 'Expo', 'API Integration', 'WebSocket', 'Server Communication'],
      },
      html: `<ul>
        <li>Designed and developed an innovative <strong>mobile application using React Native Expo</strong> enabling seamless real-time connectivity with industrial machines.</li>
        <li>Implemented features that allow users to display, monitor, and control machines through a dedicated server, ensuring efficient and effective management.</li>
        <li>Built a robust client-server communication layer for real-time data flow between the mobile app and the connected infrastructure.</li>
        <li>Integrated complex control functionalities ensuring a smooth user experience while maintaining precise, reliable control over connected machines.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Data Specialist',
        company: 'FPM · IDEMIA',
        location: 'Casablanca, Morocco · On-site',
        range: 'Oct 2023 – Dec 2023',
        url: 'https://idemia.com',
        tech: ['Python', 'Selenium', 'BeautifulSoup', 'Data Pipelines', 'Data Processing'],
      },
      html: `<ul>
        <li>Executed automated <strong>web scraping</strong> operations across diverse sources using Python and Selenium to efficiently extract, structure, and deliver actionable information.</li>
        <li>Managed and refined complex datasets, enforcing strict standards of data accuracy, integrity, and reliability across internal systems.</li>
        <li>Optimized core data management workflows by systematically processing and manipulating raw data to drive overall operational efficiency.</li>
        <li>Built and maintained data pipelines to automate the collection and transformation of large-scale structured and unstructured data.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Development Intern',
        company: 'Origin Control',
        location: 'Quebec, Canada · Remote',
        range: 'Apr 2023 – May 2023',
        url: '#',
        tech: ['Python', 'wxPython', 'Desktop App', 'Data Acquisition', 'Hardware Sensors'],
      },
      html: `<ul>
        <li>Designed and developed a robust <strong>desktop application for real-time data acquisition</strong> utilizing Python and the wxPython framework.</li>
        <li>Engineered an efficient data processing pipeline to systematically collect, parse, and visualize live data streams from various hardware sensors.</li>
        <li>Collaborated with the core engineering team to design intuitive user interfaces, optimize software architecture, and streamline complex data handling workflows.</li>
      </ul>`,
    },
  ];

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I've Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map((job, i) => {
              const { company } = job.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map((job, i) => {
              const { frontmatter, html } = job;
              const { title, url, company, range, location, tech } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>
                    <p className="location">📍 {location}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    {tech && tech.length > 0 && (
                      <div className="tech-stack">
                        {tech.map((t, j) => (
                          <span key={j} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
