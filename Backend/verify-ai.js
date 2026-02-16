import { calculateScore } from './src/services/resumeScoring.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function verify() {
    console.log('Testing Resume Scoring with Gemini...');

    const sampleText = `
        John Doe
        Software Engineer
        Experience: 5 years of React and Node.js development.
        Skills: JavaScript, HTML, CSS, MongoDB.
    `;

    const sampleExtractedInfo = {
        skills: ['React', 'Node.js', 'JavaScript', 'MongoDB']
    };

    try {
        const result = await calculateScore(sampleText, sampleExtractedInfo);
        console.log('Success! Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
