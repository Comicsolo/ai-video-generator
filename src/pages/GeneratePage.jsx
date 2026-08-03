import { useState } from 'react';
import GenerateForm from '../components/GenerateForm.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import VideoResult from '../components/VideoResult.jsx';
import { generateVideo, isRealApiConfigured } from '../services/videoApi.js';
import { saveVideoToHistory } from '../utils/storage.js';

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');
  const [error, setError] = useState(null);

  async function handleGenerate({ prompt, style, duration }) {
    setError(null);
    setVideoUrl(null);
    setProgress(0);
    setIsGenerating(true);
    setLastPrompt(prompt);

    try {
      const blob = await generateVideo({
        prompt,
        style,
        duration,
        onProgress: setProgress,
      });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      await saveVideoToHistory(blob, { prompt, style, duration });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong generating the video.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      {!isRealApiConfigured() && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-200 text-sm px-4 py-3">
          No API connected — running in simulation mode. Set{' '}
          <code className="font-mono">VITE_VIDEO_API_URL</code> in a{' '}
          <code className="font-mono">.env</code> file to use a real
          video-generation backend.
        </div>
      )}

      <GenerateForm onGenerate={handleGenerate} isGenerating={isGenerating} />

      {isGenerating && <ProgressBar progress={progress} />}

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 text-red-200 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <VideoResult videoUrl={videoUrl} prompt={lastPrompt} />
    </div>
  );
      }
