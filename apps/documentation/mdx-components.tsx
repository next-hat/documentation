import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

const components = getThemeComponents()
export function useMDXComponents(overrides = {}) {
  return { ...components, ...overrides }
}
