# AI Resume Analyzer

An AI-powered career assistant platform built with Next.js, Node.js, MongoDB, and Gemini AI.
The platform helps users analyze resumes, improve ATS scores, rewrite resumes professionally, prepare for interviews, and compare resume performance using AI.

---

## Live Demo

Frontend: https://ai-resume-analyzer-8l0gqmskr-silent-quasers-projects.vercel.app

Backend API: https://ai-resume-analyzer-backend-vtui.onrender.com

---

## Features

### AI Resume Analysis

* Upload resume PDFs
* Extract resume text automatically
* AI-powered ATS analysis
* Resume scoring and feedback
* Skill gap identification

### AI Resume Rewriter

* Improve resume quality using Gemini AI
* Rewrite resumes professionally
* ATS optimization suggestions

### AI Interview Preparation

* Generate interview questions
* Technical and HR preparation
* AI-generated practice content

### Job Match Engine

* Match resumes against job descriptions
* Skill comparison analysis
* Job compatibility insights

### Dashboard Analytics

* Resume analysis history
* Dashboard statistics
* Performance tracking
* Resume comparison system

### Authentication System

* JWT authentication
* Protected routes
* Secure login/register system

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI Integration

* Google Gemini AI API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Screenshots

### Dashboard

(Add screenshot here)

### Resume Analyzer

(Add screenshot here)

### AI Resume Rewriter

(Add screenshot here)

### Interview Preparation

(Add screenshot here)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/silent-quaser/ai-resume-analyzer.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
npm install
```

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## Project Structure

```bash
ai-resume-analyzer/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
│
├── src/
│   ├── app/
│   ├── components/
│   └── styles/
│
└── public/
```

---

## Future Improvements

* Resume templates
* AI voice interview simulation
* Real-time ATS scoring
* OAuth authentication
* Subscription system
* Resume export system

---

## Author

Naveen Krishnan

GitHub: https://github.com/silent-quaser

---

## License

This project is licensed under the MIT License.
