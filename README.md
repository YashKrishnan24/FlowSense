<div align="center">
  <h1> FlowSense</h1>
  <p><strong>AI-Powered UX Intelligence Platform</strong></p>
  <p>Elevate your digital products with automated usability, accessibility, and conversion diagnostics.</p>
</div>

<br />

## Overview

**FlowSense** is a production-grade SaaS platform designed to act as an AI co-pilot for your UX/UI design process. It empowers designers, developers, founders, and product teams to instantly identify usability issues, accessibility violations, visual hierarchy problems, and conversion bottlenecks by simply analyzing UI screenshots.

##  Key Features

-  **AI-Powered Diagnostics:** Leverages Google Gemini 2.5 Flash to deeply analyze your interface and provide actionable UX insights.
-  **Accessibility & Usability Audits:** Automatically detects potential WCAG violations and structural design flaws.
-  **Exportable PDF Reports:** Generate and download beautiful, structured UX audit reports in a single click.
-  **Secure & Private:** Enterprise-grade security with Clerk authentication and PostgreSQL-backed isolated workspaces.
-  **Lightning Fast:** Built on a modern decoupled architecture using Next.js 15 and FastAPI for maximum performance.

##  Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling & UI:** Tailwind CSS, shadcn/ui, Framer Motion
- **State Management:** Zustand
- **Authentication:** Clerk Auth
- **Asset Storage:** Cloudinary

### Backend & AI
- **Microservice Engine:** FastAPI (Python)
- **AI Model:** Google Gemini 2.5 Flash
- **Data Validation:** Pydantic

### Database & ORM
- **Database:** PostgreSQL (Neon / Supabase)
- **ORM:** Prisma

##  System Architecture

Our decoupled architecture ensures maximum scalability, separation of concerns, and end-to-end type safety.

```mermaid
graph TD
    %% Frontend Layer
    subgraph "Frontend (Next.js 15 on Vercel)"
        UI[React App Router]
        Store[Zustand State]
        PDF[PDF Export Module]
        NextAPI[Next.js API Routes]
    end

    %% External Services
    Auth[Clerk Auth]
    CDN[Cloudinary]
    DB[(PostgreSQL)]

    %% Backend Layer
    subgraph "AI Microservice (FastAPI on Railway)"
        FastAPI[FastAPI Router]
        Gemini[Google Gemini 2.5 Flash]
        Pydantic[Pydantic Validation]
    end

    %% Flow
    User([User]) -->|Upload Screenshot| UI
    UI <--> Auth
    UI -->|Unsigned Upload| CDN
    UI -->|POST Image URL| FastAPI
    FastAPI <-->|Analyze Image| Gemini
    FastAPI -->|Return UX Report JSON| UI
    UI -->|Save Report via Next API| NextAPI
    NextAPI -->|Prisma ORM| DB
    UI -->|Download Report| PDF
```

##  Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js 18.x or later
- Python 3.9 or later
- PostgreSQL database (local or cloud-based like Neon/Supabase)

### 1. Clone the repository
```bash
git clone https://github.com/YashKrishnan24/FlowSense.git
cd FlowSense
```

### 2. Frontend Setup
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

Set up your `.env.local` file:
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

Apply database migrations:
```bash
npx prisma generate
npx prisma db push
```
*(Note: If using SQLite locally instead of PostgreSQL, temporarily change `provider = "postgresql"` to `provider = "sqlite"` in `schema.prisma`, and update the `url` config.)*

Start the frontend development server:
```bash
npm run dev
```

### 3. Backend Setup
Navigate to the `backend` directory and set up the Python environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

Set up your `.env` file:
```env
GEMINI_API_KEY="your_google_gemini_api_key"
```

Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

##  Deployment

FlowSense is designed for easy deployment across modern cloud providers:
- **Frontend:** Vercel (Auto-detects Next.js)
- **Backend Microservice:** Railway or Render (Add `GEMINI_API_KEY` to environment variables)
- **Database:** Neon or Supabase (Ensure connection pooling is disabled for `prisma db push`, or append `?pgbouncer=true` if required by your setup)
