import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid'; // For generating unique IDs
import { NextRequest, NextResponse } from 'next/server';

// Helper function to convert duration string (e.g., "1h", "2h", "1d") to seconds
function durationToSeconds(duration: string): number {
  const unit = duration.slice(-1);
  const value = parseInt(duration.slice(0, -1), 10);

  if (isNaN(value)) {
    return 3600; // Default to 1 hour if parsing fails
  }

  switch (unit) {
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    // Add more cases like 'm' for minutes if needed
    default:
      return 3600; // Default to 1 hour for unknown units
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, expiry } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text content is required.' }, { status: 400 });
    }

    if (!expiry || typeof expiry !== 'string') {
      return NextResponse.json({ error: 'Expiry duration is required.' }, { status: 400 });
    }

    const noteId = nanoid(10); // Generate a 10-character unique ID
    const expirationInSeconds = durationToSeconds(expiry);

    // Store the text in Vercel KV with expiration
    await kv.set(noteId, text, { ex: expirationInSeconds });

    return NextResponse.json({ id: noteId }, { status: 200 });

  } catch (error) {
    console.error('Error creating note:', error);
    // Check if error is an instance of Error to access message property safely
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: 'Failed to create note.', details: errorMessage }, { status: 500 });
  }
} 