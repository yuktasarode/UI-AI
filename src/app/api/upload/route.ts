'use server'
import { NextRequest, NextResponse } from 'next/server';
import { addToChroma } from '@/utils/chroma';

export async function POST(req: NextRequest) {
  const { content } = await req.json(); // for now: plain text content
  console.log("Content",content)
  const chunks = content.match(/[\s\S]{1,300}/g) || [];
  const count = await addToChroma(chunks);

  return NextResponse.json({ success: true, count: chunks.length });
}
