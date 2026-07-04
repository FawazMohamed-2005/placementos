# PlacementOS

A full-stack Placement Preparation Operating System built with the MERN stack. Designed to help college students manage their entire placement journey — DSA tracking, job applications, resume management, interview preparation, and AI-powered assistance — all in one place.

---

## What Problem It Solves

During placement season, students juggle too many tools:

- DSA progress tracked in random notes or Excel
- Job applications forgotten or lost in spreadsheets
- Multiple resume versions scattered across drives and email
- Interview preparation done ad-hoc with no structure
- No AI guidance during problem solving or practice

PlacementOS brings all of this into one unified system.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT (JSON Web Token) + bcrypt |
| File Uploads | Multer (PDF handling) |
| AI Features | Groq API (llama-3.1-8b-instant) |
| HTTP Client | Axios |
| Dev Tools | Nodemon, dotenv |

---

## Modules

### Module 1 — Authentication
- User registration and login
- Password hashing with bcrypt
- JWT-based stateless authentication
- Protected routes with auth middleware
- Token stored in localStorage, sent as Bearer token

### Module 2 — DSA Tracker
- Curated database of 135 problems across 9 topics
- Problems sourced from Blind 75, NeetCode 150, Striver SDE Sheet
- Four-status tracking: Not Started, Attempted, Solved, Revision Needed
- Color-coded status badges and active button states
- Search by title, filter by difficulty and topic
- Progress bar showing overall completion percentage
- Per-problem notes: approach, mistakes, time/space complexity, revision notes
- Revision Queue page showing only problems needing review
- Stats dashboard: Solved, Attempted, Revision, Total Tracked

### Module 3 — Job Application Tracker
- Add, edit, delete job applications
- Full lifecycle status tracking: Applied → OA Scheduled → OA Completed → Interview Scheduled → Rejected → Offer Received
- Search by company or role
- Filter by application status
- Dashboard stats: Total, Interviewing, Offers, Rejected

### Module 4 — Resume Manager
- Upload multiple PDF resumes (up to 5MB each)
- Tag resumes: SDE, Product, General, Internship
- View PDF directly in browser
- Download resume
- AI-powered resume review with structured feedback
- Delete resume removes file from both disk and database

### Module 5 — Dashboard
- Central overview of all modules
- Time-based greeting (Good Morning / Afternoon / Evening)
- Overview strip: Problems Solved, Jobs Applied, Offers, Revision count
- DSA section with progress bar
- Jobs section with application stats
- Resume section showing latest uploaded resume
- Quick action buttons: Solve Problem, Add Application
- All data fetched simultaneously using Promise.all()

### Module 6 — Interview Preparation
- Save prepared answers to HR and behavioral questions
- Six categories: Introduction, Strengths and Weaknesses, Behavioral, Projects, Company Specific, Other
- Suggested questions per category (clickable to auto-fill)
- Expandable answer cards — click to reveal full answer
- Edit and delete saved answers
- AI Interview Coach for real-time answer feedback

### Module 7 — AI Features (Powered by Groq)
- **AI DSA Mentor**: Get hints for any problem without receiving the full solution
- **AI Resume Review**: Structured feedback with ATS score estimate
- **AI Interview Coach**: Score your answer, identify gaps, get improvement tips
- API key secured on backend only — never exposed to browser
- Model: llama-3.1-8b-instant via Groq free tier

---

## Project Structure

```
PlacementOS/
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   ├── UserProgress.js
│   │   ├── Note.js
│   │   ├── Application.js
│   │   ├── Resume.js
│   │   └── InterviewAnswer.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── problemRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── noteRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── interviewRoutes.js
│   │   └── aiRoutes.js
│   ├── seed/
│   │   └── seedProblems.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   └── Navbar.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Problems.jsx
        │   ├── ProblemDetail.jsx
        │   ├── Revision.jsx
        │   ├── Jobs.jsx
        │   ├── JobForm.jsx
        │   ├── Resume.jsx
        │   └── Interview.jsx
        ├── services/
        │   └── api.js
        └── App.jsx
```

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier)
- Groq API key (free at console.groq.com)

### Step 1 — Clone the repository

```bash
git clone https://github.com/FawazMohamed-2005/placementos.git
cd placementos
```

### Step 2 — Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

### Step 3 — Seed the problem database

```bash
npm run seed
```

This seeds 135 curated DSA problems across 9 topics.

### Step 4 — Start the backend

```bash
npm run dev
```

Backend runs on http://localhost:5000

### Step 5 — Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for signing JWT tokens |
| GROQ_API_KEY | Groq API key for AI features |
| PORT | Backend server port (default 5000) |

---

## DSA Problem Coverage

| Topic | Problems |
|-------|----------|
| Array | 15 |
| String | 15 |
| Linked List | 15 |
| Stack | 15 |
| Tree | 15 |
| Graph | 15 |
| Dynamic Programming | 15 |
| Binary Search | 15 |
| Recursion and Backtracking | 15 |
| Heap | 15 |
| **Total** | **135** |

Problems sourced from Blind 75, NeetCode 150, and Striver SDE Sheet.

---

## Key Design Decisions

**JWT over Sessions**: Stateless authentication allows the API to scale without server-side session storage. The token carries the user ID in the payload and is verified using HMAC SHA-256 signature on every request.

**Upsert Pattern for Progress and Notes**: Instead of checking if a record exists before creating or updating, all progress and note saves use MongoDB's findOneAndUpdate with upsert: true. This eliminates race conditions and reduces database calls.

**Separate Problem and UserProgress Models**: Problem data is shared across all users. UserProgress is user-specific. This many-to-many design means 1000 users can track the same 135 problems without duplicating problem data.

**FormData for File Uploads**: Resume PDFs cannot be sent as JSON since JSON cannot carry binary data. The frontend uses FormData which triggers multipart/form-data encoding. Multer on the backend intercepts and processes this encoding.

**AI on Backend Only**: The Groq API key is stored in .env on the server. All AI calls go through the Express backend. The browser only communicates with the PlacementOS API, never directly with Groq. The API key is never exposed in client-side code.

**Promise.all() on Dashboard**: The dashboard needs data from three endpoints. Sequential fetches would take the sum of all three response times. Promise.all() fires all three simultaneously and resolves when all complete, reducing load time to the slowest single request.

---

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and receive JWT |

### DSA
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/problems | Get all problems |
| GET | /api/problems/:id | Get single problem |
| GET | /api/progress | Get user progress |
| POST | /api/progress | Update problem status |
| GET | /api/progress/revision | Get revision queue |
| GET | /api/progress/stats | Get progress statistics |
| GET | /api/notes/:problemId | Get notes for problem |
| POST | /api/notes/:problemId | Save notes for problem |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/applications | Get all applications |
| POST | /api/applications | Create application |
| GET | /api/applications/:id | Get single application |
| PUT | /api/applications/:id | Update application |
| DELETE | /api/applications/:id | Delete application |
| GET | /api/applications/stats/summary | Get job stats |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/resumes | Get all resumes |
| POST | /api/resumes | Upload resume PDF |
| DELETE | /api/resumes/:id | Delete resume |

### Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/interview | Get all answers |
| POST | /api/interview | Save answer |
| PUT | /api/interview/:id | Update answer |
| DELETE | /api/interview/:id | Delete answer |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/dsa-mentor | Get DSA hints |
| POST | /api/ai/resume-review | Get resume feedback |
| POST | /api/ai/interview-coach | Get answer feedback |

---

## Author

**Fawaz Mohamed**
B.Tech Computer Science — SASTRA University, Thanjavur
GitHub: [FawazMohamed-2005](https://github.com/FawazMohamed-2005)

---

## License

This project is open source and available under the MIT License.
