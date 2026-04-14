# Task Manager App

A full-stack web app for managing tasks. Users can sign up, log in, and create/update/delete their tasks.

## Overview

This is a task management app built with Node.js + React. It includes:
- User registration and login (JWT authentication)
- Create, read, update, delete tasks
- Mark tasks as complete
- Each user only sees their own tasks

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- CSS for styling

## Features

- User registration and login with JWT authentication
- Create, update, and delete tasks
- Each user only sees their own tasks
- Basic admin role (can list all tasks)
- Password hashing with bcryptjs
- Token-based authorization on protected routes
- Simple, clean backend structure (controllers, models, routes)

## Folder Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── task.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── roleCheck.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── task.routes.js
│   │   ├── utils/
│   │   │   ├── password.js
│   │   │   └── tokens.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── docs/
│   └── postman_collection.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── TaskItem.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   └── taskitem.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
├── .env.example
└── README.md
```

## Setup & Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=
JWT_EXPIRE=24h
BCRYPT_ROUNDS=10
```

4. Run development server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=http://localhost:5000/api/v1
```

4. Start development server:
```bash
npm start
```

App will open on `http://localhost:3000`

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/register` - Register new user
- **POST** `/api/v1/auth/login` - User login
- **GET** `/api/v1/auth/profile` - Get current user profile (protected)

### Tasks

- **GET** `/api/v1/tasks` - Get all user tasks (protected)
- **POST** `/api/v1/tasks` - Create new task (protected)
- **GET** `/api/v1/tasks/:id` - Get task by ID (protected)
- **PUT** `/api/v1/tasks/:id` - Update task (protected)
- **DELETE** `/api/v1/tasks/:id` - Delete task (protected)
- **GET** `/api/v1/tasks/admin/all` - Get all tasks (admin only)

## API Documentation

A simple Postman collection is included at [docs/postman_collection.json](docs/postman_collection.json).

It has request examples for:
- Register
- Login
- Create Task
- Get Tasks
- Update Task
- Delete Task

The collection already includes the basic headers and example JSON bodies, so it should be easy to import and test.

## Security

Some basic security stuff I added:
- Passwords get hashed with bcrypt (10 rounds) before saving
- JWT tokens for authentication on protected endpoints
- Validators for email and password format
- Tasks are filtered by user ID so you can't see other people's tasks

Not production-ready yet, but solid for a learning project.

## Scalability Notes

This project is small right now, but it can grow without a full rewrite:
- The backend can be split into smaller services later if needed
- Redis could be added for caching common reads
- Nginx can sit in front for load balancing
- MongoDB indexes can help once the task count gets bigger

## Usage Examples

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Task (with token)
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Learn React",
    "description": "Build a simple todo app"
  }'
```

## Notes

- Data persists in MongoDB (no more losing everything on restart)
- Validation is pretty basic—for real projects you'd use something more strict
- Need to set a good JWT_SECRET in production
- CORS is set up for the frontend locally

## Future Improvements

- Add pagination for large task lists
- Add email verification on signup
- Refresh tokens for better security
- More granular permissions
- Task categories or tags
- Search functionality
- Unit tests and integration tests

## Limitations

- No pagination on task lists yet
- Validation is basic
- No refresh tokens (just one token for 24 hours)
- No rate limiting on the API
- Frontend is simple (intentionally)
