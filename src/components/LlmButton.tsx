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
                'mb-2 me-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800',
                {
                    'cursor-not-allowed bg-blue-400 dark:bg-blue-500':
                        props.disabled,
                },
                {
                    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700':
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
