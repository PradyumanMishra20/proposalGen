// Analytics utilities for privacy-safe tracking

// Configuration
interface AnalyticsConfig {
  GA_MEASUREMENT_ID: string;
  ENABLED: boolean;
  DEBUG: boolean;
}

const ANALYTICS_CONFIG: AnalyticsConfig = {
  GA_MEASUREMENT_ID: process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  ENABLED: process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  DEBUG: process.env.REACT_APP_ANALYTICS_DEBUG === 'true'
};

// Event parameter interfaces
export interface EventParameters {
  [key: string]: string | number | boolean | undefined | Record<string, any>;
}

export interface ProposalEventParams extends EventParameters {
  event_category: string;
  event_label?: string;
  value?: number;
  template_type?: string;
  proposal_length?: number;
  has_custom_fields?: boolean;
  action?: string;
  format?: string;
}

export interface ErrorEventParams extends EventParameters {
  event_category: string;
  event_label: string;
  error_message: string;
  context?: Record<string, any>;
}

export interface PerformanceEventParams extends EventParameters {
  event_category: string;
  event_label: string;
  value: number;
}

// Check if analytics should be enabled
const isAnalyticsEnabled = (): boolean => {
  // Check if user has consented (you can implement a consent manager)
  const hasConsent = localStorage.getItem('analytics-consent') === 'true';
  return ANALYTICS_CONFIG.ENABLED && hasConsent;
};

// Initialize Google Analytics
export const initAnalytics = (): void => {
  if (!isAnalyticsEnabled()) {
    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics disabled or no consent');
    }
    return;
  }

  // Load gtag script if not already loaded
  if (typeof (window as any).gtag === 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function(...args: any[]): void {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Privacy-safe: anonymize IP addresses
      cookie_flags: 'SameSite=Lax;Secure', // Privacy-safe cookies
      send_page_view: true,
      custom_map: {
        'custom_dimension_1': 'user_plan',
        'custom_dimension_2': 'proposal_type'
      }
    });

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics initialized');
    }
  }
};

// Privacy-safe event tracking
export const trackEvent = (eventName: string, parameters: EventParameters = {}): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    // Remove any personally identifiable information
    const cleanParams = sanitizeParameters(parameters);
    
    (window as any).gtag('event', eventName, cleanParams);
    
    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics event:', eventName, cleanParams);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    (window as any).gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
      anonymize_ip: true
    });

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Page view tracked:', pagePath, pageTitle);
    }
  } catch (error) {
    console.error('Page view tracking error:', error);
  }
};

// Track user engagement
export const trackEngagement = (action: string, category: string, label: string = '', value: number = 0): void => {
  trackEvent('engagement', {
    event_category: category,
    event_label: label,
    value: value,
    action: action
  });
};

// Track proposal generation
export const trackProposalGenerated = (templateType: string, proposalLength: number, hasCustomFields: boolean): void => {
  trackEvent('proposal_generated', {
    event_category: 'proposal',
    event_label: templateType,
    template_type: templateType,
    proposal_length: proposalLength,
    has_custom_fields: hasCustomFields,
    custom_dimension_2: templateType
  });
};

// Track proposal actions (copy, download, export)
export const trackProposalAction = (action: string, format: string, proposalLength: number): void => {
  trackEvent('proposal_action', {
    event_category: 'proposal',
    event_label: `${action}_${format}`,
    action: action,
    format: format,
    proposal_length: proposalLength
  });
};

// Track user interactions
export const trackUserInteraction = (element: string, action: string, context: Record<string, any> = {}): void => {
  trackEvent('user_interaction', {
    event_category: 'ui',
    event_label: element,
    action: action,
    context: context
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean, errors: string[] = []): void => {
  trackEvent('form_submission', {
    event_category: 'form',
    event_label: formName,
    success: success,
    error_count: errors.length,
    has_errors: errors.length > 0
  });
};

// Track feature usage
export const trackFeatureUsage = (featureName: string, usageType: string, metadata: Record<string, any> = {}): void => {
  trackEvent('feature_usage', {
    event_category: 'feature',
    event_label: featureName,
    usage_type: usageType,
    ...metadata
  });
};

// Track errors
export const trackError = (errorType: string, errorMessage: string, context: Record<string, any> = {}): void => {
  trackEvent('error', {
    event_category: 'error',
    event_label: errorType,
    error_message: errorMessage,
    context: context
  });
};

// Track performance metrics
export const trackPerformance = (metricName: string, value: number, metadata: Record<string, any> = {}): void => {
  trackEvent('performance', {
    event_category: 'performance',
    event_label: metricName,
    value: value,
    ...metadata
  });
};

// Sanitize parameters to remove PII
const sanitizeParameters = (parameters: EventParameters): EventParameters => {
  const sanitized = { ...parameters };
  
  // Remove potentially sensitive fields
  const sensitiveFields = [
    'email', 'name', 'phone', 'address', 'credit_card',
    'ssn', 'password', 'token', 'api_key', 'user_id'
  ];
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      delete sanitized[field];
    }
  });
  
  // Sanitize text fields to remove potential PII patterns
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];
    if (typeof value === 'string') {
      // Remove email patterns
      sanitized[key] = value.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]');
      // Remove phone patterns
      sanitized[key] = value.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[REDACTED_PHONE]');
      // Remove credit card patterns
      sanitized[key] = value.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[REDACTED_CARD]');
    }
  });
  
  return sanitized;
};

// Consent management
export const grantAnalyticsConsent = (): void => {
  localStorage.setItem('analytics-consent', 'true');
  initAnalytics();
};

export const revokeAnalyticsConsent = (): void => {
  localStorage.setItem('analytics-consent', 'false');
  
  // Disable analytics
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      update: true,
      send_page_view: false
    });
  }
};

export const hasAnalyticsConsent = (): boolean => {
  return localStorage.getItem('analytics-consent') === 'true';
};

// Privacy-safe user properties
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isAnalyticsEnabled()) return;
  
  try {
    const sanitized = sanitizeParameters(properties);
    (window as any).gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      custom_map: sanitized
    });
  } catch (error) {
    console.error('User properties tracking error:', error);
  }
};

// Export analytics object for easy access
export const analytics = {
  init: initAnalytics,
  trackEvent,
  trackPageView,
  trackEngagement,
  trackProposalGenerated,
  trackProposalAction,
  trackUserInteraction,
  trackFormSubmission,
  trackFeatureUsage,
  trackError,
  trackPerformance,
  setUserProperties,
  grantConsent: grantAnalyticsConsent,
  revokeConsent: revokeAnalyticsConsent,
  hasConsent: hasAnalyticsConsent
};

export default analytics;
