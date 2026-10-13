import type { Metadata } from 'next'
import Link from 'next/link'
import { Layout, Footer, LastUpdated } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { DocumentationHeader } from './documentation-header'
import { translate } from '@/lib/translate'
import { localePath, dateLocales, type Locale } from '@/lib/locales'
import RedocStyleRegistry from '@/components/redoc-style-registry'
import { pageMetadata, serializeJsonLd, siteSchema, SITE_URL } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import 'nextra-theme-docs/style.css'
import '@/app/globals.css'

export function documentationMetadata(locale: Locale): Metadata {
 return {
  ...pageMetadata(getSeoPage(localePath('/', locale))),
  metadataBase: new URL(SITE_URL),
  title: { default: translate(locale, 'Next Hat Documentation'), template: '%s — Next Hat Docs' },
  applicationName: 'Next Hat Docs',
  publisher: 'Next Hat', creator: 'Next Hat',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: { url: '/img/logo3.png', type: 'image/png' }, apple: '/img/logo3.png' },
  alternates: { types: { 'application/rss+xml': localePath('/blog/rss.xml', locale), 'application/atom+xml': localePath('/blog/atom.xml', locale), 'application/feed+json': localePath('/blog/feed.json', locale) } }
 }
}

export async function DocumentationLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const t = (text: string) => translate(locale, text)
  return <html lang={locale} dir="ltr" suppressHydrationWarning>
    <Head color={{ hue: { light: 17.5, dark: 24.6 }, saturation: { light: 88.3, dark: 95 }, lightness: { light: 40.4, dark: 53.1 } }} backgroundColor={{ light: "rgb(249, 250, 251)", dark: "rgb(0, 0, 0)" }} />
    <body>
      <script defer src="https://analytics.next-hat.com/script.js" data-website-id="4573c95a-5bb4-48c8-aff5-a52ef0545de9" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteSchema(locale)) }} />
      <RedocStyleRegistry>
      <Layout pageMap={await getPageMap(localePath('/', locale))}
        navbar={<DocumentationHeader locale={locale} labels={{ docs: t('Docs'), sections: t('Sections'), guides: t('Guides'), manuals: t('Manuals'), references: t('References'), blog: t('Blog'), language: t('Change language'), theme: { toggle: t('Toggle theme'), light: t('Light'), dark: t('Dark'), system: t('System') } }} />}
        footer={<Footer className="docs-container"><div className="site-footer"><div><a href="https://next-hat.com" className="footer-brand">Next Hat</a><p>{t('Open tools. Your infrastructure.')}</p></div><nav aria-label={t('Footer')}><a href="https://next-hat.com">{t('Website ↗')}</a><a href="https://discord.gg/WV4Aac8uZg">{t('Community ↗')}</a><Link href={localePath('/blog', locale)}>{t('Blog')}</Link></nav><span>© {new Date().getFullYear()} {t('Next Hat & contributors')}</span></div></Footer>}
        docsRepositoryBase="https://github.com/next-hat/documentation/tree/master/apps/documentation"
        editLink={t('Edit this page on GitHub')}
        feedback={{ content: t('Suggest an improvement'), labels: 'documentation' }}
        sidebar={{ defaultMenuCollapseLevel: 1 }}
        toc={{ title: t('On this page'), backToTop: t('Scroll to top') }}
        search={<Search placeholder={t('Search documentation…')} emptyResult={t('No results found.')} errorText={t('Search failed.')} loading={t('Searching…')} />}
        lastUpdated={<LastUpdated locale={dateLocales[locale]}>{t('Last updated on')}</LastUpdated>}
        darkMode={false}
        nextThemes={{ defaultTheme: 'system', storageKey: 'next-hat-docs-theme' }}>
        {children}
      </Layout>
      </RedocStyleRegistry>
    </body>
  </html>
}
