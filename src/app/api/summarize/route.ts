'use server';

import { createStreamableValue } from 'ai/rsc';
import ollama from 'ollama';

export async function summarize(text: string) {
  const stream = createStreamableValue('');

  (async () => {
    const response = await ollama.chat({
      model: 'llama3', // or 'llama3.1' if that's what you've pulled
      messages: [
        {
          role: 'user',
          content: `Summarize the following text in a 5 sentences:\n\n${text}`,
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
