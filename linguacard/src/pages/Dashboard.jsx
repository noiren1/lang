import { motion } from 'framer-motion'
import { Flame, BookOpen, Trophy, Clock, ChevronRight } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </motion.div>
  )
}

export default function Dashboard({ progress, dueCards, deck, setTab }) {
  const pct = deck.length > 0 ? Math.round((progress.totalLearned / Math.max(deck.length * 3, 1)) * 100) : 0

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {dueCards.length > 0
            ? `You have ${dueCards.length} card${dueCards.length !== 1 ? 's' : ''} due for review.`
            : 'All caught up! Check back later for new reviews.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Day streak" value={progress.streak} color="bg-orange-500" />
        <StatCard icon={BookOpen} label="Learned today" value={progress.learnedToday} color="bg-accent" />
        <StatCard icon={Trophy} label="Total learned" value={progress.totalLearned} color="bg-emerald-500" />
        <StatCard icon={Clock} label="Due now" value={dueCards.length} color="bg-purple-500" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Overall Progress</h2>
          <span className="text-sm text-accent font-medium">{pct}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">{deck.length} words in your deck</p>
      </motion.div>

      {dueCards.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setTab('study')}
          className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 text-lg"
        >
          Study Now — {dueCards.length} cards <ChevronRight size={20} />
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20 rounded-2xl p-5"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">✨ Tip: Sentence Mining</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Paste any text in any language into the <strong>Mining</strong> tab and AI will automatically extract vocabulary cards for you.
        </p>
        <button
          onClick={() => setTab('mining')}
          className="mt-3 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Try it now →
        </button>
      </motion.div>
    </div>
  )
}
