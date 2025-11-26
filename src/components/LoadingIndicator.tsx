import lee from '../assets/lee.jpg';

export function LoadingIndicator() {
    return (
        <div className="flex animate-in fade-in slide-in-from-bottom-2 items-start gap-2.5 duration-300">
            <img
                className="h-8 w-8 rounded-full shadow-md ring-2 ring-white dark:ring-gray-700"
                src={lee.src}
                alt="Lee is typing"
            />
            <div className="flex max-w-[85%] flex-col rounded-2xl bg-gray-50 p-4 shadow-sm dark:bg-gray-700/50">
                <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></div>
                </div>
            </div>
        </div>
    );
}
