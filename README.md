# SocialMediaApp

A full-stack social media app with:
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript + MongoDB + Socket.IO

## What You Need Before Running

Install these tools:
- Node.js 18+ (recommended: latest LTS)
- npm 9+
- MongoDB database (local or Atlas)
- Cloudinary account (for media uploads)
- Git

## Project Structure

- frontend: React client app
- backend: API server + Socket.IO server

## 1) Backend Setup

Open terminal in backend folder:

  cd backend
  npm install

Create a file named .env inside backend folder and add:

  PORT=8000
  CLIENT_URL=http://localhost:5173
  MONGO_URI=your_mongodb_connection_string
  ACCESS_SECRET=your_access_jwt_secret
  REFRESH_SECRET=your_refresh_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  NODE_ENV=development

Run backend in development mode:

  npm run dev

Build backend:

  npm run build

## 2) Frontend Setup

Open another terminal in frontend folder:

  cd frontend
  npm install

Run frontend in development mode:

  npm run dev

Build frontend:

  npm run build

Preview frontend build:

  npm run preview

## 3) App URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## How Authentication Works

- Backend uses HttpOnly cookies for auth
- Frontend sends cookies with requests (withCredentials enabled)
- Do not store secrets in frontend files

## Important Security Notes

- Never commit .env files to git
- Rotate secrets immediately if they were ever pushed
- Add these patterns to .gitignore:

  .env
  .env.*
  **/.env
  **/.env.*

## Common Issues

1. CORS error
- Make sure CLIENT_URL in backend .env is exactly your frontend URL.

2. MongoDB connection error
- Check MONGO_URI and make sure your database is reachable.

3. Cloudinary upload fails
- Verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.

4. Auth sends you to login on refresh
- Make sure you are using the latest frontend code where auth waits for current user loading.

## Scripts Quick Reference

Backend:
- npm run dev
- npm run build

Frontend:
- npm run dev
- npm run build
- npm run lint
- npm run preview

## Team Onboarding

When a new developer joins, they should:
1. Clone the repo
2. Create backend/.env from the variables above
3. Install dependencies in backend and frontend
4. Start backend first, then frontend
