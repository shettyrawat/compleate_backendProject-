# Full Project Flow: AI Career Assistant

Ye document aapke poore project (Frontend + Backend) ka detailed architecture aur request flow explain karta hai.

## 1. High-Level Architecture
Project do main parts mein divided hai: **Frontend (React)** aur **Backend (Node/Express)**.

```mermaid
graph TD
    User((User))
    
    subgraph "Frontend (React + Vite)"
        UI[User Interface / Pages]
        Context[Auth/AppContext]
        API_Service[API Services / Axios]
    end

    subgraph "Backend (Node.js + Express)"
        Routes[Express Routes]
        MW[Optimized Middlewares]
        Controllers[Business Logic]
        Services[AI & Email Services]
    end

    subgraph "External & Persistence"
        DB[(MongoDB)]
        AI_Provider[Fireworks/Gemini AI]
        Cloudinary[Cloudinary / File Storage]
    end

    User <--> UI
    UI <--> Context
    Context <--> API_Service
    API_Service <-->|JSON Requests| Routes
    Routes --> MW
    MW --> Controllers
    Controllers --> DB
    Controllers --> AI_Provider
    Controllers --> Cloudinary
```

## 2. Core Feature Flows

### A. Authentication & Authorization Flow
Login aur data protection kaise kaam karta hai:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as MongoDB

    U->>F: Enter Login Details
    F->>B: POST /api/auth/login
    B->>D: Check Credentials
    D-->>B: User Data
    B->>B: Generate JWT Token
    B-->>F: Return Token + User Profile
    F->>F: Save Token (LocalStorage)
    
    Note over F,B: Secure Request Example
    F->>B: GET /api/resumes (With Auth Header)
    B->>B: protect Middleware (Verify JWT)
    B->>B: Set req.user
    B->>D: Fetch Resumes for User
    D-->>B: Resume List
    B-->>F: JSON Response
```

### B. AI Resume Analysis Flow
Resume upload se analysis tak ka flow:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant AI as AI Provider (Fireworks)
    participant S as Cloudinary (PDF Store)

    U->>F: Upload PDF Resume
    F->>B: POST /api/resumes/upload
    B->>S: Save PDF File
    B->>B: Parse Text from PDF
    B->>AI: Send Text + Analysis Prompt
    AI-->>B: Optimized Content / Analysis
    B->>D: Save Result in Database
    B-->>F: Return Analysis Results
    F->>U: Display "Optimized Resume"
```

## 3. Module Mapping

| Module | Frontend Page | Backend Route | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | Login.jsx, Register.jsx | `/api/auth` | JWT based auth, OTP, Email Verify. |
| **Resume** | ResumeAnalysis.jsx | `/api/resumes` | PDF Parsing, AI analysis, storage. |
| **Interview** | MockInterview.jsx | `/api/interviews` | Real-time AI interview questions. |
| **Jobs** | JobList.jsx, AddJob.jsx | `/api/jobs` | Job management & listing. |
| **Chatbot** | ChatBot.jsx | `/api/chatbot` | General AI career guidance. |

---

## 4. How to get PDF

Aap is document ko PDF mein convert karne ke liye ye steps follow kar sakte hain:

1.  **VS Code Extension**: VS Code mein "Markdown PDF" extension use karke `Ctrl+Shift+P` -> `Markdown PDF: Export (pdf)` karein.
2.  **Mermaid Live Editor**: Agar sirf diagrams ki high-quality PDF chahiye, toh aap [Mermaid Live Editor](https://mermaid.live/) par ye code copy-paste karke `Download PDF` par click kar sakte hain.
3.  **Browser Print**: Is document ko open karke Chrome mein `Right Click` -> `Print` -> `Save as PDF` karein.
