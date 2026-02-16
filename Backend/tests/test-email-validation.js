import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'yopmail.com', 'tempmail.com', 'guerrillamail.com',
    '10minutemail.com', 'sharklasers.com', 'dispostable.com', 'getnada.com',
    'bugmenot.com', 'trashmail.com'
];

const validateEmailDomain = async (email) => {
    try {
        const domain = email.split('@')[1].toLowerCase();

        if (DISPOSABLE_DOMAINS.includes(domain)) {
            return { valid: false, message: 'Disposable email addresses are not allowed' };
        }

        const records = await resolveMx(domain);
        if (!records || records.length === 0) {
            return { valid: false, message: 'Invalid or unreachable email domain' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, message: 'Error validating email domain or domain does not exist' };
    }
};

const testEmails = [
    'test@gmail.com',         // Should be valid
    'test@mailinator.com',    // Should be disposable/invalid
    'test@nonexistent123456789.com', // Should be invalid domain
    'test@yahoo.com'          // Should be valid
];

async function runTests() {
    console.log('--- Email Validation Tests ---');
    for (const email of testEmails) {
        const result = await validateEmailDomain(email);
        console.log(`Email: ${email} -> Valid: ${result.valid}${result.message ? ' | Message: ' + result.message : ''}`);
    }
}

runTests();
