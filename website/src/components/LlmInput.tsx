type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
    disabled?: boolean;
};

export function LlmInput(props: Props) {
    function enterPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && props.onSubmit) {
            props.onSubmit();
        }
    }

    return (
        <div>
            <label
                htmlFor="input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                Ask me anything
            </label>
            <textarea
                id="input"
                rows={2}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="What college did you go to?"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                disabled={props.disabled}
                onKeyDown={enterPress}
            ></textarea>
        </div>
    );
}
