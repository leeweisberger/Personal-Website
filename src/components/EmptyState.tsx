type Props = {
    onSampleQuestion: (question: string) => void;
};

const sampleQuestions = [
    {
        title: 'Tell me about yourself',
        prompt: 'What do you do for work?',
    },
    {
        title: 'Your background',
        prompt: 'What is your background and experience?',
    },
    {
        title: 'Hobbies & interests',
        prompt: 'What do you do for fun?',
    },
    {
        title: 'Career advice',
        prompt: 'What advice would you give to someone starting in tech?',
    },
];

export function EmptyState({ onSampleQuestion }: Props) {
    return (
        <div className="flex h-full flex-col items-center justify-center px-4 py-16">
            {/* Main heading - ChatGPT style */}
            <h1 className="mb-8 text-center text-3xl font-medium text-gpt-text">
                What would you like to know?
            </h1>

            {/* Sample prompts as small pills */}
            <div className="flex flex-wrap justify-center gap-2">
                {sampleQuestions.map((item) => (
                    <button
                        key={item.title}
                        onClick={() => onSampleQuestion(item.prompt)}
                        className="rounded-full border border-gpt-border bg-gpt-main px-4 py-2 text-sm text-gpt-text transition-colors hover:bg-gpt-hover"
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
