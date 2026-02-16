/**
 * Formats a date string into a localized date format.
 * @param {string|Date} date - The date to format.
 * @returns {string} Formatted date string (e.g., "16/2/2026").
 */
export const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
};
