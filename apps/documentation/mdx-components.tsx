import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { ComponentProps } from 'react'

const components = getThemeComponents()
function DocumentationImage(props: ComponentProps<typeof components.img>) {
  // Next's development blur URL needs image optimization, which static export disables.
  const placeholder = process.env.NODE_ENV === 'development' && props.placeholder === 'blur' ? 'empty' : props.placeholder
  return <components.img {...props} placeholder={placeholder} />
}
export function useMDXComponents(overrides = {}) {
  return { ...components, img: DocumentationImage, ...overrides }
}
