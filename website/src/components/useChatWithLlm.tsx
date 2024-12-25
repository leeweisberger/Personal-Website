import { HfInference } from '@huggingface/inference';
import { useState } from 'react';
import { systemPrompt } from './prompts';

export type MessageRole = 'user' | 'llm';
type Message = {
    role: MessageRole;
    content: string;
    time: Date;
};

type Props = {
    initialMessages?: Message[];
};

export function useChatWithLlm({ initialMessages = [] }: Props = {}) {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const client = new HfInference(import.meta.env.PUBLIC_HUGGING_FACE_TOKEN);

    const chat = async (prompt: string) => {
        setLoading(true);
        setMessages((prev) => [
            ...prev,
            {
                role: 'user',
                content: prompt,
                time: new Date(),
            },
            {
                role: 'llm',
                content: 'Thinking...',
                time: new Date(),
            },
        ]);
        try {
            const stream = client.chatCompletionStream({
                model: 'meta-llama/Llama-3.2-3B-Instruct',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 500,
            });

            let latestResponse = '';
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content ?? '';
                    console.log(newContent);
                    console.log(messages);
                    latestResponse = latestResponse + newContent;
                    setMessages((prev) => [
                        ...prev.slice(0, -1),
                        {
                            ...prev.at(-1)!,
                            content: latestResponse,
                            time: new Date(),
                        },
                    ]);
                }
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                // setError(error);
                setMessages((prev) => [
                    ...prev.slice(0, -1),
                    {
                        role: 'llm',
                        content: error.message,
                        time: new Date(),
                    },
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, messages, chat };
}
