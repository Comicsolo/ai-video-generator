const BASE_URL = import.meta.env.VITE_VIDEO_API_URL;
const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;

function authHeaders() {
  return API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateGenerate({ onProgress }) {
  const steps = [5, 15, 30, 45, 60, 75, 88, 100];
  for (const p of steps) {
    await sleep(350);
    onProgress?.(p);
  }
  const res = await fetch('/sample.mp4');
  if (!res.ok) {
    throw new Error(
      'No VITE_VIDEO_API_URL is configured and /public/sample.mp4 was not found. Add a sample video file to test locally.'
    );
  }
  return res.blob();
}

async function realGenerate({ prompt, style, duration, onProgress }) {
  const genRes = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ prompt, style, duration }),
  });
  if (!genRes.ok) throw new Error(`Generate request failed: ${genRes.status}`);
  const { jobId } = await genRes.json();
  if (!jobId) throw new Error('API did not return a jobId');

  while (true) {
    await sleep(1500);
    const statusRes = await fetch(`${BASE_URL}/status/${jobId}`, {
      headers: authHeaders(),
    });
    if (!statusRes.ok) throw new Error(`Status check failed: ${statusRes.status}`);
    const statusData = await statusRes.json();
    if (typeof statusData.progress === 'number') onProgress?.(statusData.progress);

    if (statusData.status === 'done') break;
    if (statusData.status === 'failed') {
      throw new Error(statusData.error || 'Video generation failed');
    }
  }

  const downloadRes = await fetch(`${BASE_URL}/download/${jobId}`, {
    headers: authHeaders(),
  });
  if (!downloadRes.ok) throw new Error(`Download failed: ${downloadRes.status}`);
  return downloadRes.blob();
}

export function isRealApiConfigured() {
  return Boolean(BASE_URL);
}

export async function generateVideo({ prompt, style, duration, onProgress }) {
  if (isRealApiConfigured()) {
    return realGenerate({ prompt, style, duration, onProgress });
  }
  return simulateGenerate({ onProgress });
}
