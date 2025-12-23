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
        <div className="relative flex items-end rounded-2xl border border-gpt-border bg-gpt-input shadow-lg">
            <textarea
                rows={1}
                className="max-h-52 min-h-[52px] flex-1 resize-none bg-transparent px-4 py-3.5 text-gpt-text placeholder-gpt-text-secondary focus:outline-none"
                placeholder="Message Chat GPLee..."
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                    // Auto-resize textarea
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                }}
                disabled={props.disabled}
                onKeyDown={handleKeyDown}
            />
            <button
                type="button"
                onClick={handleSubmit}
                disabled={props.disabled || !props.value.trim()}
                className="m-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gpt-border disabled:opacity-40"
                aria-label="Send message"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={props.disabled || !props.value.trim() ? 'text-gpt-text-secondary' : 'text-black'}
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
