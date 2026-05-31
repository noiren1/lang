'use client'

import { useState } from 'react'
import { CHECKLIST } from '@/lib/checklist'
import { CheckCircle2, Circle } from 'lucide-react'

export default function ChecklistPage() {
  const total = CHECKLIST.reduce((s, sec) => s + sec.items.length, 0)
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const reset = () => setChecked(new Set())
  const pct = Math.round((checked.size / total) * 100)

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
            ✅ Чеклист путешественника
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Отметь всё до вылета — и лети спокойно
          </p>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-6 glass">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Готовность к поездке
            </span>
            <span className="font-black text-xl text-gradient">{pct}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
            <div
              className="h-full rounded-full accent-gradient transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>{checked.size} из {total} выполнено</span>
            {checked.size > 0 && (
              <button onClick={reset} className="hover:underline" style={{ color: 'var(--accent)' }}>
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {CHECKLIST.map(section => {
            const sectionChecked = section.items.filter(i => checked.has(i.id)).length
            return (
              <div key={section.id} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {/* Section header */}
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--bg-card)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{section.emoji}</span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{section.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${section.color}`}>
                      {sectionChecked}/{section.items.length}
                    </span>
                  </div>
                  {sectionChecked === section.items.length && (
                    <span className="text-green-400 text-sm font-medium">✓ Готово!</span>
                  )}
                </div>

                {/* Items */}
                <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                  {section.items.map(item => {
                    const done = checked.has(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="w-full px-5 py-3 flex items-start gap-3 text-left transition-colors"
                        style={{ background: done ? 'var(--bg-hover)' : 'var(--bg-secondary)' }}
                      >
                        <div className="mt-0.5 flex-shrink-0" style={{ color: done ? 'var(--accent)' : 'var(--text-secondary)' }}>
                          {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{item.emoji}</span>
                            <span
                              className="text-sm font-medium"
                              style={{
                                color: done ? 'var(--text-secondary)' : 'var(--text-primary)',
                                textDecoration: done ? 'line-through' : 'none',
                              }}
                            >
                              {item.label}
                            </span>
                          </div>
                          {item.detail && (
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {pct === 100 && (
          <div className="mt-8 rounded-2xl p-6 text-center accent-gradient text-white">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-xl font-black mb-1">Ты готов к поездке!</h2>
            <p className="opacity-90">Все пункты выполнены. Приятного путешествия!</p>
          </div>
        )}
      </div>
    </div>
  )
}
