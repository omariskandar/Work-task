const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      <div className="h-28 w-28 rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="h-full w-full animate-spin rounded-[28px] border border-dashed border-white/20 p-6">
          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-brand to-pink-500/80 blur-sm" />
        </div>
      </div>
      <div className="space-y-3 text-center">
        <p className="text-lg font-semibold text-white">Summoning your workspace</p>
        <p className="text-sm text-white/60">
          This usually takes a second. Grab a coffee ☕️
        </p>
      </div>
      <div className="w-full max-w-md space-y-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${shimmer} h-12 rounded-2xl border border-white/5 bg-white/5`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
