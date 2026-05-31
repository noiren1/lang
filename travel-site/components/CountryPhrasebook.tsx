'use client'

import { useState } from 'react'
import { PHRASEBOOK } from '@/lib/phrasebook'
import { Volume2 } from 'lucide-react'
import Link from 'next/link'

const CAT_LABELS: Record<string, string> = {
  greeting: '👋 Приветствия',
  thanks: '🙏 Благодарность',
  help: '🆘 Помощь',
  food: '🍽️ Еда',
  transport: '🚌 Транспорт',
  shopping: '🛍️ Покупки',
  accommodation: '🏨 Жильё',
  emergency: '🚨 Экстренные',
  directions: '🧭 Маршрут',
  numbers: '🔢 Числа',
}

export default function CountryPhrasebook({ countryCode }: { countryCode: string }) {
  const [copied, setCopied] = useState<number | null>(null)
  const data = PHRASEBOOK.find(p => p.code === countryCode)
  if (!data) return null

  const copy = (text: string, i: number) => {
    navigator.clipboard.writeText(text)
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  const topPhrases = data.phrases.slice(0, 8)

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          💬 Разговорник
        </h2>
        <Link
          href="/phrasebook"
          className="text-sm hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          Все фразы →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {topPhrases.map((phrase, i) => (
          <div
            key={i}
            className="rounded-xl p-3 flex items-start justify-between gap-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                {CAT_LABELS[phrase.category] || phrase.category}
              </p>
              <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>
                {phrase.ru}
              </p>
              <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                {phrase.local}
              </p>
              <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                <Volume2 size={10} /> {phrase.pronunciation}
              </p>
            </div>
            <button
              onClick={() => copy(phrase.local, i)}
              className="flex-shrink-0 text-xs px-2 py-1 rounded-lg transition-all"
              style={{
                background: copied === i ? 'var(--accent)' : 'var(--bg-hover)',
                color: copied === i ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {copied === i ? '✓' : 'Копировать'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
