# Temporary Note Sharing App

This is a simple Next.js application that allows users to create temporary, shareable notes. Paste any text, select an expiration time (1 hour, 2 hours, 3 hours, or 1 day, 3 days, 7 days), and generate a unique link. The link will display the text until the specified time expires.

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

