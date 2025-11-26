import { LlmInput } from './LlmInput';
import { useEffect, useRef } from 'react';
import { LlmButton } from './LlmButton';
import { LlmResponse } from './LlmResponse';
import { useChat } from 'ai/react';

export function LlmChat() {
    const { messages, input, setInput, append, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInput('');
    }, [messages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function submitQuestion() {
        const questionToAsk = input.trim();
        if (!questionToAsk) {
            return;
        }
        append({ role: 'user', content: input });
    }

    return (
        <div className="flex h-full w-full flex-col">
            {/* Messages container - takes up available space */}
            <div className="flex flex-1 flex-col gap-2 overflow-auto p-4">
                {messages.map((message) => (
                    <LlmResponse
                        key={message.id}
                        id={message.id}
                        role={message.role}
                        text={message.content}
                        time={message.createdAt ?? new Date()}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area - pinned to bottom */}
            <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-col gap-2">
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
                </div>
            </div>
        </div>
    );
}
