import { NextResponse } from 'next/server';

if (!process.env.NEXT_PUBLIC_WS_URL) {
  process.env.NEXT_PUBLIC_WS_URL = 'ws://localhost:8000';
}

export async function GET() {
  try {
    return NextResponse.json({ wsUrl: process.env.NEXT_PUBLIC_WS_URL });
  } catch {
    return NextResponse.json({ error: 'Failed to get WebSocket URL' }, { status: 500 });
  }
} 