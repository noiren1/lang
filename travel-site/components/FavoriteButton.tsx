'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function FavoriteButton({ countryCode, countryName }: { countryCode: string; countryName: string }) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('wg_favorites') || '[]') as string[]
    setIsFav(favs.includes(countryCode))
  }, [countryCode])

  const toggle = () => {
    const favs = JSON.parse(localStorage.getItem('wg_favorites') || '[]') as string[]
    let next: string[]
    if (favs.includes(countryCode)) {
      next = favs.filter(c => c !== countryCode)
    } else {
      next = [...favs, countryCode]
    }
    localStorage.setItem('wg_favorites', JSON.stringify(next))
    setIsFav(!isFav)
  }

  return (
    <button
      onClick={toggle}
      title={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
      className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
      style={{
        background: isFav ? 'rgba(239,68,68,0.15)' : 'var(--bg-card)',
        color: isFav ? '#ef4444' : 'var(--text-secondary)',
        border: `1px solid ${isFav ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`,
      }}
    >
      <Heart size={16} fill={isFav ? '#ef4444' : 'none'} />
      {isFav ? 'В избранном' : 'В избранное'}
    </button>
  )
}
