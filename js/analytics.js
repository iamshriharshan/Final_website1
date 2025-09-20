// Pappa Fresh - Analytics Loader

// Replace with your GA4 Measurement ID (format: G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function loadGA4(measurementId) {
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
        console.warn('GA4 not initialized: please set your Measurement ID in js/analytics.js');
        return;
    }

    // Inject gtag.js
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(gtagScript);

    // Configure dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    // @ts-ignore
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
        send_page_view: true
    });
}

// Initialize on DOM ready (so head exists)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadGA4(GA_MEASUREMENT_ID));
} else {
    loadGA4(GA_MEASUREMENT_ID);
}

// Optional: helper to log events
export function trackEvent(action, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', action, params);
    }
}

