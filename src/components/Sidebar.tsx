type Props = {
    onNewChat: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
};

export function Sidebar({ onNewChat, isCollapsed, onToggleCollapse }: Props) {
    return (
        <div
            className={`flex h-full flex-col bg-gpt-sidebar transition-all duration-300 ${
                isCollapsed ? 'w-0 overflow-hidden' : 'w-64'
            }`}
        >
            {/* Sidebar header with collapse button */}
            <div className="flex h-14 items-center justify-between px-3">
                <button
                    onClick={onToggleCollapse}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gpt-text-secondary hover:bg-gpt-hover"
                    aria-label="Toggle sidebar"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 3v18" />
                    </svg>
                </button>

                {/* New chat button */}
                <button
                    onClick={onNewChat}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gpt-text-secondary hover:bg-gpt-hover"
                    aria-label="New chat"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </button>
            </div>

            {/* New chat menu item */}
            <div className="flex-1 px-2">
                <button
                    onClick={onNewChat}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gpt-text hover:bg-gpt-hover"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    New chat
                </button>
            </div>
        </div>
    );
}
