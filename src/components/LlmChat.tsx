import { LlmInput } from './LlmInput';
import { useEffect, useState } from 'react';
import { LlmButton } from './LlmButton';
import { LlmResponse } from './LlmResponse';
import { useChatWithLlm } from './useChatWithLlm';

export function LlmChat() {
    const [question, setQuestion] = useState('');
    const { loading, chat, messages } = useChatWithLlm({
        initialMessages: [
            {
                role: 'llm',
                content:
                    "Hey I'm Lee. Ask me about my career, my hobbies and my background.",
                time: new Date(),
            },
        ],
    });

    useEffect(() => {
        setQuestion('');
    }, [messages]);

    function submitQuestion() {
        const questionToAsk = question.trim();
        if (!questionToAsk) {
            return;
        }
        chat(questionToAsk);
    }

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <LlmInput
                value={question}
                onChange={setQuestion}
                onSubmit={submitQuestion}
                disabled={loading}
            />
            <LlmButton
                onClick={() => {
                    submitQuestion();
                }}
                disabled={loading || !question.trim()}
            >
                Ask
            </LlmButton>
            <div className="flex flex-col gap-2 overflow-auto">
                {messages.map((message, index) => (
                    <LlmResponse
                        key={index}
                        role={message.role}
                        text={message.content}
                        time={message.time}
                    />
                ))}
            </div>
        </div>
    );
}
