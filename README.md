# FlowSense - AI-Powered UX Intelligence Platform

FlowSense is a production-grade SaaS platform that helps designers, developers, founders, and product teams identify usability issues, accessibility violations, visual hierarchy problems, and conversion bottlenecks using AI.

## 🏗️ Architecture

FlowSense uses a decoupled architecture for maximum scalability and type-safety.

```mermaid
graph TD
    %% Frontend Layer
    subgraph "Frontend (Next.js 15 on Vercel)"
        UI[React App Router]
        Store[Zustand State]
        PDF[PDF Export]
        NextAPI[Next.js API Routes]
    end

    %% External Services
    Auth[Clerk Auth]
    CDN[Cloudinary]
    DB[(PostgreSQL - Neon/Supabase)]

    %% Backend Layer
    subgraph "AI Microservice (FastAPI on Railway)"
        FastAPI[FastAPI Router]
        Gemini[Google Gemini 2.5 Flash]
        Pydantic[Pydantic JSON Validation]
    end

    %% Flow
    User([User]) -->|Upload Image| UI
    UI <--> Auth
    UI -->|Unsigned Upload| CDN
    UI -->|POST Image URL| FastAPI
    FastAPI <-->|Analyze| Gemini
    FastAPI -->|Return UXReport JSON| UI
    UI -->|POST JSON| NextAPI
    NextAPI -->|Prisma ORM| DB
    UI -->|Download| PDF
```

## 🔐 Environment Variables

To run the application locally or in production, you must configure the following environment variables.

### Frontend (`frontend/.env.local`)
```env
# Database
DATABASE_URL="postgresql://user:password@hostname:5432/flowsense"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Cloudinary Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_unsigned_preset"
```

### Backend (`backend/.env`)
```env
# Google AI Studio
GEMINI_API_KEY="AIzaSy..."
```

## 🛠️ PostgreSQL Migration Instructions

While SQLite was used for rapid local prototyping, the production schema is strictly PostgreSQL.

1. Create a free Postgres database on **Supabase** or **Neon**.
2. Copy the connection string to your `DATABASE_URL` in `frontend/.env.local`.
3. In the `frontend` directory, apply the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
*(Note: If you wish to use SQLite locally, temporarily change `provider = "postgresql"` to `provider = "sqlite"` in `schema.prisma`, and update `url: process.env["DATABASE_URL"]` to `url: "file:./dev.db"` in `prisma.config.ts`.)*

## 🚀 Deployment Plan

### 1. Database (Neon or Supabase)
- Create a new project and retrieve the connection string. Ensure connection pooling (PgBouncer) is disabled for `prisma db push` or append `?pgbouncer=true` if required by your Prisma Client configuration.

### 2. AI Microservice (Railway or Render)
- Connect your GitHub repository to Railway.
- Create a new service pointing to the `backend/` directory.
- Add `GEMINI_API_KEY` to the environment variables.
- Railway will automatically detect the `requirements.txt` and `main.py` (ensure you set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`).

### 3. Frontend (Vercel)
- Connect your GitHub repository to Vercel.
- Point the Root Directory to `frontend/`.
- Add all frontend environment variables (Clerk, Cloudinary, Database URL).
- Deploy. Vercel will automatically detect Next.js and build the project.

---
*Version 1 Finalized - Designed for enterprise-grade UX analysis.*
