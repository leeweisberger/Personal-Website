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

    return (
        <div className="animate-in fade-in group py-4">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {isUser ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gpt-green text-sm font-medium text-white">
                            Y
                        </div>
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gpt-green">
                            <img
                                src={lee.src}
                                alt="ChatGPLEE"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Message content */}
                <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm font-semibold text-gpt-text">
                        {isUser ? 'You' : 'ChatGPLEE'}
                    </div>
                    <div className="prose prose-sm prose-gpt max-w-none text-gpt-text">
                        <MemoizedMarkdown id={props.id} content={props.text} />
                    </div>
                </div>
            </div>
        </div>
    );
}
