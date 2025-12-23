import { ChatInput } from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import { LlmResponse } from './LlmResponse';
import { EmptyState } from './EmptyState';
import { LoadingIndicator } from './LoadingIndicator';
import { Sidebar } from './Sidebar';
import { useChat } from 'ai/react';

const models = [
    { id: 'gplee-5.2', name: 'GPLee-5.2' },
    { id: 'gplee-5.2-mini', name: 'GPLee-5.2 mini' },
    { id: 'o1-lee', name: 'o1-Lee' },
];

export function LlmChat() {
    const { messages, input, setInput, append, isLoading, setMessages } =
        useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInput('');
    }, [messages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setModelDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function submitQuestion(question?: string) {
        const questionToAsk = question?.trim() || input.trim();
        if (!questionToAsk) {
            return;
        }
        append({ role: 'user', content: questionToAsk });
    }

    function handleNewChat() {
        setMessages([]);
    }

    return (
        <div className="bg-gpt-main flex h-full w-full">
            {/* Sidebar */}
            <Sidebar
                onNewChat={handleNewChat}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main content area */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="border-gpt-border flex h-14 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">
                        {sidebarCollapsed && (
                            <button
                                onClick={() => setSidebarCollapsed(false)}
                                className="text-gpt-text-secondary hover:bg-gpt-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg"
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
                        )}

                        {/* Model selector dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setModelDropdownOpen(!modelDropdownOpen)
                                }
                                className="text-gpt-text hover:bg-gpt-hover flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-lg font-semibold"
                            >
                                ChatGPLee
                                <span className="text-gpt-text-secondary ml-1 text-sm font-normal">
                                    {selectedModel.name}
                                </span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-gpt-text-secondary"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {modelDropdownOpen && (
                                <div className="border-gpt-border bg-gpt-main absolute top-full left-0 z-50 mt-1 min-w-48 rounded-xl border py-2 shadow-lg">
                                    {models.map((model) => (
                                        <button
                                            key={model.id}
                                            onClick={() => {
                                                setSelectedModel(model);
                                                setModelDropdownOpen(false);
                                            }}
                                            className={`hover:bg-gpt-hover flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-sm ${
                                                selectedModel.id === model.id
                                                    ? 'text-gpt-text'
                                                    : 'text-gpt-text-secondary'
                                            }`}
                                        >
                                            <span>{model.name}</span>
                                            {selectedModel.id === model.id && (
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="text-gpt-green"
                                                >
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
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
                            ChatGPLee can make mistakes. Consider checking
                            important info.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
