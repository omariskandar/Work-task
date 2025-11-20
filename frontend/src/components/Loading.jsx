const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#E5E7EB]/60 before:to-transparent';

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center text-white">
      <div className="h-20 w-20 rounded-xl border border-white/10 bg-white/5 shadow-xl shadow-black/20">
        <div className="h-full w-full animate-spin rounded-xl border-2 border-dashed border-[#60A5FA] p-3">
          <div className="h-full w-full rounded-lg bg-gradient-to-br from-[#3B82F6]/40 to-[#60A5FA]/60" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-white">Loading your workspace</p>
        <p className="text-sm text-white/70">This usually takes a second. Grab a coffee ☕️</p>
      </div>
      <div className="w-full max-w-md space-y-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${shimmer} h-10 rounded-lg border border-white/10 bg-white/5 shadow-lg shadow-black/10`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
