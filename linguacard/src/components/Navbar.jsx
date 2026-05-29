import { Sun, Moon, BookOpen } from 'lucide-react'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'study', label: 'Study' },
  { id: 'mining', label: 'Mining' },
  { id: 'practice', label: 'Practice' },
]

export default function Navbar({ tab, setTab, dark, toggleTheme }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <BookOpen size={20} className="text-accent" />
          <span className="font-bold text-gray-900 dark:text-white hidden sm:block">LinguaCard</span>
        </div>

        <div className="flex items-center gap-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-accent text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  )
}
