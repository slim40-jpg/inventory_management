# Inventory Management System

A full-stack web application for managing inventory, stock, depots, and user accounts. Built with Express.js backend and React frontend.

## 🚀 Features

- **User Authentication**: Register, login, and logout with JWT tokens
- **Inventory Management**: Manage stock items and track quantities
- **Depot Management**: Organize inventory across multiple depots
- **Stock Movements**: Record material movements and transactions
- **Reservations**: Handle item reservations
- **User Management**: Admin panel for managing users
- **Dashboard**: Real-time overview of inventory status

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API server
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication & authorization
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin request handling
- **Dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **React Router** - Navigation & routing
- **Axios** - HTTP client for API calls
- **React Scripts** - Build tooling (Create React App)

## 📁 Project Structure

```
inventory_management/
├── backend/                    # Express.js server
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers (Auth, Stock, User)
│   ├── models/               # MongoDB schemas (User, Stock, Depot, etc.)
│   ├── routes/               # API endpoints (Auth, Stock, User)
│   ├── middleware/           # Authentication middleware
│   ├── server.js             # Main server file
│   ├── env.js                # Environment config
│   ├── package.json
│   └── .env                  # Environment variables (create this)
│
└── front/                     # React application
    ├── public/               # Static files
    ├── src/
    │   ├── App.js           # Main component
    │   ├── index.js         # Entry point
    │   ├── login.js         # Login page
    │   ├── register.js      # Registration page
    │   ├── dashboard.js     # User dashboard
    │   ├── materiel.js      # Material management
    │   ├── movements.js     # Stock movements
    │   ├── reservations.js  # Reservations
    │   ├── depots.js        # Depot management
    │   ├── admin.js         # Admin dashboard
    │   ├── user_management.js # User management
    │   └── (CSS files)
    ├── build/               # Production build (generated)
    └── package.json
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (either local or cloud via MongoDB Atlas)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## ⚙️ Installation & Setup

### 1. Clone/Extract the Project
```bash
cd inventory_management
```

### 2. Backend Setup

Navigate to backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

**Example for MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### 3. Frontend Setup

Navigate to frontend directory and install dependencies:
```bash
cd ../front
npm install
```

## 🎯 Running the Application

### Development Mode (Recommended)

**Terminal 1 - Backend (runs on port 5000):**
```bash
cd backend
npm run dev
```
- Uses `nodemon` for auto-reload on file changes
- API available at: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

**Terminal 2 - Frontend (runs on port 3000):**
```bash
cd front
npm start
```
- React development server with hot reload
- Opens automatically at: `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend (build first):**
```bash
cd front
npm run build
npm start  # (requires global serve package: npm install -g serve)
```

Or serve the built frontend from the backend by adding static file serving to `server.js`.

## 🔌 API Endpoints

### Authentication
- `POST /api/AuthRoute/login` - User login
- `POST /api/AuthRoute/register` - User registration
- `POST /api/AuthRoute/logout` - User logout

### Stock Management
- `GET/POST /api/StockRoute/...` - Stock operations

### User Management
- `GET/POST /api/UserRoute/...` - User operations

### Health Check
- `GET /api/health` - Server status

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🧪 Testing the API

Use tools like **Postman**, **Insomnia**, or **VS Code REST Client** to test API endpoints.

Example login request:
```http
POST http://localhost:5000/api/AuthRoute/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## 🚨 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use, change the PORT in `.env` or use:
```bash
# Find and kill process on port 5000
Get-Process | Where-Object {$_.Name -like "*node*"} | Stop-Process -Force
```

### MongoDB Connection Error
- Verify your MongoDB URI in `.env`
- Check MongoDB Atlas network access settings (whitelist your IP)
- Ensure database cluster is running

### Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### CORS Errors
Check that `CLIENT_URL` in backend `.env` matches your frontend URL (usually `http://localhost:3000` in development).

## 📝 Notes

- JWT tokens are required for protected routes (Stock, User management)
- Passwords are hashed using bcrypt before storage
- The frontend has a built build folder — you can serve it from the backend for single-port deployment
- Database seeding script available at `backend/seedDatabase.js`

## 🤝 Support

For issues or questions, check:
1. Terminal error messages
2. Browser DevTools (F12) → Console tab
3. Backend logs in terminal
4. MongoDB connection string format

---

## 👥 Authors

This project was developed by students from **Sup'Com** :

- **Slim Selmi**
- **Khalil Krifa**
- **Aziz Karray**
- **Abdelkader Ben Hmida**

**Project Version**: 1.0.0  
**Last Updated**: December 2024
