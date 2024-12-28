import { LlmInput } from './LlmInput';
import { useEffect } from 'react';
import { LlmButton } from './LlmButton';
import { LlmResponse } from './LlmResponse';
import { useChat } from 'ai/react';

export function LlmChat() {
    const { messages, input, setInput, append, isLoading } = useChat();

    useEffect(() => {
        setInput('');
    }, [messages]);

    function submitQuestion() {
        const questionToAsk = input.trim();
        if (!questionToAsk) {
            return;
        }
        append({ role: 'user', content: input });
    }

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <LlmInput
                value={input}
                onChange={setInput}
                onSubmit={submitQuestion}
                disabled={isLoading}
            />
            <LlmButton
                onClick={() => {
                    submitQuestion();
                }}
                disabled={isLoading || !input.trim()}
            >
                Ask
            </LlmButton>
            <div className="flex flex-col gap-2 overflow-auto">
                {messages.map((message) => (
                    <LlmResponse
                        key={message.id}
                        id={message.id}
                        role={message.role === 'user' ? 'user' : 'llm'}
                        text={message.content}
                        time={message.createdAt ?? new Date()}
                    />
                ))}
            </div>
        </div>
    );
}
