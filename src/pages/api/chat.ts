import { streamText, type CoreMessage } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import type { APIRoute } from 'astro';
import { systemPrompt } from '../../prompts';

const groq = createGroq({
    apiKey: import.meta.env.GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
    const { messages }: { messages: CoreMessage[] } = await request.json();

    const result = streamText({
        model: groq('llama-3.3-70b-versatile'),
        messages,
        system: systemPrompt,
    });

    return result.toDataStreamResponse();
};
