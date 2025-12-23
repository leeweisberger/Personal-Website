type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    disabled?: boolean;
};

export function ChatInput(props: Props) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey && props.onSubmit) {
            e.preventDefault();
            props.onSubmit();
        }
    }

    function handleSubmit() {
        if (props.onSubmit && props.value.trim()) {
            props.onSubmit();
        }
    }

    return (
        <div className="relative flex items-center rounded-full border border-gpt-border bg-gpt-input px-4 py-2 shadow-sm">
            {/* Plus icon on left */}
            <button
                type="button"
                className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center text-gpt-text-secondary hover:text-gpt-text"
                aria-label="Add attachment"
                disabled
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>

            {/* Input field */}
            <textarea
                rows={1}
                className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-gpt-text placeholder-gpt-text-secondary focus:outline-none"
                placeholder="Ask anything"
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                    // Auto-resize textarea
                    e.target.style.height = 'auto';
                    e.target.style.height =
                        Math.min(e.target.scrollHeight, 128) + 'px';
                }}
                disabled={props.disabled}
                onKeyDown={handleKeyDown}
            />

            {/* Send button */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={props.disabled || !props.value.trim()}
                className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gpt-text transition-colors hover:bg-gpt-text-secondary disabled:cursor-not-allowed disabled:bg-gpt-border disabled:opacity-40"
                aria-label="Send message"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                >
                    <path
                        d="M7 11L12 6L17 11M12 18V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}
