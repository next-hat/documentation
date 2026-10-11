'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import { AppStore } from 'redoc'
import type { Locale } from '@/lib/locales'
import { redocOptions, type RedocSpec } from '../lib/redoc-options'

export function useRedocStore(spec: RedocSpec, specUrl?: string, embedded = false, locale: Locale = 'en') {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  // The static export and first browser render use the same theme.
  const dark = mounted && resolvedTheme === 'dark'
  const store = useMemo(() => new AppStore(spec, specUrl, redocOptions(dark, embedded, locale)), [spec, specUrl, dark, embedded, locale])
  return { store, theme: dark ? 'dark' : 'light' }
}
