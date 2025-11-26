interface ImportMetaEnv {
    readonly GROQ_API_KEY: string;
    readonly PROMPT_PASSWORD?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Cloudflare KV namespace type
interface KVNamespace {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}

// Cloudflare runtime environment
interface CloudflareRuntime {
    env: {
        PROMPT_STORE?: KVNamespace;
        SESSION?: KVNamespace;
    };
}

declare namespace App {
    interface Locals {
        runtime?: CloudflareRuntime;
    }
}
