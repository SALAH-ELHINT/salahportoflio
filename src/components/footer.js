import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
    transition: var(--transition);
    &:hover {
      color: var(--green);
    }
  }

  .contact-info {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    a {
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
      </ul>
    </StyledSocialLinks>

    <StyledCredit tabindex="-1">
      <div className="contact-info">
        <a href="tel:+212635278125">
          <Icon name="Phone" />
            +212 635-278-125
        </a>
        <a href="mailto:salah.elhint@gmail.com">
          <Icon name="Email" />
            salah.elhint@gmail.com
        </a>
        <a href="https://github.com/SALAH-ELHINT">
          <Icon name="GitHub" />
            GitHub
        </a>
        <a href="https://www.linkedin.com/in/salah-elhint-70447925b/">
          <Icon name="Linkedin" />
            LinkedIn
        </a>
      </div>

      <a href="https://www.linkedin.com/in/salah-elhint-70447925b/">
        <div>Designed &amp; Built by Salah El Hint</div>
      </a>
    </StyledCredit>
  </StyledFooter>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
