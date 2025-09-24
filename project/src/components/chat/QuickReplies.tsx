interface Props {
  onSelect: (text: string) => void;
}

const quickReplies = [
  "ما هي شروط صحة العقد؟",
  "حقوق العامل في قانون العمل",
  "كيفية كتابة عقد إيجار؟",
  "متى يحق للمستأجر فسخ العقد؟",
];

export default function QuickReplies({ onSelect }: Props) {
  return (
    <div className="px-4 py-2 bg-gray-50 dark:bg-neutral-medium border-t border-gray-200 dark:border-neutral-dark">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-neutral-medium dark:text-neutral-light mb-3">
          اختر سؤال سريع:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => onSelect(reply)}
              className="bg-accent-purple text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
