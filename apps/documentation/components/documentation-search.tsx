import { Search } from 'nextra/components'
import { translate } from '@/lib/translate'
import type { Locale } from '@/lib/locales'
export function DocumentationSearch({ locale = 'en' }: { locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><header className="section-heading"><span className="eyebrow">{t('Next Hat Docs')}</span><h1>{t('Find what you need.')}</h1><p>{t('Search guides, commands, examples, and release notes.')}</p></header><Search placeholder={t('Search documentation…')} emptyResult={t('No results found.')} errorText={t('Search failed.')} loading={t('Searching…')} /></main>
}
