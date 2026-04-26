# Secure Authentication API (Node.js)

This project is a backend API built with Node.js, focused on implementing secure authentication practices commonly used in real-world applications. It demonstrates how to handle user registration, authentication, and access control with an emphasis on security and clarity.

## Overview

The API allows users to register, log in, and access protected resources using token-based authentication. It was designed as a practical exercise to explore how authentication systems work under the hood, including password protection and request validation.

## Key Features

* User registration with hashed passwords using bcrypt
* Authentication using JSON Web Tokens (JWT)
* Protected routes with middleware-based authorization
* Basic logging of authentication events and access attempts

## Security Considerations

* Passwords are never stored in plain text
* Tokens include expiration for session control
* Unauthorized access is properly handled with status codes
* The structure allows future implementation of protections such as rate limiting and attack detection

## Purpose

The goal of this project is to demonstrate practical backend development skills with a focus on security fundamentals. It reflects an understanding of how authentication systems are built and how common vulnerabilities can be mitigated.

## Technologies

* Node.js
* Express
* bcrypt
* jsonwebtoken
* dotenv

## Getting Started

1. Install dependencies
   npm install

2. Create a `.env` file and define:
   JWT_SECRET=your_secret_key

3. Start the server
   node server.js

## API Endpoints

* POST /register — Create a new user
* POST /login — Authenticate user and receive token
* GET /dashboard — Access protected route

---

This project is part of a continuous learning process in backend development and cybersecurity, with focus on building secure and reliable systems.
