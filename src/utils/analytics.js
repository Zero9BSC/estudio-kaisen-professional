export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackFormSubmit = (formType) => {
  trackEvent('form_submit', {
    form_type: formType
  });
};

export const trackPhoneClick = (phoneNumber) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber
  });
};

export const trackWhatsAppClick = (source) => {
  trackEvent('whatsapp_click', {
    source: source
  });
};
