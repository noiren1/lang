'use client'

import { useState, useMemo } from 'react'
import { UNIVERSAL_TIPS, CATEGORIES, Category } from '@/lib/data'
import TipCard from '@/components/TipCard'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search } from 'lucide-react'

function TipsContent() {
  const searchParams = useSearchParams()
  const initialCat = (searchParams.get('category') as Category | null)
  const [selectedCat, setSelectedCat] = useState<Category | 'all'>(initialCat || 'all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return UNIVERSAL_TIPS.filter(t => {
      const matchesCat = selectedCat === 'all' || t.category === selectedCat
      const matchesQuery = !query ||
        t.tip.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      return matchesCat && matchesQuery
    })
  }, [selectedCat, query])

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            💡 Лайфхаки путешественника
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {UNIVERSAL_TIPS.length} проверенных советов для любой страны мира
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Искать среди советов..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCat('all')}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: selectedCat === 'all' ? 'var(--accent)' : 'var(--bg-card)',
              color: selectedCat === 'all' ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${selectedCat === 'all' ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            🌐 Все ({UNIVERSAL_TIPS.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = UNIVERSAL_TIPS.filter(t => t.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedCat === cat.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                } ${cat.color}`}
                style={{
                  background: selectedCat === cat.id ? undefined : 'var(--bg-card)',
                }}
              >
                {cat.emoji} {cat.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Count */}
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Показано: <strong style={{ color: 'var(--accent)' }}>{filtered.length}</strong> советов
        </p>

        {/* Tips */}
        {filtered.length > 0 ? (
          <div className="grid gap-4">
            {filtered.map((tip, i) => (
              <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.03}s`, opacity: 0 }}>
                <TipCard tip={tip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-lg">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TipsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>Загрузка...</div>}>
      <TipsContent />
    </Suspense>
  )
}
