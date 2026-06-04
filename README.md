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

![Dashboard 1](./public/screenshots/dashboard-1.png)

![Dashboard 2](./public/screenshots/dashboard-2.png)

### Analyze Resume

![Analyze Resume-1](./public/screenshots/analyzer-1.png)

![Analyze Resume-2](./public/screenshots/analyzer-2.png)

### History

![History 1](./public/screenshots/history-1.png)

![History 2](./public/screenshots/history-2.png)

![History 3](./public/screenshots/history-3.png)

### Compare Resumes

![Compare Resume 1](./public/screenshots/compare-1.png)

![Compare Resume 2](./public/screenshots/compare-2.png)

### AI Resume Rewriter 

![Resume Rewriter 1](./public/screenshots/resume-rewriter-1.png)

![Resume Rewriter 2](./public/screenshots/resume-rewriter-2.png)

![Resume Rewriter 3](./public/screenshots/resume-rewriter-3.png)

### Job Match Engine 

![Job Match 1](./public/screenshots/job-match-1.png)

![Job Match 2](./public/screenshots/job-match-2.png)

![Job Match 3](./public/screenshots/job-match-3.png)

![Job Match 4](./public/screenshots/job-match-4.png)

### AI Interview Prep

![Interview prep 1](./public/screenshots/interview-1.png)

![Interview prep 2](./public/screenshots/interview-2.png)

### Profile 

![Profile ](./public/screenshots/profile.png)

### Settings

![Settings 1](./public/screenshots/settings-1.png)

![Settings 2](./public/screenshots/settings-2.png)

### Notification

![Notification ](./public/screenshots/notification.png)

### Info

![Info ](./public/screenshots/info.png)

### Register

![Register ](./public/screenshots/register.png)

### Login 

![Login ](./public/screenshots/login.png)

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
