import type { Metadata } from 'next'
import Link from 'next/link'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import logo from '@next-hat/ui/images/logo3.png'
import { ThemeSwitcher } from '@next-hat/ui/components/theme-switcher'
import RedocStyleRegistry from '@/components/redoc-style-registry'
import { pageMetadata, serializeJsonLd, siteSchema, SITE_URL } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  ...pageMetadata(getSeoPage('/')),
  metadataBase: new URL(SITE_URL),
  title: { default: 'Next Hat Documentation', template: '%s — Next Hat Docs' },
  applicationName: 'Next Hat Docs',
  publisher: 'Next Hat', creator: 'Next Hat',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: { url: '/img/logo3.png', type: 'image/png' }, apple: '/img/logo3.png' },
  alternates: { types: { 'application/rss+xml': '/blog/rss.xml', 'application/atom+xml': '/blog/atom.xml', 'application/feed+json': '/blog/feed.json' } }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" dir="ltr" suppressHydrationWarning>
    <Head color={{ hue: { light: 17.5, dark: 24.6 }, saturation: { light: 88.3, dark: 95 }, lightness: { light: 40.4, dark: 53.1 } }} backgroundColor={{ light: "rgb(249, 250, 251)", dark: "rgb(0, 0, 0)" }} />
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteSchema) }} />
      <RedocStyleRegistry>
      <Layout pageMap={await getPageMap()}
        navbar={<Navbar className="docs-container" logo={<span className="brand"><Image src={logo} width={32} height={32} alt="" className="rounded-full" priority /><span>Next Hat <span className="brand-divider">/</span> <span className="brand-docs">Docs</span></span></span>}
          projectLink="https://github.com/next-hat/documentation">
          <nav className="header-links" aria-label="Sections">
            <Link href="/guides/summary">Guides</Link>
            <Link href="/manuals/summary">Manuals</Link>
            <Link href="/references/summary">References</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <ThemeSwitcher variant="ghost" size="icon-sm" />
        </Navbar>}
        footer={<Footer className="docs-container"><div className="site-footer"><div><a href="https://next-hat.com" className="footer-brand">Next Hat</a><p>Open tools. Your infrastructure.</p></div><nav aria-label="Footer"><a href="https://next-hat.com">Website ↗</a><a href="https://discord.gg/WV4Aac8uZg">Community ↗</a><Link href="/blog">Blog</Link></nav><span>© {new Date().getFullYear()} Next Hat & contributors</span></div></Footer>}
        docsRepositoryBase="https://github.com/next-hat/documentation/tree/master/apps/documentation"
        editLink="Edit this page on GitHub"
        feedback={{ content: 'Suggest an improvement', labels: 'documentation' }}
        sidebar={{ defaultMenuCollapseLevel: 1 }}
        toc={{ title: 'On this page', backToTop: true }}
        darkMode={false}
        nextThemes={{ defaultTheme: 'system', storageKey: 'next-hat-docs-theme' }}>
        {children}
      </Layout>
      </RedocStyleRegistry>
    </body>
  </html>
}
