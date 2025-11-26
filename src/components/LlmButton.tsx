import classnames from 'classnames';

type Props = {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
};

export function LlmButton(props: Props) {
    return (
        <button
            type="button"
            className={classnames(
                'rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800',
                {
                    'cursor-not-allowed bg-gray-400 dark:bg-gray-600':
                        props.disabled,
                },
                {
                    'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-md active:scale-[0.98] dark:from-blue-500 dark:to-purple-500':
                        !props.disabled,
                },
            )}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}
