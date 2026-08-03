const KEY = 'ai-video-history';
const MAX_ITEMS = 20;

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function saveVideoToHistory(blob, meta = {}) {
  const dataUrl = await blobToDataUrl(blob);
  const arr = loadHistory();
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    dataUrl,
    createdAt: new Date().toISOString(),
    ...meta,
  };
  arr.unshift(item);
  if (arr.length > MAX_ITEMS) arr.splice(MAX_ITEMS);
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('Failed to save history (storage may be full):', err);
  }
  return item;
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed parsing history', err);
    return [];
  }
}

export function deleteVideoFromHistory(id) {
  const arr = loadHistory().filter((item) => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(arr));
  return arr;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
