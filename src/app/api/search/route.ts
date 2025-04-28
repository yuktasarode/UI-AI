'use server';

import { createStreamableValue } from 'ai/rsc';
import ollama from 'ollama';

export async function semanticSearch(query: string) {
  const stream = createStreamableValue('');

  (async () => {
    const response = await ollama.chat({
      model: 'llama3', // or 'llama3.1' if you've pulled it
      messages: [
        {
          role: 'user',
          content: `You are a semantic search assistant. Return the 3 most relevant matches for: "${query}", in bullet points.`,
        },
      ],
      stream: true,
    });

    for await (const part of response) {
      if (part.message?.content) {
        stream.update(part.message.content);
      }
    }

    stream.done();
  })();

  return { output: stream.value };
}
