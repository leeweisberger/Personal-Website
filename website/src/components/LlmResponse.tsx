import classnames from 'classnames';
import lee from '../assets/lee.jpg';
import type { MessageRole } from './useChatWithLlm';

type Props = {
    role: MessageRole;
    text: string;
    time: Date;
};

export function LlmResponse(props: Props) {
    const userName = props.role === 'user' ? 'You' : 'Lee';

    return (
        <div className="flex items-start gap-2.5">
            {props.role === 'llm' ? (
                <img
                    className="h-8 w-8 rounded-full"
                    src={lee.src}
                    alt="Lee image"
                />
            ) : (
                <div className="h-8 w-8"></div>
            )}
            <div
                className={classnames(
                    'leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl p-4',
                    {
                        'border-gray-200 bg-gray-100 dark:bg-gray-700':
                            props.role === 'llm',
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
                <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                    {props.text}
                </p>
            </div>
        </div>
    );
}
