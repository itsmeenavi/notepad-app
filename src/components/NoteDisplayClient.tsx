'use client';

import toast from 'react-hot-toast';

interface NoteDisplayClientProps {
  content: string;
}

export default function NoteDisplayClient({ content }: NoteDisplayClientProps) {
  const handleCopyText = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        console.error("Failed to copy text:", err);
        toast.error('Failed to copy text.');
      });
  };

  return (
    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Temporary Note
        </h1>
        <button
          onClick={handleCopyText}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
        >
          Copy Text
        </button>
      </div>
      <pre className="whitespace-pre-wrap p-4 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white text-sm font-[family-name:var(--font-geist-mono)] overflow-x-auto">
        {content}
      </pre>
      <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        This note is temporary and may disappear later.
      </p>
    </div>
  );
} 