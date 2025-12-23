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
        <div className="border-gpt-border bg-gpt-input relative flex items-center rounded-full border px-4 py-2 shadow-sm">
            {/* Input field */}
            <textarea
                rows={1}
                className="text-gpt-text placeholder-gpt-text-secondary max-h-32 min-h-[24px] flex-1 resize-none bg-transparent focus:outline-none"
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
                className="bg-gpt-text hover:bg-gpt-text-secondary disabled:bg-gpt-border ml-2 flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40"
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
