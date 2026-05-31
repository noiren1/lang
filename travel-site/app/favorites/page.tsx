'use client'

import { useState, useEffect } from 'react'
import { COUNTRIES } from '@/lib/data'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('wg_favorites') || '[]') as string[]
    setFavorites(favs)
    setLoaded(true)
  }, [])

  const remove = (code: string) => {
    const next = favorites.filter(c => c !== code)
    setFavorites(next)
    localStorage.setItem('wg_favorites', JSON.stringify(next))
  }

  const favCountries = COUNTRIES.filter(c => favorites.includes(c.code))

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            ❤️ Избранные страны
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {loaded ? `${favCountries.length} стран в избранном` : 'Загрузка...'}
          </p>
        </div>

        {loaded && favCountries.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
              Пока ничего не добавлено
            </p>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium accent-gradient text-white"
            >
              Посмотреть все страны <ArrowRight size={16} />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favCountries.map(country => (
            <div
              key={country.code}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{country.flag}</span>
                  <button
                    onClick={() => remove(country.code)}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)' }}
                    title="Убрать из избранного"
                  >
                    <Heart size={16} fill="#ef4444" />
                  </button>
                </div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>{country.region}</p>
                <h3 className="font-black text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                  {country.name}
                </h3>
                <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {country.description}
                </p>
                <div className="flex items-center justify-between text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <span>📍 {country.capital}</span>
                  <span>💰 {country.budget}</span>
                </div>
                <Link
                  href={`/countries/${country.code.toLowerCase()}`}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                >
                  Открыть гайд <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
