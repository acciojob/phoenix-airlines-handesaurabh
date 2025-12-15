// Global service utilities

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount) => {
  if (!amount) return '₹0';
  return `₹${amount.toLocaleString()}`;
};

export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

export const thousandSeparator = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Add more utility functions as needed
export default {
  formatDate,
  formatCurrency,
  formatTime,
  thousandSeparator,
};
