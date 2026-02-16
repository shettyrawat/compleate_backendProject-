import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('Is pdf a function?', typeof pdf === 'function');
console.log('Object keys:', Object.keys(pdf));

if (pdf.default) {
    console.log('Type of pdf.default:', typeof pdf.default);
}

// Check common names
['parse', 'getText', 'extract'].forEach(name => {
    if (pdf[name]) console.log(`Found pdf.${name} as ${typeof pdf[name]}`);
});

// Try to see what happens if we module.exports it
import fs from 'fs';
const packageJson = JSON.parse(fs.readFileSync('./node_modules/pdf-parse/package.json', 'utf8'));
console.log('package.json main:', packageJson.main);
