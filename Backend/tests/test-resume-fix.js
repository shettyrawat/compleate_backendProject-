import { extractInfo } from '../src/services/resumeParser.service.js';

const testText = "Experienced developer in C++, JavaScript, and React.";
const result = extractInfo(testText);

console.log("Found Skills:", JSON.stringify(result.skills));

if (result.skills.includes('C++')) {
    console.log("VERIFIED: C++ found.");
} else {
    console.log("FAILED: C++ still missing.");
}

if (result.skills.includes('React')) {
    console.log("VERIFIED: React found.");
}
