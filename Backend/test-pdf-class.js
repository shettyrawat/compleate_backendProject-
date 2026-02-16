import { PDFParse } from 'pdf-parse';

console.log('PDFParse:', PDFParse);
console.log('Type of PDFParse:', typeof PDFParse);

try {
    const buffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
    const parser = new PDFParse({ data: buffer });
    console.log('Parser instance created');
    parser.getText().then(data => {
        console.log('Text extracted:', data.text);
    }).catch(err => {
        console.log('Extraction failed:', err.message);
    });
} catch (err) {
    console.log('Instantiation failed:', err.message);
}
