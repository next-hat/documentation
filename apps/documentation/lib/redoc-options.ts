import type { AppStore, RedocRawOptions, SideNavStyleEnum } from 'redoc'

export type RedocSpec = ConstructorParameters<typeof AppStore>[0]

/** The documentation's Next Hat tokens, expressed as colors Redoc can calculate. */
export function redocOptions(dark: boolean, embedded = false): RedocRawOptions {
  const primary = dark ? 'hsl(24.6, 95%, 53.1%)' : 'hsl(17.5, 88.3%, 40.4%)'
  const background = dark ? '#000000' : 'hsl(220, 20%, 98%)'
  const foreground = dark ? 'hsl(0, 0%, 96%)' : 'hsl(222.2, 47.4%, 11.2%)'
  const muted = dark ? 'hsl(0, 0%, 12%)' : 'hsl(220, 14%, 96%)'
  const secondary = dark ? 'hsl(0, 0%, 60%)' : 'hsl(215, 16%, 46%)'
  const border = dark ? 'hsl(0, 0%, 16%)' : 'hsl(220, 13%, 90%)'
  return {
    nativeScrollbars: true, scrollYOffset: 64, expandDefaultServerVariables: true, hideHostname: true,
    schemasExpansionLevel: 1, sortPropsAlphabetically: true, sortTagsAlphabetically: true,
    sideNavStyle: 'id-only' as SideNavStyleEnum, disableSearch: embedded, hideDownloadButtons: true,
    schemaDefinitionsTagName: embedded ? undefined : 'Schemas',
    theme: {
      colors: { primary: { main: primary }, text: { primary: foreground, secondary }, border: { light: border, dark: border } },
      spacing: { sectionHorizontal: embedded ? 0 : 24, sectionVertical: 32 },
      typography: {
        fontSize: '14px', lineHeight: '1.7', fontFamily: 'var(--font-sans)',
        headings: { fontFamily: 'var(--font-sans)', fontWeight: '600' },
        code: { fontFamily: 'var(--font-mono)', fontSize: '13px', wrap: true },
        links: { color: primary, visited: primary, hover: primary },
      },
      sidebar: {
        width: '240px', backgroundColor: background, textColor: secondary, activeTextColor: primary,
        groupItems: { activeBackgroundColor: muted }, level1Items: { activeBackgroundColor: muted },
      },
      schema: { nestedBackground: muted, linesColor: border, typeNameColor: primary, typeTitleColor: foreground },
      rightPanel: { backgroundColor: '#0f172a', textColor: '#f5f5f5', width: '35%' },
      codeBlock: { backgroundColor: '#0f172a' },
      fab: { backgroundColor: primary, color: dark ? '#171717' : '#ffffff' },
    },
  }
}
