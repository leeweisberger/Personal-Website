import { ChatInput } from './ChatInput';
import { useEffect, useRef } from 'react';
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
        <div className="flex h-full w-full flex-col bg-gpt-main">
            {/* Messages container - scrollable area */}
            <div className="flex-1 overflow-auto">
                <div className="mx-auto max-w-3xl px-4">
                    {messages.length === 0 ? (
                        <EmptyState onSampleQuestion={submitQuestion} />
                    ) : (
                        <div className="py-4">
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
                        </div>
                    )}
                </div>
            </div>

            {/* Input area - fixed at bottom, ChatGPT style */}
            <div className="border-t border-gpt-border bg-gpt-main pb-4 pt-2">
                <div className="mx-auto max-w-3xl px-4">
                    <ChatInput
                        value={input}
                        onChange={setInput}
                        onSubmit={() => submitQuestion()}
                        disabled={isLoading}
                    />
                    <p className="mt-2 text-center text-xs text-gpt-text-secondary">
                        Chat GPLee can make mistakes. Consider checking important info.
                    </p>
                </div>
            </div>
        </div>
    );
}
