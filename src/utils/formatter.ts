// Text formatting utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatText = (text: string, options: {
  capitalize?: boolean;
  truncate?: number;
} = {}): string => {
  let formatted = text;
  
  if (options.capitalize) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  
  if (options.truncate && formatted.length > options.truncate) {
    formatted = formatted.slice(0, options.truncate) + '...';
  }
  
  return formatted;
};
