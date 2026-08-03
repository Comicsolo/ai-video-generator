export default function Navbar({ page, setPage }) {
  const linkClass = (name) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      page === name ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
    }`;

  return (
    <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent2" />
        <span className="font-semibold tracking-tight">AI Video Generator</span>
      </div>
      <div className="flex gap-1">
        <button onClick={() => setPage('generate')} className={linkClass('generate')}>
          Generate
        </button>
        <button onClick={() => setPage('history')} className={linkClass('history')}>
          History
        </button>
      </div>
    </nav>
  );
        }
