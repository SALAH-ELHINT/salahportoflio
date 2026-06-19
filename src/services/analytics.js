/* eslint-disable no-console */
import Clarity from '@microsoft/clarity';
import { microsoftClarityId } from '@config';

let isInitialized = false;

/**
 * Initializes Microsoft Clarity.
 * Ensures the script is only injected once on the client-side.
 * Uses the project ID from the configuration or environment variables.
 */
export const initAnalytics = () => {
  // SSR check: Gatsby builds on Node.js where window is not available.
  if (typeof window === 'undefined') {
    return;
  }

  if (isInitialized) {
    return;
  }

  // Support GATSBY_ prefix which makes variables available to client-side code in Gatsby.
  const projectId = process.env.GATSBY_CLARITY_PROJECT_ID || microsoftClarityId;

  if (!projectId) {
    console.warn(
      '[Analytics] Microsoft Clarity Project ID is missing. Clarity tracking will not run.',
    );
    return;
  }

  try {
    Clarity.init(projectId);
    isInitialized = true;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Microsoft Clarity initialized with Project ID: ${projectId}`);
    }
  } catch (error) {
    console.error('[Analytics] Failed to initialize Microsoft Clarity:', error);
  }
};

/**
 * Tracks a custom event in Microsoft Clarity (Smart Events).
 * Since Microsoft Clarity only accepts a string for event tracking,
 * any additional data provided will be set as session custom tags.
 * This allows filtering user session recordings by these event details.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {Object} [data] - Optional metadata / properties for the event.
 */
export const trackEvent = (eventName, data = {}) => {
  if (typeof window === 'undefined' || !window.clarity) {
    return;
  }

  try {
    // Track the primary event name
    Clarity.event(eventName);

    // Track any additional attributes as custom tags for session segmentation
    if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        // Clarity tags must be strings or arrays of strings. Keep it clean.
        const tagValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        Clarity.setTag(key, tagValue);
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event Tracked: "${eventName}"`, data);
    }
  } catch (error) {
    console.error(`[Analytics] Error tracking event "${eventName}":`, error);
  }
};

/**
 * Tracks virtual page views for Single Page Applications (SPAs).
 * Sets the current page path as a custom tag and fires a corresponding custom event.
 *
 * @param {string} pageName - The URL path or page identifier.
 */
export const trackPageView = pageName => {
  if (typeof window === 'undefined' || !window.clarity) {
    return;
  }

  const path = pageName || window.location.pathname;

  try {
    // Set a custom tag for page filtering in the dashboard
    Clarity.setTag('pagePath', path);

    // Fire a custom event representing page view
    // Replace non-alphanumeric characters with underscores to ensure clean event names
    const safePageEvent = `page_view_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
    Clarity.event(safePageEvent);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Page View Tracked: "${path}"`);
    }
  } catch (error) {
    console.error(`[Analytics] Error tracking page view for "${path}":`, error);
  }
};
