# Role-Based Authentication

This is a Role-Based Authentication system built using modern web technologies. It supports user authentication with role-based access control (RBAC) using JWT tokens.

## Technologies Used

### Frontend (React)
- **React 19** - UI framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Apollo Client** - GraphQL client
- **Redux Toolkit** - State management
- **Axios** - HTTP requests
- **Formik & Yup** - Form handling & validation
- **Tailwind CSS** - Styling

### Backend (Node.js + Express)
- **Express.js** - Backend framework
- **GraphQL** - API query language
- **Apollo Server Express** - GraphQL server
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - Authentication
- **dotenv** - Environment variable management
- **nodemailer** - Email handling
- **cors** - Cross-origin requests

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **PostgreSQL**

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Shivangi-Panigrahy/Role_based_Authentication.git
   cd Role_based_Authentication/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
   ```sh
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASS=123456789
   DB_NAME=postgres
   DB_PORT=5432
   JWT_SECRET=your-jwt-secret-key
   EMAIL_SERVICE=gmail
   EMAIL_USER=shivangipanigrahy20@gmail.com
   EMAIL_PASS=Hklwo lnii brpf tmfm
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend and GraphQL server will run on **http://localhost:4000**.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
   The frontend will be available at **http://localhost:5173**.

## Features
- User authentication (Sign-up, Login, Logout)
- Role-based access control (Admin, User, etc.)
- JWT-based authentication
- Secure password storage using bcrypt
- Email notifications using Nodemailer
- PostgreSQL database integration

## API Endpoints
**GraphQL Schema is used** for all API interactions. Queries and mutations are defined in the schema.

## Routes

### Authentication Routes
- `/customer-register` - Customer registration page
- `/admin-register` - Admin registration page
- `/admin-login` - Admin login page
- `/verify-email/:token` - Email verification page

### Protected Routes
- `/admin-dashboard` - Admin dashboard (accessible only to authenticated admins)


