import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function verify() {
    console.log('Listing models with key:', API_KEY);
    try {
        const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
        const response = await fetch(listUrl);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}
verify();
