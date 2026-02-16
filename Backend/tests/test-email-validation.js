import { validateEmailDomain } from '../src/utils/emailValidator.js';


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
