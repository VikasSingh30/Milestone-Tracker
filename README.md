# BabySteps Milestone Tracker

A full-stack MERN application for tracking pregnancy milestones, community tips, and personalized recommendations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- User registration and authentication (JWT)
- Add, edit, and delete pregnancy milestones
- Community tips for each milestone
- Personalized weekly recommendations
- Responsive, modern UI with React and Tailwind CSS
- MongoDB Atlas cloud database

---

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, React Toastify, Lucide Icons, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs, express-validator
- **Database:** MongoDB Atlas

---

## Project Structure


Milestone-Tracker/ 
├── backend/ │ 
    ├── controllers/ │ 
    ├── models/ │ 
    ├── routes/ │ 
    ├── middlewares/ │ 
    ├── config/ │ 
├── .env │ 
└── server.js 
└── frontend/ 
    ├── src/ │ 
    ├── api/ │ 
    ├── components/ │ 
    ├── contexts/ │ 
    ├── pages/ │ 
    ├── styles/ │ 
    ├── utils/ │ 
└── main.jsx 
├── .env 
└── vite.config.js

---

## Setup Instructions

### Backend Setup

1. **Install dependencies:**
```
   cd backend
   npm install
   ```
2. **Configure environment variables:**
```
  MONGODB_URI=your_mongodb_atlas_connection_string
  JWT_SECRET=your_jwt_secret_key
  PORT=5000 
```
3. **Start the backend server:**
```
node [server.js](http://_vscodecontentref_/4)
```
Or for development with auto-reload:
```
npx nodemon [server.js](http://_vscodecontentref_/5)
```

### Frontend Setup

1. **Install dependencies:**
```
   cd frontend
   npm install
   ```
2. **Configure environment variables:**
```
  VITE_API_BASE_URL=http://localhost:5000/api
```
  For production, use your deployed backend URL

```
VITE_API_BASE_URL=https://milestone-tracker-qt23.onrender.com/api
```

3. **Start the frontend dev server:**
```
npm run dev
```

4. **Access the app:**
Open http://localhost:5173 in your browser.

---
## Environment Variables

### Backend (backend/.env)

MONGODB_URI — MongoDB Atlas connection string (with database name)
JWT_SECRET — Secret key for JWT signing<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> </vscode_annotation>- PORT — Port to run the backend server (default: 5000)

### Frontend (frontend/.env)

VITE_API_BASE_URL — Base URL for backend API (e.g., http://localhost:5000/api or your deployed API URL)

## API Endpoints

Auth
POST /api/auth/register — Register a new user
POST /api/auth/login — Login and receive JWT token
GET /api/auth/me — Get current user info (requires JWT)

Milestones
GET /api/milestones — Get all milestones for the logged-in user
POST /api/milestones — Add a new milestone
PUT /api/milestones/:id — Update a milestone
DELETE /api/milestones/:id — Delete a milestone

Tips
GET /api/tips/milestone/:milestoneId — Get tips for a milestone
POST /api/tips/milestone/:milestoneId — Add a tip to a milestone
POST /api/tips/:id/like — Like a tip

## License
This project is licensed under the MIT License.

Happy tracking! 👶💖