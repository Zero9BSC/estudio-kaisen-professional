/**
 * dataLayer helpers for GTM / Google Ads conversion tracking.
 * Ensure GTM container is loaded (dataLayer exists) before calling.
 */

const push = (payload) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ...payload,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Page view event – use on route change (SPA) for GA4/Google Ads.
 * Structure matches gtag page_view / GA4 recommended events.
 */
export const pushPageView = (params = {}) => {
  const { page_path, page_title, page_location } = params;
  push({
    event: 'page_view',
    page_path: page_path ?? (typeof window !== 'undefined' ? window.location.pathname || '/' : '/'),
    page_title: page_title ?? (typeof document !== 'undefined' ? document.title : ''),
    page_location: page_location ?? (typeof window !== 'undefined' ? window.location.href : '')
  });
};

/**
 * Google Ads conversion event – use for form submit, lead, purchase, etc.
 * In GTM: create trigger on this event, tag type "Google Ads Conversion Tracking".
 */
export const pushConversion = (params = {}) => {
  const {
    conversion_name = 'conversion',
    value,
    currency = 'ARS',
    transaction_id
  } = params;
  push({
    event: 'conversion',
    conversion_name,
    ...(value != null && { value }),
    ...(currency && { currency }),
    ...(transaction_id && { transaction_id })
  });
};

/**
 * GA4 generate_lead – use for contact form success (optional, in addition to conversion).
 */
export const pushGenerateLead = (value, currency = 'ARS') => {
  push({
    event: 'generate_lead',
    ...(value != null && { value }),
    ...(currency && { currency })
  });
};

export const trackEvent = (eventName, eventParams = {}) => {
  push({
    event: eventName,
    ...eventParams
  });
};

export const trackFormSubmit = (formType) => {
  trackEvent('form_submit', {
    form_type: formType
  });
};

/**
 * Contact conversion – form success. Fires form_submit + conversion for Google Ads.
 */
export const trackContactConversion = (options = {}) => {
  trackFormSubmit('contact_form');
  pushConversion({
    conversion_name: 'contact_form',
    ...options
  });
  pushGenerateLead(options.value, options.currency);
};

export const trackPhoneClick = (phoneNumber) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber
  });
};

export const trackWhatsAppClick = (source) => {
  trackEvent('whatsapp_click', {
    source: source ?? 'sticky_button'
  });
};
