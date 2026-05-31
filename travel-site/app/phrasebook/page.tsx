'use client'

import { useState, useMemo } from 'react'
import { PHRASEBOOK } from '@/lib/phrasebook'
import { COUNTRIES } from '@/lib/data'
import { Volume2, Search } from 'lucide-react'

const PHRASE_CATEGORIES_LIST = [
  { id: 'greeting', label: 'Приветствия', emoji: '👋' },
  { id: 'thanks', label: 'Благодарность', emoji: '🙏' },
  { id: 'help', label: 'Помощь', emoji: '🆘' },
  { id: 'food', label: 'Еда', emoji: '🍽️' },
  { id: 'transport', label: 'Транспорт', emoji: '🚌' },
  { id: 'shopping', label: 'Покупки', emoji: '🛍️' },
  { id: 'accommodation', label: 'Жильё', emoji: '🏨' },
  { id: 'emergency', label: 'Экстренные', emoji: '🚨' },
  { id: 'directions', label: 'Маршрут', emoji: '🧭' },
  { id: 'numbers', label: 'Числа', emoji: '🔢' },
]

export default function PhrasebookPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('JP')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const countryData = PHRASEBOOK.find(p => p.code === selectedCountry)
  const countryInfo = COUNTRIES.find(c => c.code === selectedCountry)

  const filteredPhrases = useMemo(() => {
    if (!countryData) return []
    return countryData.phrases.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory
      const matchSearch = !search || p.ru.toLowerCase().includes(search.toLowerCase()) || p.local.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [countryData, selectedCategory, search])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const availableCountries = PHRASEBOOK.map(p => {
    const c = COUNTRIES.find(c => c.code === p.code)
    return { code: p.code, name: c?.name || p.code, flag: c?.flag || '' }
  })

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            💬 Разговорник путешественника
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Ключевые фразы на 20 языках — с произношением
          </p>
        </div>

        {/* Country selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {availableCountries.map(c => (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: selectedCountry === c.code ? 'var(--accent)' : 'var(--bg-card)',
                  color: selectedCountry === c.code ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                <span>{c.flag}</span>
                <span className="hidden sm:inline">{c.name}</span>
                <span className="sm:hidden">{c.code}</span>
              </button>
            ))}
          </div>
        </div>

        {countryData && countryInfo && (
          <>
            {/* Country header */}
            <div className="glass rounded-2xl p-5 mb-5 flex items-center gap-4">
              <span className="text-5xl">{countryInfo.flag}</span>
              <div>
                <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{countryInfo.name}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{countryData.phrases.length} фраз • Язык: {countryInfo.language}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Поиск фразы..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-3 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: selectedCategory === 'all' ? 'var(--accent)' : 'var(--bg-card)',
                    color: selectedCategory === 'all' ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  Все
                </button>
                {PHRASE_CATEGORIES_LIST.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: selectedCategory === cat.id ? 'var(--accent)' : 'var(--bg-card)',
                      color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span>{cat.emoji}</span>
                    <span className="hidden md:inline">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phrases grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredPhrases.map((phrase, i) => {
                const cat = PHRASE_CATEGORIES_LIST.find(c => c.id === phrase.category)
                const uid = `${selectedCountry}-${i}`
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                      >
                        {cat?.emoji} {cat?.label}
                      </span>
                      <button
                        onClick={() => copyToClipboard(phrase.local, uid)}
                        className="text-xs px-2 py-0.5 rounded-lg transition-all"
                        style={{
                          background: copied === uid ? 'var(--accent)' : 'var(--bg-hover)',
                          color: copied === uid ? '#fff' : 'var(--text-secondary)',
                        }}
                      >
                        {copied === uid ? '✓' : 'Копировать'}
                      </button>
                    </div>
                    <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {phrase.ru}
                    </p>
                    <p className="text-lg font-bold mb-1" style={{ color: 'var(--accent)' }}>
                      {phrase.local}
                    </p>
                    <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <Volume2 size={12} />
                      {phrase.pronunciation}
                    </p>
                  </div>
                )
              })}
            </div>

            {filteredPhrases.length === 0 && (
              <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
                Фразы не найдены
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
