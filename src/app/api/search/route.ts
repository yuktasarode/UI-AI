'use server'
import { NextRequest } from 'next/server';
import ollama from 'ollama';
import { queryChroma } from '@/utils/chroma';

export async function POST(req: NextRequest) {
  const { query, useRAG = false } = await req.json();

  let context = '';
  console.log(useRAG)


  if (useRAG) {
    try {
      const topChunks = await queryChroma(query, 3);
      console.log('🧠 TOP CHUNKS (Chroma):', topChunks.join('\n---\n'));
      context = topChunks.join('\n\n');
    } catch (err: any) {
      return new Response('Error: ' + err.message, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
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
