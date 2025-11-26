import classnames from 'classnames';
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
    const userName = props.role === 'user' ? 'You' : 'Lee';
    const isUser = props.role === 'user';

    return (
        <div
            className={classnames(
                'flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300',
                {
                    'flex-row-reverse': isUser,
                },
            )}
        >
            {isUser ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white shadow-md">
                    Y
                </div>
            ) : (
                <img
                    className="h-8 w-8 rounded-full shadow-md ring-2 ring-white dark:ring-gray-700"
                    src={lee.src}
                    alt="Lee image"
                />
            )}
            <div
                className={classnames(
                    'leading-1.5 flex max-w-[85%] flex-col rounded-2xl p-4 shadow-sm transition-all hover:shadow-md',
                    {
                        'bg-gray-50 dark:bg-gray-700/50': !isUser,
                        'bg-gradient-to-br from-blue-500 to-blue-600 text-white':
                            isUser,
                    },
                )}
            >
                <div className="mb-1 flex items-center space-x-2 rtl:space-x-reverse">
                    <span
                        className={classnames('text-xs font-semibold', {
                            'text-gray-900 dark:text-white': !isUser,
                            'text-white/90': isUser,
                        })}
                    >
                        {userName}
                    </span>
                    <span
                        className={classnames('text-xs', {
                            'text-gray-500 dark:text-gray-400': !isUser,
                            'text-white/70': isUser,
                        })}
                    >
                        {props.time.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>
                <div
                    className={classnames(
                        'prose prose-sm dark:prose-invert max-w-none',
                        {
                            'text-gray-900 dark:text-white': !isUser,
                            'prose-invert text-white': isUser,
                        },
                    )}
                >
                    <MemoizedMarkdown id={props.id} content={props.text} />
                </div>
            </div>
        </div>
    );
}
