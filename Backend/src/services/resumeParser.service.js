import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extract text from buffer based on mimetype
 */
export const extractText = async (buffer, mimetype) => {
    try {
        if (mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: buffer });
            const data = await parser.getText();
            await parser.destroy();
            return data.text;
        } else if (
            mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            mimetype === 'application/msword'
        ) {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        }
        return '';
    } catch (error) {
        console.error('Text extraction error:', error);
        throw error;
    }
};

