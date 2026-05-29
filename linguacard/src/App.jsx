import { useState } from 'react'
import './index.css'
import { useTheme } from './hooks/useTheme'
import { useDeck } from './hooks/useDeck'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Study from './pages/Study'
import Mining from './pages/Mining'
import Practice from './pages/Practice'

function App() {
  const { dark, toggle } = useTheme()
  const { deck, dueCards, progress, addCards, reviewCard } = useDeck()
  const [tab, setTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar tab={tab} setTab={setTab} dark={dark} toggleTheme={toggle} />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        {tab === 'dashboard' && <Dashboard progress={progress} dueCards={dueCards} deck={deck} setTab={setTab} />}
        {tab === 'study' && <Study dueCards={dueCards} reviewCard={reviewCard} />}
        {tab === 'mining' && <Mining addCards={addCards} />}
        {tab === 'practice' && <Practice deck={deck} />}
      </main>
    </div>
  )
}

export default App
