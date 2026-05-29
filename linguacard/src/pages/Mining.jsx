import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { mineWords } from '../lib/gemini'

function difficultyColor(d) {
  if (d === 'easy') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
  if (d === 'medium') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
}

export default function Mining({ addCards }) {
  const [text, setText] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(new Set())
  const [isMock, setIsMock] = useState(false)
  const [error, setError] = useState(null)

  async function handleMine() {
    if (!text.trim() || loading) return
    setLoading(true)
    setResults(null)
    setAdded(new Set())
    setError(null)
    try {
      const { data, mock, error: err } = await mineWords(text)
      setResults(data)
      setIsMock(mock)
      if (err) setError(err)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleAdd(card) {
    addCards([card])
    setAdded(prev => new Set([...prev, card.word]))
  }

  function handleAddAll() {
    const toAdd = results.filter(c => !added.has(c.word))
    addCards(toAdd)
    setAdded(new Set(results.map(c => c.word)))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sentence Mining</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Paste any text in any language. AI will extract vocabulary cards automatically.
        </p>
      </div>

      <div className="space-y-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste an article, book excerpt, subtitle, or any text here..."
          rows={7}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
        />
        <button
          onClick={handleMine}
          disabled={!text.trim() || loading}
          className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Analyzing...</>
          ) : (
            <><Sparkles size={18} /> Extract Vocabulary with AI</>
          )}
        </button>
      </div>

      {!import.meta.env.VITE_GEMINI_API_KEY && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-sm">
          <AlertCircle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-yellow-700 dark:text-yellow-400">
            <strong>Demo mode:</strong> No API key set. Results are sample data.
            Add <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">VITE_GEMINI_API_KEY</code> to a <code>.env</code> file to enable real AI.
          </p>
        </div>
      )}

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {results.length} words found {isMock && <span className="text-xs text-gray-400">(demo)</span>}
              </h2>
              <button
                onClick={handleAddAll}
                disabled={results.every(c => added.has(c.word))}
                className="text-sm font-medium text-accent hover:text-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add All
              </button>
            </div>

            <div className="space-y-3">
              {results.map((card, i) => (
                <motion.div
                  key={card.word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">{card.word}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor(card.difficulty)}`}>
                        {card.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-accent font-medium mb-1">{card.translation_ru}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">"{card.example_sentence}"</p>
                  </div>
                  <button
                    onClick={() => handleAdd(card)}
                    disabled={added.has(card.word)}
                    className={`shrink-0 p-2 rounded-lg transition-all ${
                      added.has(card.word)
                        ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'text-accent hover:bg-accent/10'
                    }`}
                  >
                    {added.has(card.word) ? <CheckCircle size={20} /> : <Plus size={20} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
