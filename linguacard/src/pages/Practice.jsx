import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Trophy } from 'lucide-react'

function fuzzyMatch(input, target) {
  const a = input.trim().toLowerCase()
  const b = target.trim().toLowerCase()
  if (a === b) return true
  if (Math.abs(a.length - b.length) > 2) return false
  let errors = 0
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) errors++
    if (errors > 1) return false
  }
  return true
}

export default function Practice({ deck }) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [done, setDone] = useState(false)
  const inputRef = useRef(null)

  const [cards] = useState(() => deck.slice(0, 10))

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No cards yet</h2>
        <p className="text-gray-500 dark:text-gray-400">Add words via Sentence Mining first!</p>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((score.correct / score.total) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <Trophy size={64} className={pct >= 70 ? 'text-yellow-400' : 'text-gray-400'} />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          {pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Good job!' : 'Keep practicing!'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {score.correct} / {score.total} correct ({pct}%)
        </p>
        <button
          onClick={() => { setIndex(0); setInput(''); setResult(null); setScore({ correct: 0, total: 0 }); setDone(false) }}
          className="mt-6 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all"
        >
          Practice Again
        </button>
      </motion.div>
    )
  }

  const card = cards[index]

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    const correct = fuzzyMatch(input, card.word)
    setResult({ correct, correct_word: card.word })
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  function handleNext() {
    setInput('')
    setResult(null)
    if (index + 1 >= cards.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{index + 1} / {cards.length}</span>
        <span className="font-medium text-emerald-500">{score.correct} correct</span>
      </div>

      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${(index / cards.length) * 100}%` }}
          className="h-full bg-accent rounded-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-6"
        >
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Type the word in English</p>
            <p className="text-2xl font-bold text-accent">{card.translation_ru || card.translation}</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2 italic">"{card.example_sentence || card.example}"</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={!!result}
              autoFocus
              placeholder="Type the word..."
              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-center text-lg font-semibold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 ${
                result
                  ? result.correct
                    ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : 'border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent'
              }`}
            />
            {!result && (
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-semibold rounded-xl transition-all"
              >
                Check
              </button>
            )}
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className={`flex items-center gap-2 justify-center font-semibold ${result.correct ? 'text-emerald-500' : 'text-red-500'}`}>
                  {result.correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  {result.correct ? 'Correct!' : `Answer: ${result.correct_word}`}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-3 border-2 border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent rounded-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 transition-all"
                >
                  Next <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
