import lee from '../assets/lee.jpg';

export function LoadingIndicator() {
    return (
        <div className="animate-in fade-in py-4">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="bg-gpt-green flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                        <img
                            src={lee.src}
                            alt="ChatGPLee is thinking"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Typing indicator */}
                <div className="min-w-0 flex-1">
                    <div className="text-gpt-text mb-1 text-sm font-semibold">
                        ChatGPLee
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-gpt-text-secondary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
                        <div className="bg-gpt-text-secondary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
                        <div className="bg-gpt-text-secondary h-2 w-2 animate-bounce rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
