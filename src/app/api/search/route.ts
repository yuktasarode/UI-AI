'use server'
import { NextRequest } from 'next/server';
import ollama from 'ollama';
import { vectorStore } from '@/utils/vector-store';
import { cosineSimilarity } from '@/utils/vector-utils';

export async function POST(req: NextRequest) {
  const { query, useRAG = false } = await req.json();

  let context = '';
  console.log(useRAG)

  if (useRAG && vectorStore.length > 0) {
    const res = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: query,
      }),
    });
    const { embedding: queryEmbedding } = await res.json();

    const topChunks = vectorStore
      .map(item => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

      console.log('🧠 TOP CHUNKS:', topChunks.map(c => c.chunk).join('\n---\n'));

    context = topChunks.map(chunk => chunk.chunk).join('\n\n');
  }

  

  const prompt = useRAG
    ? `Use the following context to answer the question:\n\n${context}\n\nQuestion: "${query}"`
    : `You are a semantic search assistant. Return the 3 most relevant matches for: "${query}", in bullet points.`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });

      for await (const part of response) {
        if (part.message?.content) {
          controller.enqueue(encoder.encode(part.message.content));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
