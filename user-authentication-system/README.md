# 🔐 User Authentication System

A modern, secure user authentication system built with the MERN stack, featuring a beautiful UI and robust backend security.

## ✨ Features

- **User Registration** - Secure account creation with password validation
- **User Login** - JWT-based authentication
- **Protected Routes** - Secure dashboard access
- **Password Security** - Bcrypt hashing for passwords
- **Modern UI** - Professional, responsive design with Tailwind CSS
- **Real-time Validation** - Password strength indicator
- **Error Handling** - Comprehensive error messages

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcryptjs
- CORS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd user-authentication-system
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

**Example for MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## 🎯 Running the Application

### Start the Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start the Client
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173` (or similar Vite port)

## 📁 Project Structure

```
user-authentication-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── authService.jsx
│   │   └── App.jsx
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routers/
│   │   └── authRoutes.js
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/dashboard` - Get dashboard data (Protected)
  - Requires: `Authorization: Bearer <token>`

## 🔒 Security Features

- Password hashing with Bcrypt (10 rounds)
- JWT token-based authentication
- Protected API routes
- CORS enabled
- Input validation
- Secure password storage

## 🎨 UI Features

- Modern gradient designs
- Responsive layout
- Password visibility toggle
- Real-time password strength indicator
- Loading states
- Error handling with user-friendly messages
- Smooth animations and transitions

## 📝 Usage

1. **Register**: Navigate to `/register` and create an account
2. **Login**: Use your credentials at `/login`
3. **Dashboard**: Access protected dashboard after login
4. **Logout**: Click logout button to end session


