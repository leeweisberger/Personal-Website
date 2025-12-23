import lee from '../assets/lee.jpg';

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
        <div className="flex h-full flex-col items-center justify-center px-4 py-8">
            {/* Logo and branding */}
            <div className="mb-8 flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gpt-green shadow-lg">
                    <img
                        src={lee.src}
                        alt="Chat GPLee"
                        className="h-full w-full object-cover"
                    />
                </div>
                <h1 className="text-2xl font-semibold text-gpt-text">
                    Chat GPLee
                </h1>
                <p className="mt-2 text-center text-sm text-gpt-text-secondary">
                    Ask me anything about Lee Weisberger
                </p>
            </div>

            {/* Sample prompts grid */}
            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {sampleQuestions.map((item) => (
                    <button
                        key={item.title}
                        onClick={() => onSampleQuestion(item.prompt)}
                        className="group rounded-xl border border-gpt-border bg-gpt-input p-4 text-left transition-colors hover:bg-gpt-hover"
                    >
                        <div className="text-sm font-medium text-gpt-text">
                            {item.title}
                        </div>
                        <div className="mt-1 text-sm text-gpt-text-secondary">
                            {item.prompt}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
