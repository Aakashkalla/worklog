# Worklog

Worklog is a simple project and task management app built to practice building a full-stack product end-to-end with modern tools.

Users can sign up, create projects, add tasks to each project, and manage everything securely with authentication and proper data ownership.

---

## Features

- User authentication (Sign up, Login, Logout)
- Create and delete projects
- Create and delete tasks inside projects
- Each user can only see and manage their own data
- Clean and minimal UI
- Server Actions (no traditional API routes)

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth (Credentials Provider)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma

---

## Why this project

This project was built to:

- Understand Next.js App Router deeply
- Learn Server Actions and server-first data fetching
- Implement authentication and authorization correctly
- Practice Prisma relations and data ownership
- Build something usable, not just demo code

---

## Project Structure (simplified)

```txt
app/
  ├─ page.tsx                # Landing page
  ├─ login/                  # Login page
  ├─ signup/                 # Signup page
  ├─ projects/               # Projects list
  │   └─ [projectId]/        # Project details & tasks
  ├─ api/auth/[...nextauth]  # NextAuth configuration

lib/
  └─ prisma.ts               # Prisma client

components/
  └─ LogoutButton.tsx

```
## Deployment

The app is designed to be deployed on Vercel with a PostgreSQL database hosted on Neon.

Environment variables are configured in the deployment platform.

## Running Locally

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd worklog
npm install
```

### 2. Create a .env file
```env
DATABASE_URL=your_neon_postgres_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Setup Database
```bash
npx prisma format
npx prisma db push
npx prisma generate
```

### 4. Start the app
```bash
npm run dev
```

## Future Improvements

- Edit projects and tasks
- Task status (completed / pending)
- Better form validation and error feedback
- Shared application header

