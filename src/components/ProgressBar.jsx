export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="bg-panel border border-white/5 rounded-2xl p-6 space-y-3">
      <div className="flex justify-between text-sm text-slate-300">
        <span>Generating your video…</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
          }
