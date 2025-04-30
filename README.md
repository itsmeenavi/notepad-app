# Temporary Note Sharing App

This is a simple Next.js application that allows users to create temporary, shareable notes. Paste any text, select an expiration time (1 hour, 2 hours, 3 hours, or 1 day), and generate a unique link. The link will display the text until the specified time expires.

This project utilizes:

*   [Next.js](https://nextjs.org) (App Router)
*   [React](https://reactjs.org)
*   [Tailwind CSS](https://tailwindcss.com)
*   [TypeScript](https://www.typescriptlang.org)
*   [@vercel/kv](https://vercel.com/docs/storage/vercel-kv) for temporary data storage
*   [nanoid](https://github.com/ai/nanoid) for generating unique note IDs

## Features

*   Paste long text content.
*   Set an expiration time for the note (1h, 2h, 3h, 1d).
*   Generate a unique, shareable link.
*   View the note content via the generated link.
*   Notes automatically expire and become inaccessible after the set time.
*   Simple and clean user interface.

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm
*   A Vercel account with Vercel KV enabled (either connected locally or for deployment).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Vercel KV Setup

This application requires Vercel KV to store the notes.

1.  **Link to a Vercel Project:** Connect your local project to a Vercel project:
    ```bash
    vercel link
    ```
2.  **Set up KV Store:** Follow the Vercel documentation to create a KV database and link it to your project.
3.  **Pull Environment Variables:** Get the necessary KV environment variables locally:
    ```bash
    vercel env pull .env.local
    ```
    This will create a `.env.local` file with variables like `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.

### Running the Development Server

Once dependencies are installed and Vercel KV is configured, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How it Works

1.  **Frontend (`src/app/page.tsx`):** Provides the UI for pasting text and selecting expiry. On submission, it calls the backend API.
2.  **Backend API (`src/app/api/create/route.ts`):**
    *   Receives the text and expiry duration.
    *   Generates a unique ID using `nanoid`.
    *   Calculates the expiration time in seconds.
    *   Stores the text in Vercel KV with the generated ID as the key and the calculated expiration time.
    *   Returns the generated ID to the frontend.
3.  **Note Display Page (`src/app/[id]/page.tsx`):**
    *   Extracts the note ID from the URL.
    *   Fetches the note content from Vercel KV using the ID.
    *   If the note exists (and hasn't expired), it displays the content.
    *   If the note doesn't exist or has expired, it displays a 404 Not Found page.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Ensure your project is linked to Vercel (`vercel link`).
2.  Ensure your Vercel KV store is linked to the project in the Vercel dashboard.
3.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
4.  Import the project into Vercel from your Git repository.

Vercel will automatically build and deploy your application, injecting the necessary KV environment variables.
