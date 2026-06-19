/**
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import { initAnalytics, trackPageView } from './src/services/analytics';

/**
 * Called when the Gatsby browser runtime starts.
 * Used to initialize Clarity once on application startup.
 */
export const onClientEntry = () => {
  initAnalytics();
};

/**
 * Called when the route changes.
 * Used to track page views in SPAs.
 */
export const onRouteUpdate = ({ location }) => {
  const pageName = location.pathname + location.search + location.hash;
  trackPageView(pageName);
};
