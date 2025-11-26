import { streamText, type CoreMessage } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import type { APIRoute } from 'astro';
import { systemPrompt as defaultPrompt } from '../../prompts';

const groq = createGroq({
    apiKey: import.meta.env.GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request, locals }) => {
    const { messages }: { messages: CoreMessage[] } = await request.json();

    // Try to get custom prompt from KV storage, fall back to default
    let systemPrompt = defaultPrompt;
    try {
        if (locals.runtime?.env?.PROMPT_STORE) {
            const stored =
                await locals.runtime.env.PROMPT_STORE.get('system_prompt');
            if (stored) {
                systemPrompt = stored.trim();
            }
        }
    } catch (e) {
        console.error('Failed to load prompt from KV:', e);
    }

    const result = streamText({
        model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
        messages,
        system: systemPrompt,
    });

    return result.toDataStreamResponse();
};
