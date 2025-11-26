type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    disabled?: boolean;
};

export function LlmInput(props: Props) {
    function enterPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey && props.onSubmit) {
            e.preventDefault();
            props.onSubmit();
        }
    }

    return (
        <div className="relative">
            <textarea
                id="input"
                rows={2}
                className="block w-full resize-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                placeholder="Ask me anything..."
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                disabled={props.disabled}
                onKeyDown={enterPress}
            ></textarea>
        </div>
    );
}
