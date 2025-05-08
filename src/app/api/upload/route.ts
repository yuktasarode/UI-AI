// src/app/api/upload/route.ts
'use server'
import { NextRequest, NextResponse } from 'next/server';
import { vectorStore } from '@/utils/vector-store';

export async function POST(req: NextRequest) {
  const { content } = await req.json(); // for now: plain text content
  console.log("Content",content)
  const chunks = content.match(/[\s\S]{1,300}/g) || [];

  for (const chunk of chunks) {
    console.log(chunk)
    const res = await fetch('http://localhost:11434/api/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'nomic-embed-text', // ✅ Correct model for embeddings
          prompt: chunk,
        }),
      });
    const { embedding } = await res.json();
    vectorStore.push({ id: crypto.randomUUID(), embedding, chunk });
  }

  console.log('[VECTOR STORE]', vectorStore.map(v => ({
    id: v.id,
    chunk: v.chunk.slice(0, 100), // limit preview
    embeddingLength: v.embedding.length
  })));

  return NextResponse.json({ success: true, count: chunks.length });
}
