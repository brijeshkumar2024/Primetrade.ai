# Task Manager App

A simple task management application with user authentication built with Node.js and React.

## Overview

This project is a full-stack web application that allows users to:
- Register and login with JWT authentication
- Create, read, update, and delete tasks
- Mark tasks as complete
- View their own tasks

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

- **User Authentication:** Register and login with email/password
- **Role-based Access:** User and admin roles (basic setup, can be extended)
- **Task Management:** Full CRUD operations for tasks
- **JWT Tokens:** Secure API endpoints with token verification
- **Clean Architecture:** Modular backend design with controllers, routes, and middleware
- **Simple UI:** Minimalist frontend for easy task management

Focused on clean architecture, modular backend design, and realistic production practices rather than over-engineered solutions.

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
│   └── .env
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

The backend uses a few basic security steps:
- Passwords are hashed with bcrypt before saving
- JWT is used for login and protected routes
- Task routes check the token before doing anything
- Validation is kept simple so bad input gets rejected early

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

- Data now goes into MongoDB, so it stays after restarts
- Validation is basic. For production, use comprehensive validation libraries
- Add environment-specific configs for production
- Update JWT_SECRET in production
- CORS is enabled for localhost:3000 only in production, restrict further

## Future Improvements

- Add MongoDB
- Add email verification
- Add refresh tokens
- Implement more granular role-based access
- Add task categories/tags
- Add notifications
- Add unit tests

## Limitations

- Data is stored in MongoDB, but there is still no pagination on task lists
- Validation is basic and could be tightened up more
- No refresh tokens yet
- No API rate limiting yet
- Frontend is intentionally simple, so it does the job but nothing fancy
