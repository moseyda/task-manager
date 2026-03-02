# TaskoraFlow

A modern, production-ready task management web application built with a focus on speed, security, and premium aesthetics. 

## 🚀 Features

- **Secure Authentication**: Built-in email/password authentication with secure HTTP-only sessions.
- **Dynamic Dashboard**: A beautiful landing page providing live productivity statistics and recent task overviews.
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete) for tasks with prioritization, due dates, and completion tracking.
- **Advanced Filtering**: Quickly sort and filter tasks by priority or completion status.
- **Row-Level Security**: Backend implementation guarantees users can uniquely only access and manage their own data.
- **Premium UI/UX**: Designed with modern aesthetics including glassmorphism, responsive layouts, a collapsible sidebar, and micro-animations.
- **Dark Mode Support**: Seamlessly toggle between dark and light themes.

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) paired with Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend as a Service**: [Appwrite](https://appwrite.io/) (Auth, Databases)
- **Data Fetching & State**: [TanStack React Query](https://tanstack.com/query)
- **Form Handling**: React Hook Form with Zod validation
- **Date Formatting**: `date-fns`

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn
- An Appwrite Cloud account (or self-hosted Appwrite instance)

## 📦 Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory of your project. You will need to set up an Appwrite project and add the following credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_secret_api_key

NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_TASKS_TABLE_ID=your_tasks_table_id
NEXT_PUBLIC_APPWRITE_SETTINGS_TABLE_ID=your_settings_table_id
```

### 3. Appwrite Database Setup

Inside your Appwrite project, you must create a Database and add two Tables:

1.  **tasks**
    *   Attributes required: `title` (String), `description` (String), `status` (String), `priority` (String), `endDate` (Datetime), `userId` (String), `completed` (Boolean).
    *   Permissions: Add the `Users` role and grant `Read` access. (Create, Update, and Delete are handled uniquely by Server Actions using Row-Level Security).
    *   Settings: Ensure **Row security** is Enabled.

2.  **settings**
    *   Attributes required: `userId` (String), `theme` (String), `timezone` (String), `notificationsEnabled` (Boolean).
    *   Permissions: Add the `Users` role and grant `Read` access.
    *   Settings: Ensure **Row security** is Enabled.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically prompt you to log in or register a new account.

## 🏗️ Architecture

- **Next.js Server Actions**: Utilized extensively in `src/lib/*-actions.ts` to securely bridge the browser interface and the node-appwrite SDK. This prevents exposure of sensitive logic and solves client-side authorization constraints.
- **Client Cache**: React Query seamlessly intercepts and caches server action results on the browser to provide a snappy, instant-feeling application UI.
- **Middleware Protection**: Unauthenticated users are aggressively prevented from viewing protected routes (`/`, `/tasks`, `/settings`) by Edge Middleware.
