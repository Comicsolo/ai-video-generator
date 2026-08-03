import { useState } from 'react';

const STYLES = ['Cinematic', 'Anime', 'Realistic', 'Abstract', 'Documentary'];

export default function GenerateForm({ onGenerate, isGenerating }) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [duration, setDuration] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate({ prompt: prompt.trim(), style, duration });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-panel border border-white/5 rounded-2xl p-6 shadow-xl space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A drone shot flying over a neon-lit cyberpunk city at night..."
          rows={4}
          className="w-full rounded-xl bg-surface border border-white/10 px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-xl bg-surface border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {STYLES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Duration ({duration}s)
          </label>
          <input
            type="range"
            min={2}
            max={30}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!prompt.trim() || isGenerating}
        className="w-full rounded-xl bg-gradient-to-r from-accent to-accent2 py-3 font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        {isGenerating ? 'Generating…' : 'Generate Video'}
      </button>
    </form>
  );
}
