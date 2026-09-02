const items = [
  ["تلفظ کوتاه", "bg-[#F7F9FB]"],
  ["کلمات سریع", "bg-[#F7F9FB]"],
  ["چالش ۵ تایی", "bg-[#F7F9FB]"],
  ["گرامر سریع", "bg-[#F7F9FB]"],
];

export function QuickPracticeGrid() {
  return (
    <section dir="rtl" className="rounded-2xl border border-[#BCC9C6] bg-white p-6">
      <h2 className="mb-4 font-bold text-[#191C1E]">تمرین سریع</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map(([title, style]) => (
          <button key={title} className={`h-[69px] rounded-lg border border-[#BCC9C6] ${style}`}>
            {title}
          </button>
        ))}
      </div>
    </section>
  );
}
