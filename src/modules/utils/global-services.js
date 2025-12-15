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

export const validateSearch = (source, dest, deptDate, returnDate, selectTrip) => {
  // Return true if form is invalid (to disable button)
  if (!source || !dest || !deptDate) {
    return true;
  }
  
  // If round trip is selected, return date is required
  if (selectTrip?.toUpperCase() === 'BOTH' && !returnDate) {
    return true;
  }
  
  // All validations passed, form is valid
  return false;
};

// Add more utility functions as needed
export default {
  formatDate,
  formatCurrency,
  formatTime,
  thousandSeparator,
  validateSearch,
};
