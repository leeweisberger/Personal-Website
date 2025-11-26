import { streamText, type CoreMessage } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import type { APIRoute } from 'astro';
import { systemPrompt as defaultPrompt } from '../../prompts';

const groq = createGroq({
    apiKey: import.meta.env.GROQ_API_KEY,
});

// Simple in-memory cache for the system prompt
let cachedPrompt: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes in milliseconds

/**
 * Get the system prompt with caching
 * Fetches from KV storage with 3-minute TTL cache, falls back to default
 */
async function getSystemPrompt(
    kvStore?: KVNamespace,
): Promise<string> {
    const now = Date.now();

    // Check if cache is valid
    if (cachedPrompt && now - cacheTimestamp < CACHE_TTL) {
        return cachedPrompt;
    }

    // Cache miss or expired - try to fetch from KV
    try {
        if (kvStore) {
            const stored = await kvStore.get('system_prompt');
            if (stored) {
                const prompt = stored.trim();
                // Update cache
                cachedPrompt = prompt;
                cacheTimestamp = now;
                return prompt;
            }
        }
    } catch (e) {
        console.error('Failed to load prompt from KV:', e);
    }

    // Fall back to default prompt
    return defaultPrompt;
}

export const POST: APIRoute = async ({ request, locals }) => {
    const { messages }: { messages: CoreMessage[] } = await request.json();

    const systemPrompt = await getSystemPrompt(
        locals.runtime?.env?.PROMPT_STORE,
    );

    const result = streamText({
        model: groq('meta-llama/llama-4-maverick-17b-128e-instruct'),
        messages,
        system: systemPrompt,
    });

    return result.toDataStreamResponse();
};
