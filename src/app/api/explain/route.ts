'use server';

import { createStreamableValue } from 'ai/rsc';
import ollama from 'ollama';

export async function generate(prompt: string) {
  const stream = createStreamableValue('');

  (async () => {
    const response = await ollama.chat({
      model: 'llama3', // or 'llama3.1' if that's what you pulled
      messages: [
        {
          role: 'user',
          content: `Explain this like I'm 5 in 20 words: ${prompt}`,
        },
      ],
      stream: true, // enable streaming
    });

    for await (const part of response) {
      if (part.message?.content) {
        stream.update(part.message.content);
      }
    }

    stream.done(); // close stream
  })();

  return { output: stream.value };
}


// import { streamText } from 'ai';
// import { openai } from '@ai-sdk/openai';
// import { createStreamableValue } from 'ai/rsc';

// export async function generate(prompt: string) {
//   const stream = createStreamableValue('');

//   (async () => {
//     const { textStream } = await streamText({
//       model: openai('gpt-4o'),
//       prompt: `Explain this like I'm 5: ${prompt}`,
//     });

//     for await (const chunk of textStream) {
//       stream.update(chunk); // Send updates to client
//     }

//     stream.done(); // End the stream
//   })();

//   return { output: stream.value };
// }

// import { createStreamableValue } from 'ai/rsc';

// export async function generate(prompt: string) {
//   const stream = createStreamableValue('');

//   // Simulate streamed data in chunks
//   const mockChunks = [
//     `“${prompt}” is like a fun game... `,
//     'It helps computers learn from data. ',
//     'Imagine teaching a robot with examples!',
//   ];

//   (async () => {
//     for (const chunk of mockChunks) {
//       await new Promise(resolve => setTimeout(resolve, 300)); // simulate delay
//       stream.update(chunk);
//     }
//     stream.done();
//   })();

//   return { output: stream.value };
// }
