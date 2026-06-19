/**
 * Initializes Microsoft Clarity.
 * Ensures the script is only injected once on the client-side.
 * Uses the project ID from the configuration or environment variables.
 */
export function initAnalytics(): void;

/**
 * Tracks a custom event in Microsoft Clarity (Smart Events).
 * Since Microsoft Clarity only accepts a string for event tracking,
 * any additional data provided will be set as session custom tags.
 * This allows filtering user session recordings by these event details.
 *
 * @param eventName - The name of the event to track.
 * @param data - Optional metadata / properties for the event.
 */
export function trackEvent(eventName: string, data?: Record<string, any>): void;

/**
 * Tracks virtual page views for Single Page Applications (SPAs).
 * Sets the current page path as a custom tag and fires a corresponding custom event.
 *
 * @param pageName - The URL path or page identifier.
 */
export function trackPageView(pageName: string): void;
