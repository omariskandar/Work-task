const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#E5E7EB] before:to-transparent';

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center text-[#111827]">
      <div className="h-24 w-24 rounded-2xl border border-[#E5E7EB] bg-white">
        <div className="h-full w-full animate-spin rounded-2xl border border-dashed border-[#CBD5F5] p-4">
          <div className="h-full w-full rounded-xl bg-[#3B82F6]/30" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold">Loading your workspace</p>
        <p className="text-sm text-[#6B7280]">This usually takes a second. Grab a coffee ☕️</p>
      </div>
      <div className="w-full max-w-md space-y-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${shimmer} h-10 rounded-lg border border-[#E5E7EB] bg-white`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
