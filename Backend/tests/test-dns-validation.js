
async function testEmailValidation(email) {
    console.log(`Testing email: ${email}`);
    const domain = email.split('@')[1];
    try {
        // We can't easily import the controller function without server context, 
        // so we replicate the logic here to verify it works.
        const dns = await import('dns');
        const { promisify } = await import('util');
        const resolveMx = promisify(dns.resolveMx);

        const records = await resolveMx(domain);
        console.log(`Result: Domain exists and has ${records.length} MX records.`);
        return true;
    } catch (error) {
        console.log(`Result: Domain invalid or no MX records found. (${error.message})`);
        return false;
    }
}

(async () => {
    await testEmailValidation('test@gmail.com');
    await testEmailValidation('user@fake-domain-123-abc.com');
})();
