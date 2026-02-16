# External Services & Integrations Detail

Aapke project mein kaafi saari external "power-ups" (services) use ho rahi hain jo ise ek advanced AI application banati hain. Inka detail yahan diya gaya hai:

## 1. AI Services (The "Brain")
Aapka project AI capabilities ke liye inka use karta hai:

- **Fireworks AI / Google Gemini**: 
    - **Kaam**: Ye project ki main intelligence hai. Ye resume text ko analyze karta hai, interview ke questions generate karta hai, aur chatbot ke replies likhta hai.
    - **Implementation**: `backend/src/services/` mein iski logic hoti hai jahan API Key ke zariye ise backend se connect kiya gaya hai.
    - **Usage**: Resume Optimization, Mock Interviews, aur Career ChatBot.

## 2. Persistence & Storage (The "Memory")
Data ko safe rakhne ke liye inka use hota hai:

- **MongoDB (via Mongoose)**:
    - **Kaam**: Ye aapka primary database hai. User details, saved jobs, aur interview history isi mein store hoti hai.
    - **Implementation**: `src/models/` folder mein saari schema definitions (User, Job, etc.) hoti hain.
- **Cloudinary**:
    - **Kaam**: PDFs aur Images ko store karne ke liye. Jab aap resume upload karte hain, toh wo file Cloudinary par upload hoti hai aur backend sirf uska **URL** database mein save karta hai.
    - **Faida**: Isse aapka server heavy nahi hota aur files hamesha fast load hoti hain.

## 3. Communication & Auth (The "Bridge")
User se connect hone ke liye:

- **Nodemailer**:
    - **Kaam**: OTP aur welcome emails bhejne ke liye. 
    - **Event**: Jab koi Naya user register karta hai ya password reset karta hai, toh Nodemailer ke zariye email jaata hai.
- **Google Auth (OAuth2)**:
    - **Kaam**: "Login with Google" feature ke liye. Ye user ko bina password ke secure tarike se login karne ki suvidha deta hai.

## 4. Security Frameworks (The "Shield")
Project ko hackers aur overload se bachane ke liye:

- **Helmet.js**: Ye automatically secure HTTP headers set karta hai taaki common web vulnerabilities se bacha ja sake.
- **CORS (Cross-Origin Resource Sharing)**: Ye batata hai ki sirf aapka **Frontend** hi is **Backend** se baat kar sakta hai. 
- **Express Rate Limit**: Ye check karta hai ki koi ek hi user bar-bar hazaron requests bhej kar server ko crash na karde (Anti-DDoS).

## 5. File Processing Utilities
- **pdf-parse / Mammoth**:
    - **Kaam**: Ye "External Library" hain jo PDF aur Word files ke andarr ka text "read" karti hain taaki AI us text ko analyze kar sake.

---

## Summarized Mapping

| Service | Category | Use Case |
| :--- | :--- | :--- |
| **Fireworks/Gemini** | AI Engine | Analysis & Chat |
| **MongoDB Atlas** | Database | User & App Data |
| **Cloudinary** | File Hosting | Resumes & Profiles |
| **Nodemailer** | SMTP Service | Emails & OTPs |
| **Google Cloud** | Auth Provider | Social Login |
