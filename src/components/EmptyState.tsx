type Props = {
    onSampleQuestion: (question: string) => void;
};

const sampleQuestions = [
    {
        title: 'Tell me about yourself',
        prompt: 'What do you currently do for work? What do you do outside of work?',
    },
    {
        title: 'Your background',
        prompt: 'Tell me about all of your work experiences',
    },
    {
        title: 'Hobbies & interests',
        prompt: 'What do you do for fun?',
    },
];

export function EmptyState({ onSampleQuestion }: Props) {
    return (
        <div className="flex h-full flex-col items-center justify-center px-4 py-16">
            {/* Main heading - ChatGPT style */}
            <h1 className="text-gpt-text mb-8 text-center text-3xl font-medium">
                What would you like to know?
            </h1>

            {/* Sample prompts as small pills */}
            <div className="flex flex-wrap justify-center gap-2">
                {sampleQuestions.map((item) => (
                    <button
                        key={item.title}
                        onClick={() => onSampleQuestion(item.prompt)}
                        className="border-gpt-border bg-gpt-main text-gpt-text hover:bg-gpt-hover cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors"
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
