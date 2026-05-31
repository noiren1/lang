'use client'

import Link from 'next/link'
import { Country } from '@/lib/data'
import { MapPin, Clock, Wallet, FileText } from 'lucide-react'

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link href={`/countries/${country.code.toLowerCase()}`}>
      <div
        className="rounded-2xl p-5 card-hover h-full flex flex-col gap-3"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-4xl">{country.flag}</span>
            <h3 className="font-bold text-lg mt-1" style={{ color: 'var(--text-primary)' }}>
              {country.name}
            </h3>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {country.region}
            </span>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
            style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            {country.tips.length} советов
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {country.description}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <Wallet size={12} style={{ color: 'var(--accent)' }} />
            {country.budget}/день
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <Clock size={12} style={{ color: 'var(--accent)' }} />
            {country.bestTime.split(',')[0]}
          </div>
          <div className="flex items-center gap-1.5 text-xs col-span-2" style={{ color: 'var(--text-secondary)' }}>
            <FileText size={12} style={{ color: 'var(--accent)' }} />
            {country.visa}
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {country.highlights.slice(0, 3).map(h => (
            <span
              key={h}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
            >
              📍 {h}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
