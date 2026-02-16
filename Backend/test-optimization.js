import { generateOptimizedData } from './src/services/resumeScoring.service.js';
import dotenv from 'dotenv';
dotenv.config();

const testResumeText = `
John Doe
Software Engineer
john@example.com
React, Node.js, JavaScript
Worked at Google for 2 years as a Frontend Developer.
Education: BS in Computer Science from Stanford.
`;

async function test() {
    console.log('Testing generateOptimizedData...');
    const result = await generateOptimizedData(testResumeText, 'Full Stack Developer');
    console.log('Result:', JSON.stringify(result, null, 2));
}

test();
