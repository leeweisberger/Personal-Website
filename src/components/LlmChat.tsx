import { LlmInput } from './LlmInput';
import { useEffect, useRef } from 'react';
import { LlmButton } from './LlmButton';
import { LlmResponse } from './LlmResponse';
import { EmptyState } from './EmptyState';
import { LoadingIndicator } from './LoadingIndicator';
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

    function submitQuestion(question?: string) {
        const questionToAsk = question?.trim() || input.trim();
        if (!questionToAsk) {
            return;
        }
        append({ role: 'user', content: questionToAsk });
    }

    return (
        <div className="flex h-full w-full flex-col">
            {/* Messages container - takes up available space */}
            <div className="flex flex-1 flex-col gap-3 overflow-auto p-4">
                {messages.length === 0 ? (
                    <EmptyState onSampleQuestion={submitQuestion} />
                ) : (
                    <>
                        {messages.map((message) => (
                            <LlmResponse
                                key={message.id}
                                id={message.id}
                                role={message.role}
                                text={message.content}
                                time={message.createdAt ?? new Date()}
                            />
                        ))}
                        {isLoading && <LoadingIndicator />}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input area - pinned to bottom */}
            <div className="border-t border-gray-200 bg-gradient-to-b from-transparent to-gray-50/50 p-4 backdrop-blur-sm dark:border-gray-700 dark:to-gray-800/50">
                <div className="flex flex-col gap-3">
                    <LlmInput
                        value={input}
                        onChange={setInput}
                        onSubmit={() => submitQuestion()}
                        disabled={isLoading}
                    />
                    <LlmButton
                        onClick={() => {
                            submitQuestion();
                        }}
                        disabled={isLoading || !input.trim()}
                    >
                        {isLoading ? 'Thinking...' : 'Send Message'}
                    </LlmButton>
                </div>
            </div>
        </div>
    );
}
