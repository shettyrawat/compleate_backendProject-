import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('pdf object keys:', Object.keys(pdf));

try {
    // Dummy buffer
    const buffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
    pdf(buffer).then(() => console.log('Successfully called pdf function'))
        .catch(err => {
            if (err.message.includes('not a function')) {
                console.log('Call failed: pdf is not a function');
            } else {
                console.log('Call reached function but failed with typical PDF error:', err.message);
            }
        });
} catch (err) {
    console.log('Outer catch:', err.message);
}
