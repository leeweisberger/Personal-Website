import { ChatInput } from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import { LlmResponse } from './LlmResponse';
import { EmptyState } from './EmptyState';
import { LoadingIndicator } from './LoadingIndicator';
import { Sidebar } from './Sidebar';
import { useChat } from 'ai/react';

export function LlmChat() {
    const { messages, input, setInput, append, isLoading, setMessages } =
        useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    function handleNewChat() {
        setMessages([]);
        setSidebarOpen(false);
    }

    return (
        <div className="bg-gpt-main relative flex h-full w-full">
            {/* Mobile overlay backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - hidden on mobile, shown as overlay when open */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar
                    onNewChat={handleNewChat}
                    isCollapsed={false}
                    onToggleCollapse={() => setSidebarOpen(false)}
                />
            </div>

            {/* Main content area */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="border-gpt-border flex h-14 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-3">
                        {/* Mobile menu button - always show on mobile */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gpt-text-secondary hover:bg-gpt-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg md:hidden"
                            aria-label="Open menu"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M6 9h12" />
                                <path d="M6 15h12" />
                            </svg>
                        </button>
                        {/* Desktop sidebar toggle - only when closed */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gpt-text-secondary hover:bg-gpt-hover hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg md:flex"
                            aria-label="Open sidebar"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                />
                                <path d="M9 3v18" />
                            </svg>
                        </button>
                        <h1 className="text-gpt-text flex items-center gap-1 text-lg font-semibold">
                            ChatGPLee
                        </h1>
                    </div>
                </header>

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

                {/* Input area - fixed at bottom */}
                <div className="pt-2 pb-4">
                    <div className="mx-auto max-w-3xl px-4">
                        <ChatInput
                            value={input}
                            onChange={setInput}
                            onSubmit={() => submitQuestion()}
                            disabled={isLoading}
                        />
                        <p className="text-gpt-text-secondary mt-2 text-center text-xs">
                            ChatGPLee can make mistakes. Just like real Lee.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
