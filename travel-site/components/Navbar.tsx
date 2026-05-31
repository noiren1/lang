'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Globe, Map, Lightbulb, Menu, X, Sun, Moon, Compass } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const themes = [
    { id: 'dark' as const, icon: <Moon size={14} />, label: 'Тёмная' },
    { id: 'light' as const, icon: <Sun size={14} />, label: 'Светлая' },
    { id: 'adventure' as const, icon: <Compass size={14} />, label: 'Авантюра' },
  ]

  const links = [
    { href: '/', label: 'Главная', icon: <Globe size={16} /> },
    { href: '/countries', label: 'Страны', icon: <Map size={16} /> },
    { href: '/tips', label: 'Лайфхаки', icon: <Lightbulb size={16} /> },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl animate-float">✈️</span>
          <span className="text-gradient">WanderGuide</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:bg-white/10 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
        </div>

        {/* Theme switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: theme === t.id ? 'var(--accent)' : 'transparent',
                color: theme === t.id ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {t.icon}
              <span className="hidden lg:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--text-primary)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t px-4 pb-4 pt-2 flex flex-col gap-2" style={{ borderColor: 'var(--border)' }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
              style={{ color: 'var(--text-primary)', background: 'var(--bg-hover)' }}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setMobileOpen(false) }}
                className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-lg text-sm transition-all"
                style={{
                  background: theme === t.id ? 'var(--accent)' : 'var(--bg-card)',
                  color: theme === t.id ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
