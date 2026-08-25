# Full-Stack Authentication System

## Round 3 — Task 0

A full-stack authentication system built with **Next.js**, **NestJS**, and **PostgreSQL**.

The application supports user registration, secure login, JWT authentication, a protected home page, logout, and password reset.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* bcrypt
* JWT

## Features

* User registration with name, email, and password
* Duplicate email prevention
* Secure password hashing using bcrypt
* User login
* JWT-based authentication
* Protected home page
* Session persistence after page refresh
* Logout
* Forgot password flow
* Password reset using a time-limited reset token
* Frontend and backend integration
* Error and feedback messages

## Project Structure

```text
task0/
├── backend/
│   └── src/
├── frontend/
│   └── src/
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

* Node.js installed
* PostgreSQL installed and running
* npm installed

## Database Setup

Create a PostgreSQL database for the application.

Make sure the database connection settings in the backend `.env` file match your local PostgreSQL setup.

The backend uses TypeORM to synchronize the database schema during development.

## Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
npm run start:dev
```

The backend runs on:

```text
http://localhost:3001
```

## Frontend Setup

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

## How to Use

### 1. Register

Open:

```text
http://localhost:3000
```

Create an account using your name, email, and password.

Passwords are hashed with bcrypt before being stored in the database.

### 2. Login

Log in using the registered email and password.

A successful login returns a JWT authentication token and takes the user to the protected home page.

Invalid credentials are rejected.

### 3. Protected Home Page

The home page requires authentication.

Unauthenticated users cannot access the protected page.

The authentication state is maintained after refreshing the page.

### 4. Logout

Click the logout button to end the current session.

After logging out, the protected home page can no longer be accessed without logging in again.

### 5. Forgot Password

From the login page, select **Forgot Password?**

Enter the registered email address.

The backend generates a secure, time-limited password reset token.

For this local development project, the reset link is displayed in the backend terminal instead of being sent through an email service.

### 6. Reset Password

Open the reset link shown in the backend terminal.

Enter a new password.

After a successful reset, the old password is no longer valid and the new password can be used to log in.

## API Endpoints

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/auth/register`        | Register a new user            |
| POST   | `/auth/login`           | Log in and receive a JWT       |
| POST   | `/auth/forgot-password` | Generate a password reset link |
| POST   | `/auth/reset-password`  | Reset the user's password      |

## Security

* Passwords are never stored as plain text.
* Passwords are hashed using bcrypt.
* Login credentials are validated by the backend.
* JWT tokens are used for authentication.
* Password reset tokens are randomly generated.
* Password reset tokens are stored as SHA-256 hashes.
* Password reset tokens expire after one hour.
* Invalid or expired reset tokens are rejected.

## Notes

This project is intended for local development and assignment purposes.

The password reset link is logged to the backend terminal because no external email provider is configured.

In a production application, authentication and password-reset handling would use additional security measures such as secure HTTP-only cookies, proper database migrations, email delivery, rate limiting, and production environment configuration.
