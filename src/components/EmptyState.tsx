type Props = {
    onSampleQuestion: (question: string) => void;
};

const sampleQuestions = [
    'What do you do for work?',
    'What is your background?',
    'What do you do for fun?',
];

export function EmptyState({ onSampleQuestion }: Props) {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Welcome! 👋
                </h2>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2">
                {sampleQuestions.map((question) => (
                    <button
                        key={question}
                        onClick={() => onSampleQuestion(question)}
                        className="group rounded-lg border border-gray-200 bg-white p-4 text-left text-sm transition-all hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
                    >
                        <span className="text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                            {question}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
