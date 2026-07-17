# OpenHire

OpenHire is a lightweight job board for connecting modern hiring teams with candidates. It includes a public jobs experience, applicant tracking dashboard, recruiter analytics dashboard, and a small Express/MongoDB API for jobs, applications, and recruiter postings.

## Features

- Browse and filter open roles by title, company, and job type
- View featured roles on the home page
- Applicant dashboard with application activity, saved role metrics, and status breakdowns
- Recruiter dashboard with posting metrics, applicant analytics, and pipeline charts
- REST API backed by MongoDB through Mongoose
- Responsive React interface built with TanStack Router, React Query, Tailwind CSS, Radix UI primitives, and Chart.js

## Tech Stack

- **Frontend:** React 19, Vite, TanStack Router, TanStack React Query
- **Styling:** Tailwind CSS, Radix UI, shadcn-style components, Lucide icons
- **Charts:** Chart.js and react-chartjs-2
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas or self-hosted MongoDB
- **Tooling:** TypeScript, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- MongoDB connection string

### Installation

```bash
npm install
```

Create a local environment file from the example:

```bash
cp env.example .env
```

Update `.env` with your MongoDB connection details:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
MONGODB_DB=openhire
```

For frontend development, the Vite dev server proxies `/api` requests to the API server running on port `4000`. If your API is hosted elsewhere, set:

```env
VITE_API_BASE_URL=https://your-api.example.com/api
```

### Run Locally

Start the API server:

```bash
npm run dev:server
```

In a second terminal, start the frontend:

```bash
npm run dev
```

The frontend will be available at the Vite local development URL, usually `http://127.0.0.1:5173`.

## Available Scripts

```bash
npm run dev          # Start the Vite development server
npm run dev:server   # Start the Express API server
npm run build        # Build the frontend for production
npm run preview      # Preview the production frontend build
npm run start        # Start the API server
npm run lint         # Run ESLint
npm run format       # Format the project with Prettier
```

## API Overview

The API server starts on `PORT` or `4000` by default.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/jobs` | List all jobs |
| `POST` | `/api/jobs` | Create a job |
| `GET` | `/api/jobs/:id` | Get a job by MongoDB document ID |
| `GET` | `/api/applications` | List all applications |
| `POST` | `/api/applications` | Create an application |
| `GET` | `/api/recruiter-postings` | List recruiter postings |
| `POST` | `/api/recruiter-postings` | Create a recruiter posting |

A Postman collection is included in [`postman.json`](./postman.json).

## Project Structure

```text
.
+-- api-server.js          # Express API and MongoDB models
+-- src
|   +-- components         # Shared UI and feature components
|   +-- hooks              # React hooks
|   +-- lib                # API client, utilities, theme, error helpers
|   +-- routes             # TanStack Router pages
|   +-- router.tsx         # Router setup
|   +-- server.ts          # TanStack Start server entry
|   +-- styles.css         # Global styles
+-- public                 # Static assets
+-- vite.config.ts         # Vite and dev proxy configuration
+-- env.example            # Environment variable template
```

## Data Models

OpenHire currently uses three MongoDB collections:

- **Jobs:** title, company, logo, location, type, salary, tags, posted date, applicant count, and description
- **Applications:** job ID, status, and applied date
- **Recruiter postings:** title, applicant count, view count, and status

## Production Notes

Build the frontend before deploying:

```bash
npm run build
```

In production, `api-server.js` serves static frontend files from `.output/public` when available, or `dist` as a fallback. Make sure the production environment includes `MONGODB_URI`, and optionally `MONGODB_DB`, `PORT`, and `HOST`.

## License

This project is licensed under the MIT License. See [`LICENSE`](./LICENSE) for details.
