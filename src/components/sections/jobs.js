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
        tech: ['Laravel', 'React.js', 'MySQL', 'Multi-tenant SaaS', 'RBAC', 'DevOps', 'Cloud VPS', 'Nginx', 'Cloudflare'],
      },
      html: `<ul>
        <li><strong>Architected 3 live, interconnected platforms</strong> from zero: a public booking directory (<a href="https://allo-therapeute.fr" target="_blank" rel="noreferrer">allo-therapeute.fr</a>), a marketing site, and a full SaaS management app (<a href="https://app.allo-clients.com" target="_blank" rel="noreferrer">app.allo-clients.com</a>) serving independent therapists across France.</li>
        <li><strong>Sole technical decision-maker</strong> (acting CTO) responsible for system architecture, API design, database schema, UX, and cloud infrastructure.</li>
        <li>Built a <strong>multi-tenant RBAC scheduling system</strong> that automates appointment management and syncs data in real time across all 3 platforms.</li>
        <li>Deployed and secured the full stack on <strong>Linux VPS with Nginx & Cloudflare</strong> zero-downtime rollouts, hardened security, scalable infrastructure.</li>
        <li>Integrated a <strong>behavioral analytics layer</strong> to track user journeys and drive data-informed product iterations.</li>
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
        <li><strong>Shipped 4 client products to production</strong>: Klaid, ZemExpress, Wifina, and Isovea each delivered from specs to live deployment.</li>
        <li>Owned the <strong>entire technical lifecycle</strong> per project: architecture, full-stack development, API design, mobile integration, and cloud deployment.</li>
        <li>Served as the <strong>direct technical contact for clients</strong> translating business requirements into clean, scalable implementations without middle layers.</li>
        <li>Built and integrated <strong>React Native mobile apps</strong> with Laravel backends, ensuring real-time data flow and cross-platform stability.</li>
        <li>Configured <strong>production-grade VPS environments</strong> with security hardening, performance optimization, and continuous availability for each project.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Senior Full-Stack Engineer & System Architect',
        company: 'Numa',
        location: 'Remote · Freelance',
        range: 'Sep 2024 – Feb 2025',
        url: 'https://demo.numa.ma/',
        tech: ['Laravel', 'React.js', 'MySQL (140+ Tables)', 'Redux', 'Cloud VPS', 'RBAC', 'RESTful API'],
      },
      html: `<ul>
        <li><strong>Solo-built a full enterprise SaaS ERP</strong> every module, every table, evy line of code. No team. No shortcuts.</li>
        <li>Designed a <strong>140+ table relational database</strong> to model complex, interdependent business logic across multiple enterprise domains.</li>
        <li>Built a complete suite of enterprise modules: <strong>Finance & Treasury</strong> (sales, purchases, checks), <strong>Multi-warehouse Inventory</strong>, <strong>CRM & Pipeline</strong>, and a full <strong>HR suite</strong> (attendance, payroll, expenses).</li>
        <li>Implemented <strong>granular Role-Based Access Control (RBAC)</strong> with dynamic permission management ensuring data isolation between tenants and user roles.</li>
        <li>Delivered a <strong>real-time analytics dashboard</strong> and customizable document engine (invoices, quotes, purchase orders) on top of a high-performance Laravel + React.js stack.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Frontend Web Developer',
        company: 'Archipel Digital',
        location: 'Casablanca, Morocco · On-site',
        range: 'Jan 2024 – Aug 2024',
        url: 'https://archipel.group',
        tech: ['Angular', 'Vue.js', 'Tailwind CSS', 'Strapi CMS', 'TypeScript', 'SCSS', 'Bootstrap', 'REST API'],
      },
      html: `<ul>
        <li>Developed <strong>multiple client-facing frontends</strong> using Angular and Vue.js pixel-perfect from Figma/XD designs, responsive across all screen sizes.</li>
        <li>Integrated <strong>Strapi headless CMS</strong> with multiple frontend projects enabling clients to manage content without developer intervention.</li>
        <li>Connected frontends to <strong>RESTful backends</strong>, managing complex data flows and optimizing rendering performance for high-traffic pages.</li>
        <li>Enforced <strong>web performance, accessibility, and SEO best practices</strong> across all projects contributing to measurable improvements in Core Web Vitals.</li>
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
        <li>Built and maintained a <strong>WooCommerce e-commerce platform</strong> for a digital printing business products, categories, and custom checkout flows.</li>
        <li>Developed <strong>custom WordPress plugins</strong> to extend platform functionality beyond out-of-the-box capabilities.</li>
        <li>Optimized site performance and product management workflows, reducing manual workload for the business operations team.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Mobile Application Developer',
        company: 'Origin Control',
        location: 'Canada · Remote',
        range: 'Dec 2023 – Jan 2024',
        url: '#',
        tech: ['React Native', 'Expo', 'WebSocket', 'REST API', 'Real-time Communication'],
      },
      html: `<ul>
        <li>Built a <strong>React Native Expo mobile app</strong> that enables real-time remote monitoring and control of industrial machinery over a custom server protocol.</li>
        <li>Engineered <strong>real-time WebSocket communication</strong> between the app and machine controllers sub-second response times with reliable state sync.</li>
        <li>Designed an intuitive control interface for non-technical operators, reducing machine interaction errors during live operations.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Data Specialist',
        company: 'FPM · IDEMIA',
        location: 'Casablanca, Morocco · On-site',
        range: 'Oct 2023 – Dec 2023',
        url: 'https://idemia.com',
        tech: ['Python', 'Selenium', 'BeautifulSoup', 'Data Pipelines', 'Pandas'],
      },
      html: `<ul>
        <li>Built <strong>automated Python scraping pipelines</strong> (Selenium + BeautifulSoup) that replaced hours of manual data collection with scheduled, zero-touch extraction.</li>
        <li>Processed and <strong>cleaned large-scale datasets</strong> to meet strict accuracy and integrity standards required for enterprise-level data operations.</li>
        <li>Delivered <strong>structured, analysis-ready data outputs</strong> that directly fed into downstream reporting and decision-making workflows.</li>
      </ul>`,
    },
    {
      frontmatter: {
        title: 'Development Intern',
        company: 'Origin Control',
        location: 'Quebec, Canada · Remote',
        range: 'Apr 2023 – May 2023',
        url: '#',
        tech: ['Python', 'wxPython', 'Serial Communication', 'Desktop App', 'Hardware Sensors'],
      },
      html: `<ul>
        <li>Built a <strong>Python desktop application</strong> (wxPython) for real-time data acquisition from industrial hardware sensors replacing a manual logging process.</li>
        <li>Engineered a <strong>data pipeline that parses, visualizes, and logs live sensor streams</strong> making raw hardware data immediately actionable for engineers.</li>
        <li>Collaborated with the hardware engineering team to align the software interface with physical machine behavior and edge-case failure modes.</li>
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
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

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
                          <span key={j} className="tech-tag">{t}</span>
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
