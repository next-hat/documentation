import type { RedocSpec } from './redoc-options'

/** Adapt generated Rustdoc links without changing the published OpenAPI source. */
export function prepareRedocSpec(spec: RedocSpec, schemaBase = '', discriminatorLabel = 'Discriminator field:'): RedocSpec {
  const prepared = structuredClone(spec)
  const schemas = prepared.components?.schemas || {}

  // Redoc resolves relative servers against the browser's spec URL and encodes
  // braces before expanding variables. Expand the existing defaults first so
  // the same version path renders in exported HTML and during hydration.
  for (const server of prepared.servers || []) {
    if (!server.url.startsWith('/') || server.url.startsWith('//')) continue
    server.url = server.url.replace(/\{([\w.-]+)\}/g, (variable, name: string) => server.variables?.[name]?.default ?? variable)
  }

  function discriminatorValue(branch: unknown, field: string): string | undefined {
    if (!branch || typeof branch !== 'object') return
    const schema = branch as Record<string, unknown>
    const properties = schema.properties as Record<string, { enum?: unknown[] }> | undefined
    const values = properties?.[field]?.enum
    if (values?.length === 1 && typeof values[0] === 'string') return values[0]
    if (Array.isArray(schema.allOf)) {
      for (const part of schema.allOf) {
        const value = discriminatorValue(part, field)
        if (value !== undefined) return value
      }
    }
  }

  for (const schema of Object.values(schemas)) {
    if (!schema || typeof schema !== 'object' || '$ref' in schema) continue
    const discriminator = schema.discriminator
    const branches = schema.oneOf
    // Historical ReplicationMode specs use inline variants with fixed Mode enums.
    // Redoc drops these variants when it attempts implicit named-schema mapping.
    if (!discriminator || Object.hasOwn(discriminator, 'mapping') || !branches?.length
      || branches.some((branch) => '$ref' in branch)) continue
    const values = branches.map((branch) => discriminatorValue(branch, discriminator.propertyName))
    if (values.some((value) => value === undefined)) continue
    schema.description = `${schema.description || ''}\n\n${discriminatorLabel} \`${discriminator.propertyName}\`.`
    branches.forEach((branch, index) => { if (!branch.title) branch.title = values[index] })
    delete schema.discriminator
  }

  function description(text: string): string {
    // Keep fenced examples and inline code intact while retaining normal Markdown.
    return text.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]*`)/g).map((part, index) => {
      if (index % 2) return part
      return part.replace(/\[([^\]]+)\]\(((?:[^()]|\([^)]*\))*)\)/g, (link, label: string, target: string) => {
        if (/^(?:https?:\/\/|mailto:|tel:|#|\/)/.test(target)) return link
        if (Object.hasOwn(schemas, target)) return `[${label}](${schemaBase}#schema/${encodeURIComponent(target)})`
        // These relative destinations name Rust types/methods, not web pages.
        return `\`${label.replaceAll('`', '')}\``
      })
    }).join('')
  }
  function visit(value: unknown): void {
    if (!value || typeof value !== 'object') return
    for (const [key, child] of Object.entries(value)) {
      if (key === 'description' && typeof child === 'string') (value as Record<string, unknown>)[key] = description(child)
      else visit(child)
    }
  }
  visit(prepared)
  return prepared
}
