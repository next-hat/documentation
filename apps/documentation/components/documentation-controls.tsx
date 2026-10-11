'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Languages, Moon, Sun } from 'lucide-react'
import { Button } from '@next-hat/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@next-hat/ui/components/ui/dropdown-menu'
import { locales, languageNames, localePath, type Locale } from '@/lib/locales'

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname()
  const [suffix, setSuffix] = useState('')
  useEffect(() => {
    const update = () => setSuffix(window.location.search + window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [pathname])
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" aria-label={label}><Languages data-icon="inline-start" /><span className="language-name">{languageNames[locale]}</span></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end"><DropdownMenuGroup>
      {locales.map(language => <DropdownMenuItem asChild key={language}>
        <a href={localePath(pathname, language) + suffix} lang={language} hrefLang={language} aria-current={language === locale ? 'page' : undefined}>
          {languageNames[language]}
        </a>
      </DropdownMenuItem>)}
    </DropdownMenuGroup></DropdownMenuContent>
  </DropdownMenu>
}

export function ThemeSwitcher({ labels }: { labels: { toggle: string; light: string; dark: string; system: string } }) {
  const { theme, setTheme } = useTheme()
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={labels.toggle}><Sun aria-hidden="true" className="dark:hidden" /><Moon aria-hidden="true" className="hidden dark:block" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end"><DropdownMenuGroup><DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">{labels.light}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">{labels.dark}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">{labels.system}</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup></DropdownMenuGroup></DropdownMenuContent>
  </DropdownMenu>
}
