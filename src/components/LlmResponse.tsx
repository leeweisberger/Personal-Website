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

    return (
        <div className="flex items-start gap-2.5">
            {props.role === 'user' ? (
                <div className="h-8 w-8"></div>
            ) : (
                <img
                    className="h-8 w-8 rounded-full"
                    src={lee.src}
                    alt="Lee image"
                />
            )}
            <div
                className={classnames(
                    'leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl p-4',
                    {
                        'border-gray-200 bg-gray-100 dark:bg-gray-700':
                            props.role !== 'user',
                        'border-blue-200 bg-blue-100 dark:bg-blue-700':
                            props.role === 'user',
                    },
                )}
            >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userName}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {props.time.toLocaleTimeString()}
                    </span>
                </div>
                <div className="prose lg:prose-xl dark:prose-invert py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                    <MemoizedMarkdown id={props.id} content={props.text} />
                </div>
            </div>
        </div>
    );
}
