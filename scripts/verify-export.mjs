import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { locales, localePath, routeLocale, ogLocales } from '../apps/documentation/lib/locales.ts'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(repository, 'apps/documentation/out')
if (!existsSync(output)) {
  console.error('Build the documentation before verifying its static export (apps/documentation/out is missing).')
  process.exit(1)
}
const inventory = JSON.parse(readFileSync(join(repository, 'scripts/migrate-content.inventory.json'), 'utf8'))
const { parse: parseYaml } = createRequire(join(repository, 'apps/documentation/package.json'))('yaml')
const posts = JSON.parse(readFileSync(join(repository, 'apps/documentation/lib/blog-posts.json'), 'utf8'))
const translatedLabels = new Map(locales.filter(locale => locale !== 'en').map(locale => [locale, JSON.parse(readFileSync(join(repository, 'apps/documentation/lib/translations', `${locale}.json`), 'utf8'))]))
const translate = (locale, text) => locale === 'en' ? text : translatedLabels.get(locale)[text] || text
const postsByLocale = new Map(locales.map(locale => [locale, posts.map(post => {
  if (locale === 'en') return post
  const source = readFileSync(join(repository, 'apps/documentation/content', locale, 'blog', `${post.slug}.mdx`), 'utf8')
  const metadata = parseYaml(source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)[1])
  return { ...post, title: metadata.title, route: localePath(post.route, locale) }
})]))
const postByRoute = new Map([...postsByLocale.values()].flat().map(post => [post.route, post]))
const walk = directory => readdirSync(directory).flatMap(name => {
  const path = join(directory, name)
  return statSync(path).isDirectory() ? walk(path) : [path]
})
const files = walk(output)
const htmlFiles = files.filter(path => path.endsWith('.html'))
const origin = 'https://docs.next-hat.com'
const decodeEntities = text => text.replace(/&(?:amp|quot|apos|lt|gt|#39|#\d+|#x[\da-f]+);/gi, entity => {
  const fixed = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>' }
  return fixed[entity] || String.fromCodePoint(entity[2]?.toLowerCase() === 'x' ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10))
})
const stripTags = html => decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
const attributes = tag => Object.fromEntries([...tag.matchAll(/\b([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(match => [match[1], decodeEntities(match[2] ?? match[3])]))
const routeForFile = path => {
  const route = '/' + relative(output, path).replace(/\.html$/, '')
  return route.replace(/\/index$/, '') || '/'
}
const records = new Map(htmlFiles.map(path => {
  const html = readFileSync(path, 'utf8')
  const ids = new Set([...html.matchAll(/\bid=(?:"([^"]*)"|'([^']*)')/g)].map(match => decodeEntities(match[1] ?? match[2])))
  return [path, { html, ids, route: routeForFile(path) }]
}))
const failures = []
const nonIndexableRoutes = new Set(['/404', '/_not-found', ...locales.map(locale => localePath('/search', locale))])
const indexableRecords = [...records.values()].filter(record => !nonIndexableRoutes.has(record.route))
const sourceModified = new Map(walk(join(repository, 'apps/documentation/content')).filter(path => /\.mdx?$/.test(path)).flatMap(path => {
  const source = readFileSync(path, 'utf8').match(/^---\r?\n(.*?)\r?\n---\r?\n/s)?.[1] || ''
  const timestamp = source.match(/^timestamp:\s*(\d+)\s*$/m)?.[1]
  if (!timestamp) return []
  const route = ('/' + relative(join(repository, 'apps/documentation/content'), path).replace(/\.mdx?$/, '')).replace(/\/index$/, '') || '/'
  return [[route, new Date(Number(timestamp)).toISOString()]]
}))
const resolveExport = pathname => {
  let decoded
  try { decoded = decodeURIComponent(pathname) } catch { return null }
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return null
  const base = join(output, decoded)
  return [base + '.html', join(base, 'index.html'), base].find(path => existsSync(path) && statSync(path).isFile()) || null
}
const tagSlug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const englishRequiredRoutes = [
  ...inventory.pages.map(page => page.route), '/', '/blog', '/blog/archive', '/blog/tags', '/blog/authors', '/search',
  ...new Set(posts.flatMap(post => post.tags.map(tag => '/blog/tags/' + tagSlug(tag)))),
  ...Array.from({ length: 7 }, (_, index) => `/references/nanocl/daemon/v0.${12 + index}`)
]
const requiredRoutes = [...new Set(locales.flatMap(locale => englishRequiredRoutes.map(route => localePath(route, locale))))]
for (const route of requiredRoutes) if (!resolveExport(route)) failures.push(`Missing exported route: ${route}`)

let checkedLinks = 0
let checkedFragments = 0
for (const [path, { html, route }] of records) {
  const visible = html.replace(/(<script\b[^>]*>).*?<\/script>/gs, '$1</script>')
  for (const tag of visible.matchAll(/<(?:a|link|script|img|iframe|source|video|audio|use)\b[^>]*>/g)) {
    const attrs = attributes(tag[0])
    const references = [attrs.href, attrs.src, attrs.poster]
    if (attrs.srcset) references.push(...attrs.srcset.split(',').map(candidate => candidate.trim().split(/\s+/)[0]))
    for (const reference of references.filter(Boolean)) {
      let url
      try { url = new URL(reference, origin + route) } catch {
        failures.push(`${route}: invalid URL ${reference}`)
        continue
      }
      if (url.origin !== origin || !/^https?:$/.test(url.protocol)) continue
      const target = resolveExport(url.pathname)
      checkedLinks++
      if (!target) {
        failures.push(`${route}: missing local target ${reference}`)
        continue
      }
      if (url.hash && records.has(target)) {
        let fragment
        try { fragment = decodeURIComponent(url.hash.slice(1)) } catch {
          failures.push(`${route}: invalid fragment ${reference}`)
          continue
        }
        if (fragment.startsWith(':~:text=')) continue
        checkedFragments++
        if (!records.get(target).ids.has(fragment)) failures.push(`${route}: missing fragment ${reference}`)
      }
    }
  }
  if (/vundefined|\/undefined(?:[\s"<]|$)|\$NANOCL_VERSION|\$NCPROXY_VERSION|\$NCDNS_VERSION/.test(stripTags(visible))) failures.push(`${route}: unresolved documentation version interpolation`)
}

// References must be present in the static export, including when JavaScript is disabled.
const apiMethods = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'])
const daemonSpecs = new Map(Array.from({ length: 7 }, (_, index) => {
  const version = `0.${12 + index}`
  return [version, parseYaml(readFileSync(join(repository, 'apps/documentation/public/specs/nanocld', `${version}.yaml`), 'utf8'))]
}))
const renderedReference = record => record.html.replace(/<(script|style)\b[^>]*>.*?<\/\1>/gs, '')
const hasRedocStyles = html => /<style\b[^>]*\bdata-styled=/.test(html)
let checkedRedocOperations = 0
let checkedRedocSchemas = 0
for (const locale of locales) for (const [version, spec] of daemonSpecs) {
  const route = localePath(`/references/nanocl/daemon/v${version}`, locale)
  const record = records.get(resolveExport(route))
  if (!record) continue
  const expected = new Set(Object.values(spec.paths).flatMap(path => Object.entries(path)
    .filter(([method]) => apiMethods.has(method)).map(([, operation]) => operation.operationId)))
  const rendered = new Set([...record.ids].filter(id => id.startsWith('operation/')).map(id => id.slice('operation/'.length)))
  for (const operation of expected) {
    checkedRedocOperations++
    if (!rendered.has(operation)) failures.push(`${route}: operation ${operation} missing from server-rendered Redoc`)
  }
  for (const operation of rendered) if (!expected.has(operation)) failures.push(`${route}: unexpected operation ${operation}, possibly rendered from another version`)
  if (!hasRedocStyles(record.html)) failures.push(`${route}: missing server-rendered Redoc styles`)
  const viewer = [...renderedReference(record).matchAll(/<[^>]+\bdata-redoc-version=[^>]+>/g)]
    .map(match => attributes(match[0])).find(attrs => attrs['data-redoc-version'] === version)
  if (!viewer) failures.push(`${route}: missing the matching Redoc version in exported HTML`)
}
const inlineSchemas = [
  ['/references/nanocl/statefile', 'Statefile'],
  ['/references/nanocl/objects/cargo', 'CargoSpec'],
  ['/references/nanocl/objects/job', 'JobPartial'],
  ['/references/nanocl/objects/resource', 'ResourceProxyRule'],
  ['/references/nanocl/objects/resource', 'ResourceDnsRule'],
  ['/references/nanocl/objects/secret', 'ProxySslConfig'],
  ['/references/nanocl/objects/virtual-machine', 'VmSpecPartial']
]
for (const locale of locales) for (const [originalRoute, name] of inlineSchemas) {
  const route = localePath(originalRoute, locale)
  const record = records.get(resolveExport(route))
  if (!record) continue
  const visible = renderedReference(record)
  const wrappers = [...visible.matchAll(/<[^>]+\bdata-redoc-schema=[^>]+>/g)].map(match => attributes(match[0]))
  const wrapper = wrappers.find(attrs => attrs['data-redoc-schema'] === `#/components/schemas/${name}`)
  checkedRedocSchemas++
  if (!wrapper || wrapper['data-redoc-example'] !== 'false') failures.push(`${route}: missing original embedded Redoc schema ${name} with examples disabled`)
  if (!hasRedocStyles(record.html)) failures.push(`${route}: missing server-rendered Redoc schema styles`)
  const text = stripTags(visible)
  for (const property of Object.keys(daemonSpecs.get('0.18').components.schemas[name].properties || {})) {
    if (!text.includes(property)) failures.push(`${route}: ${name}.${property} missing from exported schema reference`)
  }
}

const checkedCards = new Set()
let checkedStructuredPages = 0
const descriptions = new Map()
const pageTitles = new Map()
const absoluteUrl = value => {
  try { return /^https?:$/.test(new URL(value).protocol) ? new URL(value) : null } catch { return null }
}
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T.+)?$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value.slice(0, 10)
const schemaTypes = node => Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']]
const schemaUrl = value => typeof value === 'string' ? value : value?.['@id'] || value?.url
const schemaNodes = value => Array.isArray(value) ? value.flatMap(schemaNodes) : value && typeof value === 'object' ? [value, ...schemaNodes(value['@graph'])] : []
const checkMetadataAsset = (route, reference) => {
  const url = absoluteUrl(reference)
  if (url?.origin === origin && !resolveExport(url.pathname)) failures.push(`${route}: missing metadata asset ${reference}`)
}
for (const { html, route } of records.values()) {
  const { locale, path: originalRoute } = routeLocale(route)
  const visible = html.replace(/<script\b[^>]*>.*?<\/script>/gs, '')
  const language = attributes(visible.match(/<html\b[^>]*>/)?.[0] || '').lang
  if (language !== locale) failures.push(`${route}: html language must be ${locale}, found ${language || '(missing)'}`)
  const metas = [...visible.matchAll(/<meta\b[^>]*>/g)].map(match => attributes(match[0]))
  const metaValues = key => metas.filter(attrs => (attrs.name || attrs.property)?.toLowerCase() === key).map(attrs => attrs.content || '')
  const oneMeta = key => {
    const values = metaValues(key)
    if (values.length !== 1 || !values[0].trim()) failures.push(`${route}: expected one non-empty ${key} metadata field, found ${values.length}`)
    return values[0] || ''
  }
  for (const attrs of metas) {
    if (/^(?:og:(?:image|video|audio)(?::(?:url|secure_url))?|twitter:image(?::src)?)$/.test(attrs.property || attrs.name || '') && attrs.content) checkMetadataAsset(route, attrs.content)
  }
  // Global 404 HTML has its own root layout without documentation structured data.
  if (route === '/404' || route === '/_not-found') continue
  const structured = []
  for (const match of html.matchAll(/<script\b([^>]*)>(.*?)<\/script>/gs)) {
    if (attributes(match[1]).type !== 'application/ld+json') continue
    try {
      const value = JSON.parse(match[2])
      if (![value].flat().every(node => /^https?:\/\/schema\.org\/?$/.test(node?.['@context']))) failures.push(`${route}: JSON-LD must declare the schema.org context`)
      structured.push(...schemaNodes(value))
    } catch { failures.push(`${route}: invalid JSON-LD`) }
  }
  const site = structured.find(node => schemaTypes(node).includes('WebSite'))
  const organization = structured.find(node => schemaTypes(node).includes('Organization'))
  if (!site || !site.name || !absoluteUrl(site.url) || new URL(site.url).origin !== origin) failures.push(`${route}: missing documentation WebSite structured data`)
  const localeRoot = origin + localePath('/', locale).replace(/^\/$/, '')
  if (site && (site.inLanguage !== locale || site.url !== localeRoot || site['@id'] !== `${localeRoot}#website`)) failures.push(`${route}: WebSite schema must use the ${locale} language and localized root`)
  if (!organization || organization.name !== 'Next Hat' || !absoluteUrl(organization.url)) failures.push(`${route}: missing Next Hat Organization structured data`)
  for (const node of structured) {
    const assets = [node.logo, ...(Array.isArray(node.image) ? node.image : [node.image])].filter(Boolean)
    for (const asset of assets) checkMetadataAsset(route, typeof asset === 'string' ? asset : asset.url || asset.contentUrl)
  }
  if (originalRoute === '/search') {
    const robots = oneMeta('robots').toLowerCase().split(/\s*,\s*/)
    if (!robots.includes('noindex') || !robots.includes('follow') || robots.includes('nofollow')) failures.push(`${route}: search must have noindex, follow metadata`)
    continue
  }
  if (nonIndexableRoutes.has(route)) continue
  for (const key of ['robots', 'googlebot']) if (metaValues(key).some(value => /(?:^|[\s,])(?:noindex|nofollow|none)(?:$|[\s,])/.test(value.toLowerCase()))) failures.push(`${route}: indexable page has restrictive ${key} metadata`)

  const titles = [...visible.matchAll(/<title\b[^>]*>(.*?)<\/title>/gs)].map(match => stripTags(match[1]))
  const title = titles[0] || ''
  if (titles.length !== 1 || !title.endsWith(' — Next Hat Docs') || !title.slice(0, -' — Next Hat Docs'.length).trim()) failures.push(`${route}: expected one page-specific title ending in — Next Hat Docs`)
  const titleKey = `${locale}:${title}`
  if (title && pageTitles.has(titleKey)) failures.push(`${route}: title duplicates ${pageTitles.get(titleKey)} within ${locale}`)
  else if (title) pageTitles.set(titleKey, route)
  const description = oneMeta('description')
  const descriptionKey = `${locale}:${description}`
  if (description && descriptions.has(descriptionKey)) failures.push(`${route}: description duplicates ${descriptions.get(descriptionKey)} within ${locale}`)
  else if (description) descriptions.set(descriptionKey, route)
  const links = [...visible.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0]))
  const canonicalLinks = links.filter(attrs => attrs.rel?.split(/\s+/).includes('canonical'))
  const canonical = origin + (route === '/' ? '' : route)
  const post = postByRoute.get(route)
  if (canonicalLinks.length !== 1 || canonicalLinks[0]?.href !== canonical) failures.push(`${route}: expected one canonical URL ${canonical}`)
  const alternates = links.filter(attrs => attrs.rel?.split(/\s+/).includes('alternate') && (attrs.hrefLang || attrs.hreflang))
  const expectedAlternates = new Map([...locales.map(language => [language, origin + localePath(originalRoute, language).replace(/^\/$/, '')]), ['x-default', origin + originalRoute.replace(/^\/$/, '')]])
  if (alternates.length !== expectedAlternates.size) failures.push(`${route}: expected all five language alternates and x-default`)
  for (const [language, expected] of expectedAlternates) {
    const found = alternates.filter(attrs => (attrs.hrefLang || attrs.hreflang) === language)
    if (found.length !== 1 || found[0]?.href !== expected) failures.push(`${route}: ${language} alternate must link to the same page at ${expected}`)
  }
  for (const [type, feed] of [['application/rss+xml', 'rss.xml'], ['application/atom+xml', 'atom.xml'], ['application/feed+json', 'feed.json']]) {
    const found = links.filter(attrs => attrs.rel?.split(/\s+/).includes('alternate') && attrs.type === type)
    const expected = origin + localePath(`/blog/${feed}`, locale)
    let reference
    try { reference = new URL(found[0]?.href || '', canonical).href } catch {}
    if (found.length !== 1 || reference !== expected) failures.push(`${route}: ${type} alternate must use the localized feed ${expected}`)
  }
  for (const [key, expected] of [
    ['og:url', canonical], ['og:title', title], ['og:description', description], ['og:site_name', 'Next Hat Docs'], ['og:locale', ogLocales[locale]], ['og:type', post ? 'article' : 'website'],
    ['twitter:card', 'summary_large_image'], ['twitter:site', '@next_hat'], ['twitter:creator', '@next_hat'], ['twitter:title', title], ['twitter:description', description],
    ['og:image:width', '1200'], ['og:image:height', '630'], ['og:image:type', 'image/png']
  ]) if (oneMeta(key) !== expected) failures.push(`${route}: ${key} must match ${expected}`)
  const alternateLocales = metaValues('og:locale:alternate').sort()
  if (JSON.stringify(alternateLocales) !== JSON.stringify(locales.filter(language => language !== locale).map(language => ogLocales[language]).sort())) failures.push(`${route}: Open Graph must list the four other locales`)

  const image = `${origin}/social${route === '/' ? '/index' : route}.png`
  const ogImage = oneMeta('og:image')
  const twitterImage = oneMeta('twitter:image')
  if (ogImage !== image || twitterImage !== image) failures.push(`${route}: Open Graph and Twitter must use the absolute page card ${image}`)
  const imageAlt = oneMeta('og:image:alt')
  if (oneMeta('twitter:image:alt') !== imageAlt) failures.push(`${route}: Twitter image alt must match Open Graph image alt`)
  for (const reference of new Set([ogImage, twitterImage].filter(Boolean))) {
    const url = absoluteUrl(reference)
    const path = url?.origin === origin ? resolveExport(url.pathname) : null
    if (!path || checkedCards.has(path)) continue
    checkedCards.add(path)
    const bytes = readFileSync(path)
    if (bytes.length < 33 || !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) || bytes.toString('ascii', 12, 16) !== 'IHDR' || bytes.readUInt32BE(8) !== 13) failures.push(`${route}: social card must be raw PNG bytes ${reference}`)
    else if (bytes.readUInt32BE(16) !== 1200 || bytes.readUInt32BE(20) !== 630) failures.push(`${route}: social card must be 1200×630 ${reference}`)
    if (bytes.length >= 5 * 1024 * 1024) failures.push(`${route}: social card must be smaller than 5 MB ${reference}`)
  }

  const pages = structured.filter(node => schemaTypes(node).some(type => ['WebPage', 'TechArticle', 'BlogPosting'].includes(type)))
  if (pages.length !== 1 || pages[0]?.url !== canonical || schemaUrl(pages[0]?.mainEntityOfPage) !== canonical) failures.push(`${route}: expected one page schema with matching absolute url and mainEntityOfPage`)
  const page = pages[0]
  if (page) {
    checkedStructuredPages++
    if ((page.headline || page.name) !== title.replace(/ — Next Hat Docs$/, '') || page.description !== description) failures.push(`${route}: page schema title/description must match HTML metadata`)
    if (page.inLanguage !== locale || schemaUrl(page.isPartOf) !== `${localeRoot}#website`) failures.push(`${route}: page schema language and parent WebSite must match ${locale}`)
  }
  if (originalRoute !== '/') {
    const breadcrumb = structured.find(node => schemaTypes(node).includes('BreadcrumbList')) || (schemaTypes(page?.breadcrumb).includes('BreadcrumbList') ? page.breadcrumb : null)
    const items = breadcrumb?.itemListElement
    if (!Array.isArray(items) || items.length < 2 || schemaUrl(items.at(-1)?.item) !== canonical) failures.push(`${route}: missing breadcrumb ending at the canonical page`)
    else for (const [index, item] of items.entries()) {
      const url = absoluteUrl(schemaUrl(item.item))
      if (item.position !== index + 1 || !item.name || !url || url.origin !== origin || routeLocale(url.pathname).locale !== locale || !resolveExport(url.pathname)) failures.push(`${route}: invalid localized breadcrumb item ${index + 1}`)
    }
  }

  if (post && page) {
    if (!schemaTypes(page).includes('BlogPosting')) failures.push(`${route}: blog must use BlogPosting structured data`)
    if (!validDate(page.datePublished) || page.datePublished.slice(0, 10) !== post.date) failures.push(`${route}: schema publication date must match the original blog date`)
    if (sourceModified.has(route) && (!validDate(page.dateModified) || new Date(page.dateModified).toISOString() !== sourceModified.get(route))) failures.push(`${route}: schema modification date must match the original source timestamp`)
    const authors = Array.isArray(page.author) ? page.author : [page.author]
    if (authors.length !== post.authors.length || post.authors.some(author => !authors.some(value => value?.name === author.name && (!author.url || value.url === author.url)))) failures.push(`${route}: schema authors must match the original blog authors`)
    if (schemaUrl(page.image) !== image) failures.push(`${route}: blog schema image must match its generated social card`)
    const published = oneMeta('article:published_time')
    if (!validDate(published) || published.slice(0, 10) !== post.date) failures.push(`${route}: Open Graph publication date must match the original blog date`)
    if (sourceModified.has(route) && oneMeta('article:modified_time') !== sourceModified.get(route)) failures.push(`${route}: Open Graph modification date must match the original source timestamp`)
    if (metaValues('article:author').length !== post.authors.length || post.authors.some(author => !metaValues('article:author').includes(author.url))) failures.push(`${route}: Open Graph authors must match the original blog authors`)
  }
}

let checkedSitemapUrls = 0
const sitemapPath = resolveExport('/sitemap.xml')
if (!sitemapPath) failures.push('Missing exported sitemap: /sitemap.xml')
else {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const urls = [...sitemap.matchAll(/<url\b[^>]*>(.*?)<\/url>/gs)].map(match => ({
    url: decodeEntities(match[1].match(/<loc>(.*?)<\/loc>/s)?.[1] || ''),
    modified: match[1].match(/<lastmod>(.*?)<\/lastmod>/s)?.[1],
    alternates: [...match[1].matchAll(/<xhtml:link\b[^>]*>/g)].map(link => attributes(link[0]))
  }))
  const expected = new Set(indexableRecords.map(({ route }) => origin + (route === '/' ? '' : route)))
  const found = new Set()
  for (const entry of urls) {
    checkedSitemapUrls++
    if (!expected.has(entry.url)) failures.push(`Sitemap includes a non-canonical or non-indexable URL: ${entry.url}`)
    if (found.has(entry.url)) failures.push(`Sitemap contains a duplicate URL: ${entry.url}`)
    found.add(entry.url)
    const originalRoute = routeLocale(absoluteUrl(entry.url)?.pathname || '').path
    if (entry.alternates.length !== locales.length) failures.push(`Sitemap must list five language alternates: ${entry.url}`)
    for (const locale of locales) {
      const alternate = entry.alternates.filter(link => link.hreflang === locale)
      const expected = origin + localePath(originalRoute, locale).replace(/^\/$/, '')
      if (alternate.length !== 1 || alternate[0]?.rel !== 'alternate' || alternate[0]?.href !== expected) failures.push(`Sitemap ${locale} alternate must use ${expected}: ${entry.url}`)
    }
    if (entry.modified !== undefined) {
      const route = absoluteUrl(entry.url)?.pathname
      if (!validDate(entry.modified) || !sourceModified.has(route) || new Date(entry.modified).toISOString() !== sourceModified.get(route)) failures.push(`Sitemap lastmod must match a real source timestamp: ${entry.url}`)
    }
  }
  for (const url of expected) if (!found.has(url)) failures.push(`Sitemap is missing an indexable canonical URL: ${url}`)
}

const robotsPath = resolveExport('/robots.txt')
if (!robotsPath) failures.push('Missing exported robots.txt')
else {
  const lines = readFileSync(robotsPath, 'utf8').split(/\r?\n/).map(line => line.replace(/\s*#.*$/, '').trim()).filter(Boolean)
  if (!lines.some(line => /^User-agent:\s*\*$/i.test(line)) || !lines.some(line => /^Allow:\s*\/$/i.test(line))) failures.push('robots.txt must allow crawling the documentation')
  if (!lines.some(line => line === `Sitemap: ${origin}/sitemap.xml`)) failures.push('robots.txt must advertise the canonical sitemap')
  for (const line of lines) {
    const pattern = line.match(/^Disallow:\s*(.+)$/i)?.[1]
    if (!pattern) continue
    const regex = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'))
    if (locales.some(locale => regex.test(localePath('/search', locale))) || regex.test('/')) failures.push('robots.txt must keep localized search crawlable so its noindex metadata can be read')
  }
}

for (const locale of locales) for (const original of inventory.pages) {
  const route = localePath(original.route, locale)
  const path = resolveExport(route)
  if (!path || !records.has(path)) continue
  const { html } = records.get(path)
  const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)]
  // Generated man pages already contain several H1 sections; keep those during migration.
  // Blog posts gain an article title in addition to any headings in their original body.
  const originalPath = join(repository, original.target)
  const sourcePath = locale === 'en' ? originalPath : join(repository, 'apps/documentation/content', locale, relative(join(repository, 'apps/documentation/content'), originalPath))
  const rawArticleSource = readFileSync(sourcePath, 'utf8')
  const articleSource = rawArticleSource.replace(/^---\n.*?\n---\n/s, '').replace(/^```[^\n]*\n.*?^```[^\n]*$/gms, '')
  const bodyH1s = [...articleSource.matchAll(/^#\s+.+$/gm)].length
  const allowedH1s = Math.max(1, bodyH1s + (original.source.startsWith('blog/') ? 1 : 0))
  if (!headings.length || headings.length > allowedH1s) failures.push(`${route}: expected 1–${allowedH1s} original/article H1 headings, found ${headings.length}`)
  const title = stripTags(html.match(/<title>(.*?)<\/title>/s)?.[1] || '')
  if (!title || /^(?:undefined|null|Next Hat Documentation)(?: —|$)/.test(title)) failures.push(`${route}: missing page-specific title`)
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0])).find(attrs => attrs.rel === 'canonical')?.href
  if (canonical !== origin + route) failures.push(`${route}: incorrect canonical URL ${canonical || '(missing)'}`)
  const timestamp = rawArticleSource.match(/^timestamp:\s*(\d+)$/m)?.[1]
  const originalTimestamp = readFileSync(originalPath, 'utf8').match(/^timestamp:\s*(\d+)$/m)?.[1]
  if (!timestamp || timestamp !== originalTimestamp) failures.push(`${route}: missing original modification timestamp`)
  else if (!html.includes(new Date(Number(timestamp)).toISOString())) failures.push(`${route}: original last-modified time missing from export`)
}

for (const locale of locales) for (const post of postsByLocale.get(locale)) {
  const record = records.get(resolveExport(post.route))
  if (!record) continue
  const visible = stripTags(record.html.replace(/<script\b[^>]*>.*?<\/script>/gs, ''))
  if (!visible.includes(post.title)) failures.push(`${post.route}: blog title missing from HTML`)
  if (!record.html.includes(`dateTime="${post.date}"`) && !record.html.includes(`datetime="${post.date}"`)) failures.push(`${post.route}: blog publication date missing from HTML`)
  for (const author of post.authors) if (!visible.includes(author.name)) failures.push(`${post.route}: blog author ${author.name} missing from HTML`)
  for (const tag of post.tags) {
    const href = localePath(`/blog/tags/${tagSlug(tag)}`, locale)
    if (!record.html.includes(`href="${href}"`)) failures.push(`${post.route}: blog tag link missing ${href}`)
  }
}

for (const locale of locales) for (const originalListing of ['/blog', '/blog/archive']) {
  const listing = localePath(originalListing, locale)
  const record = records.get(resolveExport(listing))
  if (!record) continue
  for (const post of postsByLocale.get(locale)) if (!record.html.includes(`href="${post.route}"`)) failures.push(`${listing}: missing blog navigation link ${post.route}`)
}

let checkedFeeds = 0
const xmlText = (xml, name) => decodeEntities(xml.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`))?.[1] || '')
const sameAuthors = (actual, expected) => Array.isArray(actual) && actual.length === expected.length && expected.every(author => actual.some(value => value?.name === author.name && (!author.url || value.url === author.url)))
for (const locale of locales) for (const originalFeed of ['/blog/rss.xml', '/blog/atom.xml', '/blog/feed.json']) {
  const feed = localePath(originalFeed, locale)
  const path = resolveExport(feed)
  if (!path) {
    failures.push(`Missing exported feed: ${feed}`)
    continue
  }
  checkedFeeds++
  const contents = readFileSync(path, 'utf8')
  const localizedPosts = postsByLocale.get(locale)
  const blogUrl = origin + localePath('/blog', locale)
  for (const post of localizedPosts) if (!contents.includes(origin + post.route)) failures.push(`${feed}: missing blog post ${post.slug}`)
  if (feed.endsWith('.json')) {
    try {
      const parsed = JSON.parse(contents)
      if (parsed.title !== translate(locale, 'Next Hat blog') || parsed.language !== locale || parsed.home_page_url !== blogUrl || parsed.feed_url !== origin + feed) failures.push(`${feed}: feed title, language, and URLs must match ${locale}`)
      if (!Array.isArray(parsed.items) || parsed.items.length !== posts.length || new Set(parsed.items.map(item => item.id)).size !== posts.length) failures.push(`${feed}: incomplete or duplicate entries`)
      for (const post of localizedPosts) {
        const entry = parsed.items?.find(item => item.id === origin + post.route)
        if (!entry || entry.url !== origin + post.route || entry.title !== post.title) failures.push(`${feed}: ${post.slug} must use the translated title and localized stable URL`)
        if (!validDate(entry?.date_published) || entry.date_published !== new Date(post.date).toISOString()) failures.push(`${feed}: ${post.slug} publication date must match the original date`)
        if (!sameAuthors(entry?.authors || [], post.authors)) failures.push(`${feed}: ${post.slug} authors must match original authors`)
        if (JSON.stringify(entry?.tags) !== JSON.stringify(post.tags.map(tag => translate(locale, tag)))) failures.push(`${feed}: ${post.slug} tags must use localized labels with original tag identities`)
      }
    } catch { failures.push(`${feed}: invalid JSON`) }
  } else {
    const isAtom = feed.endsWith('atom.xml')
    const entries = [...contents.matchAll(isAtom ? /<entry\b[^>]*>(.*?)<\/entry>/gs : /<item\b[^>]*>(.*?)<\/item>/gs)].map(match => match[1])
    const language = isAtom ? attributes(contents.match(/<feed\b[^>]*>/)?.[0] || '')['xml:lang'] : xmlText(contents, 'language')
    if (xmlText(contents, 'title') !== translate(locale, 'Next Hat blog') || language !== locale) failures.push(`${feed}: feed title and language must match ${locale}`)
    const feedLinks = [...contents.matchAll(/<(?:atom:)?link\b[^>]*>/g)].map(match => attributes(match[0]))
    const selfLinks = feedLinks.filter(link => link.rel === 'self')
    const home = isAtom ? feedLinks.find(link => !link.rel || link.rel === 'alternate')?.href : xmlText(contents, 'link')
    if (home !== blogUrl || selfLinks.length !== 1 || selfLinks[0]?.href !== origin + feed || (isAtom && xmlText(contents, 'id') !== blogUrl)) failures.push(`${feed}: feed identity and navigation must use the localized blog URLs`)
    if (entries.length !== posts.length) failures.push(`${feed}: incomplete or extra entries`)
    const urls = entries.map(entry => xmlText(entry, isAtom ? 'id' : 'guid'))
    if (new Set(urls).size !== entries.length) failures.push(`${feed}: duplicate entry identities`)
    for (const post of localizedPosts) {
      const entry = entries.find(entry => xmlText(entry, isAtom ? 'id' : 'guid') === origin + post.route)
      if (!entry) {
        failures.push(`${feed}: missing entry ${post.slug}`)
        continue
      }
      const link = isAtom ? attributes(entry.match(/<link\b[^>]*>/)?.[0] || '').href : xmlText(entry, 'link')
      if (xmlText(entry, 'title') !== post.title || link !== origin + post.route) failures.push(`${feed}: ${post.slug} must use the translated title and localized stable URL`)
      const date = xmlText(entry, isAtom ? 'updated' : 'pubDate')
      if (!Number.isFinite(Date.parse(date)) || new Date(date).toISOString() !== new Date(post.date).toISOString()) failures.push(`${feed}: ${post.slug} publication date must match the original date`)
      const authors = isAtom ? [...entry.matchAll(/<author\b[^>]*>(.*?)<\/author>/gs)].map(match => ({ name: xmlText(match[1], 'name'), url: xmlText(match[1], 'uri') })) : [...entry.matchAll(/<dc:creator\b[^>]*>(.*?)<\/dc:creator>/gs)].map(match => decodeEntities(match[1]))
      if (isAtom ? !sameAuthors(authors, post.authors) : authors.length !== post.authors.length || post.authors.some(author => !authors.includes(author.name))) failures.push(`${feed}: ${post.slug} authors must match original authors`)
    }
  }
}

if (failures.length) {
  const grouped = new Map()
  for (const failure of new Set(failures)) {
    const match = failure.match(/^(\/[^:]*): (.*)$/)
    const reason = match?.[2] || failure
    const location = match?.[1]
    const locations = grouped.get(reason) || []
    if (location) locations.push(location)
    grouped.set(reason, locations)
  }
  for (const [reason, locations] of grouped) {
    console.error(`${reason}${locations.length ? ` (${locations.length} pages: ${locations.slice(0, 3).join(', ')}${locations.length > 3 ? ', …' : ''})` : ''}`)
  }
  process.exitCode = 1
} else {
  console.log(`Verified ${htmlFiles.length} exported HTML pages across ${locales.length} languages, ${inventory.pages.length * locales.length} preserved document routes, ${checkedRedocOperations} Redoc operations, ${checkedRedocSchemas} embedded schema references, ${indexableRecords.length} SEO metadata sets with language alternates, ${checkedCards.size} PNG social cards, ${checkedStructuredPages} localized page schemas, ${checkedSitemapUrls} canonical sitemap URLs with language alternates, localized crawl/noindex rules, ${checkedLinks} local links/assets, ${checkedFragments} fragment targets, translated blog metadata/tags, and ${checkedFeeds} feeds.`)
}
