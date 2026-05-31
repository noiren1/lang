'use client'

import { useState, useMemo } from 'react'
import { COUNTRIES, REGIONS } from '@/lib/data'
import CountryCard from '@/components/CountryCard'
import { Search, Filter } from 'lucide-react'

const ALL_REGIONS = ['Все', ...Array.from(new Set(COUNTRIES.map(c => c.region)))]

export default function CountriesPage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('Все')

  const filtered = useMemo(() => {
    return COUNTRIES.filter(c => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.capital.toLowerCase().includes(query.toLowerCase()) ||
        c.highlights.some(h => h.toLowerCase().includes(query.toLowerCase()))
      const matchesRegion = region === 'Все' || c.region === region
      return matchesQuery && matchesRegion
    })
  }, [query, region])

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            🌍 Все страны
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {COUNTRIES.length} стран с подробными гайдами и реальными советами
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Поиск по стране, городу, достопримечательности..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {ALL_REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: region === r ? 'var(--accent)' : 'var(--bg-card)',
                  color: region === r ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${region === r ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Найдено: <strong style={{ color: 'var(--accent)' }}>{filtered.length}</strong> стран
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(c => (
              <CountryCard key={c.code} country={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Ничего не найдено</p>
            <p className="text-sm mt-1">Попробуй другой запрос</p>
          </div>
        )}
      </div>
    </div>
  )
}
