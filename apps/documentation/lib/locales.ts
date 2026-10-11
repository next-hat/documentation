export const locales = ['en', 'fr', 'ru', 'ja', 'zh-Hans'] as const
export type Locale = (typeof locales)[number]
export const translatedLocales = locales.filter(locale => locale !== 'en')
export const languageNames: Record<Locale, string> = { en: 'English', fr: 'Français', ru: 'Русский', ja: '日本語', 'zh-Hans': '简体中文' }
export const dateLocales: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR', ru: 'ru-RU', ja: 'ja-JP', 'zh-Hans': 'zh-CN' }
export const ogLocales: Record<Locale, string> = { en: 'en_US', fr: 'fr_FR', ru: 'ru_RU', ja: 'ja_JP', 'zh-Hans': 'zh_CN' }
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale) }
export function routeLocale(path: string): { locale: Locale; path: string } {
  const match = path.match(/^\/(fr|ru|ja|zh-Hans)(?=\/|[?#]|$)/)
  if (!match) return { locale: 'en', path }
  const rest = path.slice(match[0].length)
  return { locale: match[1] as Locale, path: rest.startsWith('/') ? rest : '/' + rest }
}
export function localePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const original = routeLocale(path).path
  if (locale === 'en') return original
  const [, pathname, suffix] = original.match(/^([^?#]*)(.*)$/)!
  return `/${locale}${pathname === '/' ? '' : pathname}${suffix}`
}
