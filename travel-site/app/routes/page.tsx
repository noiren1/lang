'use client'

import { useState } from 'react'
import { ROUTES } from '@/lib/routes'
import { COUNTRIES } from '@/lib/data'
import { Clock, DollarSign, ChevronDown, ChevronUp, MapPin } from 'lucide-react'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-green-400 border-green-500/30 bg-green-500/10',
  medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  hard: 'text-red-400 border-red-500/30 bg-red-500/10',
}

export default function RoutesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const tags = ['all', ...Array.from(new Set(ROUTES.flatMap(r => r.tags)))]

  const filtered = filter === 'all' ? ROUTES : ROUTES.filter(r => r.tags.includes(filter))

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            🗺️ Готовые маршруты
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            8 проверенных маршрутов — от бюджетных до приключенческих
          </p>
        </div>

        {/* Tags filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === tag ? 'var(--accent)' : 'var(--bg-card)',
                color: filter === tag ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {tag === 'all' ? 'Все маршруты' : tag}
            </button>
          ))}
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-4">
          {filtered.map(route => {
            const isOpen = expanded === route.id
            const countriesInfo = route.countries
              .map(code => COUNTRIES.find(c => c.code === code))
              .filter(Boolean)

            return (
              <div
                key={route.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
              >
                {/* Header */}
                <button
                  className="w-full p-5 text-left"
                  onClick={() => setExpanded(isOpen ? null : route.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{route.emoji}</span>
                        <div>
                          <h2 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                            {route.title}
                          </h2>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {countriesInfo.map(c => (
                              <span key={c!.code} className="text-sm">{c!.flag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {route.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <Clock size={14} /> {route.duration}
                        </span>
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <DollarSign size={14} /> {route.totalBudget}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOR[route.difficulty]}`}>
                          {DIFFICULTY_LABEL[route.difficulty]}
                        </span>
                        {route.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </button>

                {/* Expanded stops */}
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="h-px mb-5" style={{ background: 'var(--border)' }} />
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-secondary)' }}>
                      МАРШРУТ — {route.stops.reduce((s, stop) => s + stop.days, 0)} ДНЕЙ
                    </h3>
                    <div className="relative">
                      {/* Timeline line */}
                      <div
                        className="absolute left-4 top-0 bottom-0 w-0.5"
                        style={{ background: 'var(--border)' }}
                      />
                      <div className="flex flex-col gap-4">
                        {route.stops.map((stop, i) => {
                          const countryInfo = COUNTRIES.find(c => c.code === stop.country)
                          return (
                            <div key={i} className="flex gap-4 pl-10 relative">
                              {/* Dot */}
                              <div
                                className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2"
                                style={{
                                  background: 'var(--accent)',
                                  borderColor: 'var(--bg-card)',
                                }}
                              />
                              <div className="flex-1 rounded-xl p-3" style={{ background: 'var(--bg-secondary)' }}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span>{countryInfo?.flag}</span>
                                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                      {stop.city}
                                    </span>
                                  </div>
                                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    {stop.days} {stop.days === 1 ? 'день' : stop.days < 5 ? 'дня' : 'дней'}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {stop.highlights.map((h, j) => (
                                    <span
                                      key={j}
                                      className="text-xs px-2 py-0.5 rounded-full"
                                      style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                                    >
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
