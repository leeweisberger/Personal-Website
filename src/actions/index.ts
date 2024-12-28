import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
    apiKey: import.meta.env.GROQ_API_KEY,
});

export const server = {
    chat: defineAction({
        input: z.object({
            prompt: z.string(),
        }),
        handler: async (input) => {
            const result = streamText({
                model: groq('llama-3.3-70b-versatile'),
                prompt: input.prompt,
            });

            return result.toDataStreamResponse();
        },
    }),
};
