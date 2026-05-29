import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, PartyPopper } from 'lucide-react'

function difficultyColor(d) {
  if (d === 'easy') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
  if (d === 'medium') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
}

export default function Study({ dueCards, reviewCard }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const [queue, setQueue] = useState(() => [...dueCards])

  function handleAnswer(knew) {
    const card = queue[index]
    reviewCard(card.id, knew)
    const next = index + 1
    if (next >= queue.length) {
      setDone(true)
    } else {
      setFlipped(false)
      setIndex(next)
    }
  }

  function restart() {
    setQueue([...dueCards])
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">All caught up!</h2>
        <p className="text-gray-500 dark:text-gray-400">No cards due for review right now. Check back later!</p>
      </div>
    )
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <PartyPopper size={64} className="text-accent mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Session Complete!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">You reviewed {queue.length} cards.</p>
        <button
          onClick={restart}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all"
        >
          <RotateCcw size={18} /> Study Again
        </button>
      </motion.div>
    )
  }

  const card = queue[index]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-600">
        <span>{index + 1} / {queue.length}</span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColor(card.difficulty)}`}>
          {card.difficulty}
        </span>
      </div>

      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${((index) / queue.length) * 100}%` }}
          className="h-full bg-accent rounded-full"
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id + flipped}
          initial={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => !flipped && setFlipped(true)}
          className={`min-h-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-shadow hover:shadow-lg ${!flipped ? 'hover:border-accent/40' : ''}`}
        >
          {!flipped ? (
            <>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Word</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{card.word}</p>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-6">Tap to reveal</p>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-4">Translation</p>
              <p className="text-2xl font-bold text-accent mb-4">{card.translation_ru || card.translation}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">"{card.example_sentence || card.example}"</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-red-200 dark:border-red-900 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <XCircle size={20} /> Didn't Know
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-900 text-emerald-500 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
          >
            <CheckCircle size={20} /> Knew It
          </button>
        </motion.div>
      )}
    </div>
  )
}
