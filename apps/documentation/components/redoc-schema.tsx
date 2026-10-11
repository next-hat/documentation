'use client'

import { useEffect } from 'react'
import { SchemaDefinition } from 'redoc'
import { ThemeProvider } from 'styled-components'
import type { RedocSpec } from '../lib/redoc-options'
import type { Locale } from '@/lib/locales'
import { useRedocStore } from './use-redoc-store'
import './open_api.css'

/** The embedded field/sample presentation previously supplied by Redocusaurus. */
export default function RedocSchema({ spec, pointer, example = false, locale = 'en' }: { spec: RedocSpec; pointer: string; example?: boolean; locale?: Locale }) {
  const { store, theme } = useRedocStore(spec, undefined, true, locale)
  useEffect(() => {
    // Embedded schemas have no API menu and must not take over the page hash.
    store.menu.dispose()
    return () => { store.dispose() }
  }, [store])
  return <ThemeProvider theme={store.options.theme}>
    <div className={`redoc-documentation redoc-schema${example ? '' : ' redoc-schema-no-example'}`}
      data-redoc-schema={pointer} data-redoc-example={String(example)}>
      <SchemaDefinition key={`${pointer}:${theme}`} parser={store.spec.parser} options={store.options}
        schemaRef={pointer} showExample={example} />
    </div>
  </ThemeProvider>
}
