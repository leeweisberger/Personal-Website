import { useState } from 'react';
import lee from '../assets/lee.jpg';
import { MemoizedMarkdown } from './Mardown';
import { type Message } from 'ai/react';

type Props = {
    id: string;
    role: Message['role'];
    text: string;
    time: Date;
};

export function LlmResponse(props: Props) {
    const isUser = props.role === 'user';
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

    async function handleCopy() {
        await navigator.clipboard.writeText(props.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleFeedback(type: 'up' | 'down') {
        setFeedback(feedback === type ? null : type);
    }

    // User message - right-aligned bubble
    if (isUser) {
        return (
            <div className="animate-in fade-in flex justify-end py-4">
                <div className="bg-gpt-hover text-gpt-text max-w-[80%] rounded-3xl px-5 py-2.5">
                    {props.text}
                </div>
            </div>
        );
    }

    // Assistant message - left-aligned with avatar and actions
    return (
        <div className="animate-in fade-in group py-4">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="bg-gpt-green flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                        <img
                            src={lee.src}
                            alt="ChatGPLee"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Message content */}
                <div className="min-w-0 flex-1">
                    <div className="prose prose-sm prose-gpt text-gpt-text max-w-none">
                        <MemoizedMarkdown id={props.id} content={props.text} />
                    </div>

                    {/* Action buttons */}
                    <div className="mt-2 flex items-center gap-1">
                        {/* Copy button */}
                        <button
                            onClick={handleCopy}
                            className="text-gpt-text-secondary hover:bg-gpt-hover hover:text-gpt-text flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                            aria-label={copied ? 'Copied!' : 'Copy message'}
                            title={copied ? 'Copied!' : 'Copy'}
                        >
                            {copied ? (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="9"
                                        y="9"
                                        width="13"
                                        height="13"
                                        rx="2"
                                        ry="2"
                                    />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                        </button>

                        {/* Thumbs up */}
                        <button
                            onClick={() => handleFeedback('up')}
                            className="text-gpt-text-secondary hover:bg-gpt-hover hover:text-gpt-text flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                            aria-label="Good response"
                            title="Good response"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={
                                    feedback === 'up' ? 'currentColor' : 'none'
                                }
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={
                                    feedback === 'up' ? 'text-gpt-text' : ''
                                }
                            >
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                        </button>

                        {/* Thumbs down */}
                        <button
                            onClick={() => handleFeedback('down')}
                            className="text-gpt-text-secondary hover:bg-gpt-hover hover:text-gpt-text flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                            aria-label="Bad response"
                            title="Bad response"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={
                                    feedback === 'down'
                                        ? 'currentColor'
                                        : 'none'
                                }
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={
                                    feedback === 'down' ? 'text-gpt-text' : ''
                                }
                            >
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
