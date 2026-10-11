import 'server-only'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Locale } from './locales'
const dictionaries = new Map<string, Record<string, string>>()
function dictionary(locale: Locale, kind = '') {
  const key = `${kind}${locale}`
  if (!dictionaries.has(key)) {
    dictionaries.set(key, JSON.parse(readFileSync(join(process.cwd(), 'lib/translations', `${key}.json`), 'utf8')))
  }
  return dictionaries.get(key)!
}
export function translate(locale: Locale, text: string): string {
  if (locale === 'en') return text.replaceAll('&apos;', "'")
  const texts = dictionary(locale)
  if (!Object.hasOwn(texts, text)) throw new Error(`Missing ${locale} interface translation: ${text}`)
  return texts[text]
}
export function translateSpec<T>(spec: T, locale: Locale): T {
  if (locale === 'en') return spec
  const translated = structuredClone(spec)
  const texts = dictionary(locale, 'spec.')
  function visit(value: unknown): void {
    if (!value || typeof value !== 'object') return
    const object = value as Record<string, unknown>
    for (const [key, child] of Object.entries(object)) {
      if ((key === 'description' || key === 'summary') && typeof child === 'string') {
        if (!Object.hasOwn(texts, child)) throw new Error(`Missing ${locale} API translation: ${child}`)
        object[key] = texts[child]
      } else visit(child)
    }
  }
  visit(translated)
  return translated
}
