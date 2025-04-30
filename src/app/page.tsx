"use client";

import Image from "next/image";
import { useState } from "react"; // We'll need state later

export default function Home() {
  // Placeholder state and functions - we'll implement these later
  const [text, setText] = useState("");
  const [expiry, setExpiry] = useState("1h"); // Default expiry
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setGeneratedLink("");

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, expiry }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create note');
      }

      const { id } = await response.json();
      const newLink = `${window.location.origin}/${id}`;
      setGeneratedLink(newLink);

    } catch (err: any) {
        console.error("Submission error:", err);
        setError(err.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
        .then(() => alert("Link copied!")) // Simple feedback
        .catch(err => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create a Temporary Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="textContent" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Paste your text here:
            </label>
            <textarea
              id="textContent"
              rows={10}
              className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your long text goes here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Expires in:
            </label>
            <select
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="1h">1 Hour</option>
              <option value="2h">2 Hours</option>
              <option value="3h">3 Hours</option>
              <option value="1d">1 Day</option>
              {/* Add more options if needed */}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !text}
            className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? "Generating..." : "Create Note Link"}
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        )}

        {generatedLink && (
          <div className="p-4 mt-6 space-y-2 text-center bg-green-100 rounded-lg dark:bg-green-900">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Your temporary link:
            </p>
            <div className="flex items-center justify-center gap-2">
               <input
                 type="text"
                 readOnly
                 value={generatedLink}
                 className="flex-grow p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                 onClick={(e) => (e.target as HTMLInputElement).select()} // Select text on click
               />
              <button
                onClick={handleCopy}
                className="p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                aria-label="Copy link"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
