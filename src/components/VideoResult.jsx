export default function VideoResult({ videoUrl, prompt }) {
  if (!videoUrl) return null;

  return (
    <div className="bg-panel border border-white/5 rounded-2xl p-6 space-y-4">
      <video
        src={videoUrl}
        controls
        className="w-full rounded-xl bg-black aspect-video"
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400 truncate">{prompt}</p>
        <a
          href={videoUrl}
          download={`ai-video-${Date.now()}.mp4`}
          className="shrink-0 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition"
        >
          Download
        </a>
      </div>
    </div>
  );
}
