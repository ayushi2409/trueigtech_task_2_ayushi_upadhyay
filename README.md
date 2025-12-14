# trueigtech_task_2_ayushi_upadhyay
# TrueIGTech Task 2 – Full Stack Application

This project is a full-stack web application developed as part of **TrueIGTech Task 2**.  
It consists of a **FastAPI backend** and a **Vite + TypeScript frontend**, focusing on authentication, API integration, and real-world backend–frontend communication.

The project reflects practical development scenarios such as handling CORS, request validation, and integrating frontend forms with backend APIs.

---

## Tech Stack

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite / PostgreSQL (configurable)
- JWT Authentication
- Pydantic

### Frontend
- Vite
- TypeScript
- HTML, CSS
- Axios

---

## Features

- User Signup
- User Login
- Password hashing
- JWT-based authentication
- Role-based user handling
- REST API integration
- Proper CORS configuration

---

## Project Structure

### Backend
```
app/
├── auth/
│   └── auth.py
├── core/
│   └── security.py
├── database.py
├── models/
│   └── user.py
├── schemas/
│   └── user.py
└── main.py
```

### Frontend
```
test-main/
├── client/
│   ├── index.html
│   └── src/
├── package.json
└── vite.config.ts
```

---

## How to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/ayushi2409/trueigtech_task_2_ayushi_upadhyay.git
cd trueigtech_task_2_ayushi_upadhyay
```

---

## Backend Setup

### 2. Create virtual environment (optional)
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run backend server
```bash
uvicorn main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

## Frontend Setup

### 5. Go to frontend folder
```bash
cd test-main
```

### 6. Install dependencies
```bash
npm install
```

### 7. Start frontend
```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## API Endpoints

### Authentication
- `POST /auth/signup` – Register a new user
- `POST /auth/login` – Authenticate user and return JWT token

---

## Notes

- Signup and login routes are public.
- Other protected routes can use JWT authentication.
- CORS middleware is enabled to allow frontend requests.
- Request validation is handled using Pydantic schemas.

---

## Issues Faced During Development

- CORS preflight errors were resolved using FastAPI CORSMiddleware.
- `400 Bad Request` on OPTIONS was fixed by switching from query parameters to request body schemas.
- Frontend must be served using Vite (`npm run dev`) instead of opening HTML files directly.

---

## Author

**Ayushi Upadhyay**  
B.Tech (Computer Science Engineering)


