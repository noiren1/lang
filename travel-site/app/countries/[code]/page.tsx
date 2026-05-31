import { COUNTRIES, CATEGORIES } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TipCard from '@/components/TipCard'
import { MapPin, Clock, Wallet, FileText, Globe, ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ code: c.code.toLowerCase() }))
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const country = COUNTRIES.find(c => c.code.toLowerCase() === code.toLowerCase())
  if (!country) notFound()

  const categoryGroups = CATEGORIES.map(cat => ({
    cat,
    tips: country.tips.filter(t => t.category === cat.id),
  })).filter(g => g.tips.length > 0)

  const meta = [
    { icon: <MapPin size={14} />, label: 'Столица', value: country.capital },
    { icon: <Wallet size={14} />, label: 'Бюджет/день', value: country.budget },
    { icon: <Clock size={14} />, label: 'Лучшее время', value: country.bestTime },
    { icon: <FileText size={14} />, label: 'Виза', value: country.visa },
    { icon: <Globe size={14} />, label: 'Язык', value: country.language },
    { icon: <span className="text-xs">💰</span>, label: 'Валюта', value: country.currency },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <div
        className="relative px-4 pt-12 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--accent-glow) 0%, transparent 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/countries" className="inline-flex items-center gap-1.5 text-sm mb-6 hover:underline" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={14} /> Все страны
          </Link>

          <div className="flex items-start gap-5 flex-wrap">
            <span className="text-7xl md:text-8xl animate-float">{country.flag}</span>
            <div className="flex-1">
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{country.region}</p>
              <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
                {country.name}
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {country.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Meta cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {meta.map(m => (
            <div key={m.label} className="rounded-xl p-4 glass">
              <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)' }}>{m.icon}</span>
                {m.label}
              </div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            📍 Главные направления
          </h2>
          <div className="flex flex-wrap gap-2">
            {country.highlights.map(h => (
              <span
                key={h}
                className="px-3 py-1.5 rounded-xl text-sm font-medium"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Tips by category */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            💡 Советы и лайфхаки
          </h2>

          {categoryGroups.map(({ cat, tips }) => (
            <div key={cat.id} className="mb-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border mb-4 ${cat.color}`}>
                {cat.emoji} {cat.label}
              </div>
              <div className="grid gap-3">
                {tips.map((tip, i) => (
                  <TipCard key={i} tip={tip} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link href="/countries" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium glass transition-transform hover:scale-105" style={{ color: 'var(--text-primary)' }}>
            <ArrowLeft size={16} /> Назад к странам
          </Link>
        </div>
      </div>
    </div>
  )
}
