import { useEffect, useState } from 'react';
import {
  loadHistory,
  deleteVideoFromHistory,
  clearHistory,
} from '../utils/storage.js';

export default function HistoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  function handleDelete(id) {
    setItems(deleteVideoFromHistory(id));
  }

  function handleClear() {
    clearHistory();
    setItems([]);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">History</h1>
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-slate-400 hover:text-red-300 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-slate-500">
          No videos yet. Generate one from the Generate tab.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-panel border border-white/5 rounded-2xl p-4 space-y-3"
          >
            <video
              src={item.dataUrl}
              controls
              className="w-full rounded-lg bg-black aspect-video"
            />
            <p className="text-sm text-slate-300 line-clamp-2">
              {item.prompt}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{item.style} · {item.duration}s</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-red-300 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
