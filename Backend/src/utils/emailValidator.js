import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'yopmail.com', 'tempmail.com', 'guerrillamail.com',
    '10minutemail.com', 'sharklasers.com', 'dispostable.com', 'getnada.com',
    'bugmenot.com', 'trashmail.com'
];

/**
 * Validates an email domain by checking MX records and blocking disposable domains.
 * @param {string} email - The email address to validate.
 * @returns {Promise<{valid: boolean, message?: string}>}
 */
export const validateEmailDomain = async (email) => {
    try {
        const domain = email.split('@')[1].toLowerCase();

        // Block disposable domains
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            return { valid: false, message: 'Disposable email addresses are not allowed' };
        }

        const records = await resolveMx(domain);
        if (!records || records.length === 0) {
            return { valid: false, message: 'Invalid or unreachable email domain' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, message: 'Error validating email domain' };
    }
};
