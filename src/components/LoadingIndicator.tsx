import lee from '../assets/lee.jpg';

export function LoadingIndicator() {
    return (
        <div className="animate-in fade-in py-4">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gpt-green">
                        <img
                            src={lee.src}
                            alt="ChatGPLEE is thinking"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Typing indicator */}
                <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm font-semibold text-gpt-text">
                        ChatGPLEE
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gpt-text-secondary [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gpt-text-secondary [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gpt-text-secondary" />
                    </div>
                </div>
            </div>
        </div>
    );
}
