import Link from 'next/link'
import { COUNTRIES, UNIVERSAL_TIPS, CATEGORIES } from '@/lib/data'
import CountryCard from '@/components/CountryCard'
import TipCard from '@/components/TipCard'
import WorldMapClient from '@/components/WorldMapClient'

export default function Home() {
  const featuredCountries = COUNTRIES.slice(0, 6)
  const featuredTips = UNIVERSAL_TIPS.slice(0, 6)

  const stats = [
    { value: `${COUNTRIES.length}+`, label: 'Стран' },
    { value: `${UNIVERSAL_TIPS.length}+`, label: 'Универсальных советов' },
    { value: `${CATEGORIES.length}`, label: 'Категорий' },
    { value: '100%', label: 'Проверено' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-glow), transparent)',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 glass animate-fade-up"
            style={{ color: 'var(--text-secondary)' }}>
            ✈️ Твой проводник по миру
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', color: 'var(--text-primary)' }}>
            Путешествуй{' '}
            <span className="text-gradient">умнее</span>,<br />
            не просто{' '}
            <span className="text-gradient">дальше</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s', color: 'var(--text-secondary)' }}>
            Реальные лайфхаки, подробные гайды по всем странам мира и советы, которые
            реально работают — собраны в одном месте.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/countries"
              className="px-8 py-3.5 rounded-xl font-semibold accent-gradient text-white transition-transform hover:scale-105"
            >
              🌍 Выбрать страну
            </Link>
            <Link
              href="/tips"
              className="px-8 py-3.5 rounded-xl font-semibold glass transition-transform hover:scale-105"
              style={{ color: 'var(--text-primary)' }}
            >
              💡 Все лайфхаки
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center glass card-hover">
              <div className="text-3xl font-black text-gradient">{s.value}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* World Map */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              🗺️ Карта путешествий
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Нажми на подсвеченную страну чтобы открыть гайд
            </p>
          </div>
          <WorldMapClient />
        </div>
      </section>

      {/* Featured Countries */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                🌏 Популярные направления
              </h2>
              <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                Подробные гайды с реальными советами
              </p>
            </div>
            <Link
              href="/countries"
              className="hidden md:flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
            >
              Все страны →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCountries.map(c => (
              <CountryCard key={c.code} country={c} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/countries" className="px-6 py-2.5 rounded-xl text-sm font-medium glass" style={{ color: 'var(--accent)' }}>
              Все страны ({COUNTRIES.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tips */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                💡 Топ лайфхаков
              </h2>
              <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                Работают для любой страны и любого путешественника
              </p>
            </div>
            <Link href="/tips" className="hidden md:flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium" style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}>
              Все советы →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredTips.map((tip, i) => (
              <TipCard key={i} tip={tip} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/tips" className="px-6 py-2.5 rounded-xl text-sm font-medium glass" style={{ color: 'var(--accent)' }}>
              Все лайфхаки ({UNIVERSAL_TIPS.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
            📂 Категории советов
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/tips?category=${cat.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-transform hover:scale-105 ${cat.color}`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 text-center" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
        <div className="text-2xl mb-2">✈️</div>
        <p className="text-sm">WanderGuide — путешествуй умнее</p>
      </footer>
    </div>
  )
}
