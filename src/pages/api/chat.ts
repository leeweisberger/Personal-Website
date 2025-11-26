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
        model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
        messages,
        system: systemPrompt,
    });

    return result.toDataStreamResponse();
};
