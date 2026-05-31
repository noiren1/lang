'use client'

import { Tip, CATEGORIES } from '@/lib/data'

export default function TipCard({ tip }: { tip: Tip }) {
  const cat = CATEGORIES.find(c => c.id === tip.category)

  return (
    <div
      className="rounded-2xl p-4 card-hover cursor-default"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{tip.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {tip.tip}
            </h3>
            {cat && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${cat.color} flex-shrink-0`}>
                {cat.emoji} {cat.label}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {tip.description}
          </p>
        </div>
      </div>
    </div>
  )
}
