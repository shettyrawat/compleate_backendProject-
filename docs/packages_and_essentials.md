# Project Packages & Essential Knowledge

Ye guide aapko project mein use hone waale har module (package) aur important concepts ke baare mein detail batiayegi.

## 1. Backend Packages (The Engine)

| Package | Kaam (Purpose) |
| :--- | :--- |
| **express** | Ye main web framework hai jo hamare API routes ko handle karta hai. |
| **mongoose** | MongoDB database ke saath "baat" karne ke liye (ODM). Ye data structure rules banata hai. |
| **jsonwebtoken (JWT)** | Secure login status maintain karne ke liye "Security Id" (Token) generate karta hai. |
| **bcryptjs** | Passwords ko database mein save karne se pehle "hashing" (encrypt) karta hai. |
| **dotenv** | `.env` file se secret keys (jaise API keys) ko read karne ke liye. |
| **cors** | Batata hai ki hamara Frontend hamare Backend se connect ho sakta hai ya nahi. |
| **helmet** | Security headers add karke app ko hackers se protect karta hai. |
| **express-rate-limit** | Ek hi user ko bahut saari requests bhejne se rokta hai (DDoS attack protection). |
| **multer** | File upload (jaise resume PDF) handle karne ke liye. |
| **cloudinary** | PDF files aur pictures ko cloud store par save karne ke liye. |
| **nodemailer** | Automatic emails aur OTP bhejne ke liye. |
| **pdf-parse / mammoth** | PDF aur Word files se text extract karne ke liye (AI analysis ke liye). |
| **@google/generative-ai** | Google Gemini AI ko connect karne ke liye (AI Intelligence). |

## 2. Frontend Packages (The UI/UX)

| Package | Kaam (Purpose) |
| :--- | :--- |
| **react** | Main library jo hamara user interface banati hai. |
| **react-router-dom** | Alag-alag pages (Pages/Login, Pages/Home) ke beech navigation ke liye. |
| **axios** | Backend API ko requests bhejne aur data lane ke liye. |
| **framer-motion** | CSS animations ko smooth aur fast banane ke liye. |
| **lucide-react / react-icons** | Sundar aur modern icons use karne ke liye. |
| **@react-oauth/google** | Google se social login handle karne ke liye. |
| **i18next** | Website ko multiple languages mein support karne ke liye. |
| **chart.js / react-chartjs-2** | Analysis results ko Graphs aur Charts mein dikhane ke liye. |

## 3. Essential Concepts (Must-Know)

### A. Environment Variables (`.env`)
Ye aapki "Secret Diary" hai. Ismein API keys aur Database URL hote hain. 
> [!IMPORTANT]
> Kabhi bhi `.env` file ko GitHub par upload nahi karte (isse keys leak ho sakti hain).

### B. ES Modules (`import/export`)
Aapke project mein modern JavaScript use ho rahi hai:
- Purana tareeka: `const express = require('express')`
- Naya tareeka (Jo hum use kar rahe hain): `import express from 'express'`

### C. Async/Await & Middlewares
Hamare API calls "Promises" use karte hain. `async/await` unhe asaan banata hai. Humne **Middlewares** add kiye hain jo check karte hain ki:
1. User logged in hai ya nahi? (`protect`)
2. Kya uske paas permission hai? (`authorize`)
3. Kya koi error toh nahi aaya? (`errorHandler`)

### D. Folder Structure Strategy
- **`src/models`**: Database ka structure.
- **`src/controllers`**: App ki main logic (Functions).
- **`src/routes`**: URLs jahan API listen karti hai.
- **`src/middleware`**: Logic jo request ke beech mein chalti hai.

---

Aap in packages ka full control `package.json` file mein dekh sakte hain.
