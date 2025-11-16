# NestJS Monorepo (Gateway + Auth)

## Overview
This project is a **NestJS monorepo** with two microservices:
- **Gateway** – entry point for API requests
- **Auth** – service for authentication and user management

Both services are packaged into **Docker containers** and connected via **Docker Compose** network.

## Notes for reviewers
Some solutions in this project could be structured differently or more robustly in a **production environment**.
Since I am still learning and exploring **NestJS** for the first time, my main focus here was on **critical understanding of concepts and architecture**, rather than perfect production optimization.

---

## Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd aldia-task-nestjs-monorep
```

### 2. Add .env file in the root
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?appName=Cluster0
```

### 3. Run Docker Compose
```bash 
docker-compose up --build
```

### 4. Check running containers
```bash
docker ps
```

## Healthcheck
- Auth http://localhost:3000/health

## Example API calls (Postman / curl)
- Register a user
```bash
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "username": "test user",
  "email": "test@example.com",
  "password": "secret123"
}
```
- List users
```bash
GET http://localhost:5000/auth/users
```

## Notes

- Services communicate via Docker network (host: 'auth', port: 3000).
- Gateway is the entry point; 
- The auth service should not be called directly except for healthcheck.

## Architecture Diagram
```bash
[ Client / Postman ]
        |
        v
   [ Gateway API ]  --->  [ Auth Service ]
        |
        v
   [ MongoDB Atlas ]
```

## Dependencies
libraries:

- **@nestjs/microservices** (^11.1.9)  
  Enables building microservice-based architecture with different transport layers (TCP, Redis, NATS, etc.).  
  Used here for communication between **Gateway** and **Auth** services.

- **@nestjs/mongoose** (^11.0.3)  
  Integration with **MongoDB** using Mongoose ODM.  

- **@nestjs/terminus** (^11.0.0)  
  Health check module for NestJS.  

- **@nestjs/throttler** (^6.4.0)  
  Rate limiting module.  

- **bcrypt** (^6.0.0)  
  Library for hashing and verifying passwords securely.

- **class-validator** & **class-transformer**  
  Validation and transformation of DTOs (Data Transfer Objects).  

- **rxjs** (^7.8.1)  
  Reactive programming library.  

- **mongoose** (^8.19.4)  
  ODM for MongoDB.  

---

## 🛠️ Dev Dependencies

- **@nestjs/cli**  

- **jest / ts-jest**  

- **eslint / prettier**  

- **typescript**  
<hr>
Nemanja Antonijevic 2025
