import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import NoteDisplayClient from '@/components/NoteDisplayClient';

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

// Revert props type definition - standard way
export default async function NotePage({ params }: { params: { id: string } }) {
  const id = params.id; // Direct access, no need for optional chaining now

  // Runtime check remains useful
  if (typeof id !== 'string') {
    console.error("NotePage: Missing or invalid id in params", params);
    notFound();
  }

  const noteContent = await getNoteContent(id);

  if (noteContent === null) {
    // If kv.get returns null, the key doesn't exist or has expired
    notFound(); // Trigger Next.js 404 page
  }

  // Render the client component with the fetched content
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
       {/* Use the client component to display content and handle copy */}
       <NoteDisplayClient content={noteContent} />
    </div>
  );
} 