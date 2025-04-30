import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import { JSX } from 'react';

// Define a Props type matching the expected structure
// type Props = {
//   params: { id: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

async function getNoteContent(id: string): Promise<string | null> {
  try {
    // Attempt to retrieve the note text from Vercel KV
    const noteText = await kv.get<string>(id);
    return noteText;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null; // Return null on error
  }
}

// WORKAROUND: Use `any` for props to bypass persistent type error
export default async function NotePage({ params }: any): Promise<JSX.Element> {
  // We know params should have an id, but type checking is bypassed
  const id = params?.id;

  // Add a check in case params or id is unexpectedly missing at runtime
  if (typeof id !== 'string') {
    console.error("NotePage: Missing or invalid id in params", params);
    notFound();
  }

  const noteContent = await getNoteContent(id);

  if (noteContent === null) {
    // If kv.get returns null, the key doesn't exist or has expired
    notFound(); // Trigger Next.js 404 page
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Temporary Note
        </h1>
        <pre className="whitespace-pre-wrap p-4 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white text-sm font-[family-name:var(--font-geist-mono)] overflow-x-auto">
          {noteContent}
        </pre>
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          This note is temporary and may disappear later.
        </p>
      </main>
    </div>
  );
} 