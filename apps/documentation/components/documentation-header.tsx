'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { GitHubIcon } from 'nextra/icons'
import { setMenu, useMenu, useThemeConfig } from 'nextra-theme-docs'
import { PublicHeader, PublicHeaderBrand, PublicHeaderLink, PublicHeaderNavigation } from '@next-hat/ui/components/header/public-header'
import { Button } from '@next-hat/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@next-hat/ui/components/ui/dropdown-menu'
import { LanguageSwitcher, ThemeSwitcher } from './documentation-controls'
import { localePath, routeLocale, type Locale } from '@/lib/locales'
import type { ComponentProps } from 'react'

export function DocumentationHeader({ locale, labels }: {
  locale: Locale
  labels: {
    docs: string
    sections: string
    guides: string
    manuals: string
    references: string
    blog: string
    language: string
    theme: ComponentProps<typeof ThemeSwitcher>['labels']
  }
}) {
  const { search } = useThemeConfig()
  const menu = useMenu()
  const pathname = routeLocale(usePathname()).path
  const links = [
    { path: '/guides', href: '/guides/summary', label: labels.guides },
    { path: '/manuals', href: '/manuals/summary', label: labels.manuals },
    { path: '/references', href: '/references/summary', label: labels.references },
    { path: '/blog', href: '/blog', label: labels.blog }
  ]
  const active = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return <PublicHeader brand={<PublicHeaderBrand homeHref={localePath('/', locale)} section={labels.docs} />}>
    {search && <div className="hidden md:block">{search}</div>}
    <a href="https://github.com/next-hat/documentation" aria-label="GitHub" className="flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
      <GitHubIcon height="24" aria-hidden="true" />
    </a>
    <PublicHeaderNavigation className="lg:hidden xl:flex" aria-label={labels.sections}>
      {links.map(link => <PublicHeaderLink key={link.path} href={localePath(link.href, locale)} active={active(link.path)}>{link.label}</PublicHeaderLink>)}
    </PublicHeaderNavigation>
    <LanguageSwitcher locale={locale} label={labels.language} />
    <ThemeSwitcher labels={labels.theme} />
    <div className="hidden md:block xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={labels.sections}><Menu aria-hidden="true" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end"><DropdownMenuGroup>
          {links.map(link => <DropdownMenuItem asChild key={link.path}><Link href={localePath(link.href, locale)} aria-current={active(link.path) ? 'page' : undefined}>{link.label}</Link></DropdownMenuItem>)}
        </DropdownMenuGroup></DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Button variant="ghost" size="icon" className="md:hidden" aria-label={labels.sections} aria-expanded={menu} onClick={() => setMenu(previous => !previous)}>
      {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </Button>
  </PublicHeader>
}
