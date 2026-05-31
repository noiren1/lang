'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { COUNTRIES } from '@/lib/data'
import { useRouter } from 'next/navigation'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const ISO_NUMERIC_TO_ALPHA2: Record<string, string> = {
  // Original 20
  '392': 'JP', '764': 'TH', '380': 'IT', '724': 'ES', '250': 'FR',
  '276': 'DE', '840': 'US', '826': 'GB', '792': 'TR', '300': 'GR',
  '360': 'ID', '620': 'PT', '784': 'AE', '036': 'AU', '356': 'IN',
  '704': 'VN', '484': 'MX', '504': 'MA', '170': 'CO', '604': 'PE',
  // Europe
  '528': 'NL', '056': 'BE', '040': 'AT', '756': 'CH', '203': 'CZ',
  '348': 'HU', '616': 'PL', '191': 'HR', '578': 'NO', '752': 'SE',
  '208': 'DK', '246': 'FI', '642': 'RO', '688': 'RS', '705': 'SI',
  '352': 'IS', '372': 'IE', '470': 'MT',
  // Asia
  '410': 'KR', '156': 'CN', '702': 'SG', '458': 'MY', '116': 'KH',
  '524': 'NP', '144': 'LK', '104': 'MM', '158': 'TW', '608': 'PH',
  '418': 'LA',
  // Americas
  '076': 'BR', '032': 'AR', '152': 'CL', '192': 'CU', '188': 'CR',
  '591': 'PA',
  // Middle East
  '400': 'JO', '376': 'IL', '512': 'OM', '634': 'QA',
  // Africa
  '818': 'EG', '404': 'KE', '834': 'TZ', '710': 'ZA', '231': 'ET',
  // Oceania
  '554': 'NZ',
}

export default function WorldMap() {
  const router = useRouter()
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string; flag: string } | null>(null)

  const countrySet = new Set(COUNTRIES.map(c => c.code))

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <ComposableMap
        projectionConfig={{ scale: 147, center: [10, 10] }}
        className="w-full"
        style={{ height: 'auto' }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numericId = geo.id != null ? geo.id.toString().padStart(3, '0') : ''
                const alpha2 = numericId ? (ISO_NUMERIC_TO_ALPHA2[numericId] || null) : null
                const isAvailable = alpha2 ? countrySet.has(alpha2) : false
                const country = isAvailable ? COUNTRIES.find(c => c.code === alpha2) : null
                const isHovered = hoveredCountry === alpha2

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (country) router.push(`/countries/${country.code.toLowerCase()}`)
                    }}
                    onMouseEnter={(e) => {
                      if (country) {
                        setHoveredCountry(alpha2)
                        setTooltip({
                          x: e.clientX,
                          y: e.clientY,
                          name: country.name,
                          flag: country.flag,
                        })
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null)
                      setTooltip(null)
                    }}
                    style={{
                      default: {
                        fill: isAvailable
                          ? isHovered ? 'var(--accent)' : 'var(--accent-glow, rgba(99,102,241,0.4))'
                          : 'var(--bg-hover, #22223a)',
                        stroke: 'var(--bg-secondary)',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isAvailable ? 'pointer' : 'default',
                        transition: 'fill 0.2s',
                      },
                      hover: {
                        fill: isAvailable ? 'var(--accent)' : 'var(--bg-hover)',
                        stroke: 'var(--bg-secondary)',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-xl text-sm font-medium glass"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 40,
            color: 'var(--text-primary)',
          }}
        >
          {tooltip.flag} {tooltip.name}
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: 'var(--accent)', opacity: 0.6 }} />
          Есть гайд
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: 'var(--bg-hover)' }} />
          Скоро
        </span>
      </div>
    </div>
  )
}
