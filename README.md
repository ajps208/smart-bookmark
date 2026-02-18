# Smart Bookmark App

A modern, secure bookmark management application built using Next.js (App Router), TypeScript, Supabase, and Tailwind CSS.

This project allows users to securely log in using Google OAuth and manage personal bookmarks with real-time updates. The focus of this project was not just functionality, but also clean architecture, security, and production-ready practices.

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Auth + PostgreSQL + Realtime)
- Tailwind CSS
- Vercel (Deployment Ready)

---

## ✨ Features

- Google OAuth authentication
- Private bookmarks per user
- Row Level Security (RLS) at database level
- Real-time updates using Supabase channels
- Clean SaaS-style modern UI
- Fully responsive design
- Secure environment variable handling
- Type-safe components using TypeScript

---

## 🏗️ Architecture Overview

The project follows a clean separation of concerns:

- `app/` → Routing, layout, authentication callback
- `components/` → Reusable UI components
- `lib/` → Supabase client configuration
- Supabase → Authentication, database, and real-time subscriptions

Authentication is handled client-side using Supabase Auth.

Data security is enforced at the database level using Row Level Security (RLS), ensuring true data isolation.

---

## 🔐 Security Design

Instead of filtering data on the frontend, security is enforced at the database layer.

Row Level Security policies ensure:

- Users can only SELECT their own bookmarks
- Users can only INSERT bookmarks linked to their own user_id
- Users can only DELETE their own bookmarks

This prevents data leakage even if someone manipulates frontend requests.

Security is enforced by the database itself — not by trusting the frontend.

---

## 🧠 Challenges Faced & Solutions

### 1️⃣ OAuth Redirect Handling in Next.js App Router

**Problem:**  
After Google login, session was not persisting correctly.

**Solution:**  
Implemented a dedicated `/auth/callback` route using:

```
exchangeCodeForSession()
```

This properly handles the OAuth code exchange and establishes the user session.

---

### 2️⃣ Ensuring User-Level Data Privacy

**Problem:**  
By default, Supabase tables are publicly accessible unless RLS is enabled.

**Solution:**  
Enabled Row Level Security and created policies using:

```
auth.uid() = user_id
```

This guarantees complete user-level data isolation.

---

### 3️⃣ Real-Time UI Updates

**Problem:**  
Bookmarks were not updating across browser tabs automatically.

**Solution:**  
Used Supabase Realtime subscriptions:

```
supabase.channel().on("postgres_changes")
```

Now, any INSERT or DELETE instantly updates the UI.

---

### 4️⃣ Turbopack Environment Variable Crash

**Problem:**  
Invalid environment variable format caused runtime panic errors.

**Solution:**  
Ensured proper `.env.local` configuration:

- Correct Supabase project URL
- Correct anon key
- Restarted dev server after changes
- Disabled experimental Turbopack during debugging

---

### 5️⃣ Type Safety in Supabase Responses

**Problem:**  
Un-typed responses reduce reliability and scalability.

**Solution:**  
Defined strict TypeScript interfaces for bookmark objects to ensure type safety throughout the application.

---

## 📦 Database Schema

```
bookmarks
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- title (text)
- url (text)
- created_at (timestamp)
```

Row Level Security policies bind records to authenticated users.

---

## 🖥️ How to Run Locally

1. Clone the repository

2. Create a `.env.local` file in the root directory

Add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Install dependencies

```
npm install
```

4. Run development server

```
npm run dev
```

---

## 🚀 Deployment

The project is ready for deployment on Vercel.

Steps:

- Push to GitHub
- Import repository in Vercel
- Add environment variables
- Update Supabase OAuth redirect URL
- Deploy

---

## 🎯 What This Project Demonstrates

- Secure authentication flow
- Database-level access control
- Real-time data synchronization
- Clean App Router architecture
- TypeScript-driven development
- Production-ready configuration
- Debugging and problem-solving mindset

---

## 🔮 Future Improvements

- Edit bookmark functionality
- Search and filtering
- Tagging system
- Pagination for scalability
- Optimistic UI updates
- Dark mode support
- Server-side auth handling
- Rate limiting
- API-based backend architecture

---

## 👨‍💻 Author

Ajith P S  
Full Stack Developer  


