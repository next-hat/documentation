import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(repository, 'apps/documentation/out')
if (!existsSync(output)) {
  console.error('Build the documentation before verifying its static export (apps/documentation/out is missing).')
  process.exit(1)
}
const inventory = JSON.parse(readFileSync(join(repository, 'scripts/migrate-content.inventory.json'), 'utf8'))
const posts = JSON.parse(readFileSync(join(repository, 'apps/documentation/lib/blog-posts.json'), 'utf8'))
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
const resolveExport = pathname => {
  let decoded
  try { decoded = decodeURIComponent(pathname) } catch { return null }
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return null
  const base = join(output, decoded)
  return [base + '.html', join(base, 'index.html'), base].find(path => existsSync(path) && statSync(path).isFile()) || null
}
const tagSlug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const requiredRoutes = [
  ...inventory.pages.map(page => page.route), '/', '/blog', '/blog/archive', '/blog/tags', '/blog/authors', '/search',
  ...new Set(posts.flatMap(post => post.tags.map(tag => '/blog/tags/' + tagSlug(tag)))),
  ...Array.from({ length: 7 }, (_, index) => `/references/nanocl/daemon/v0.${12 + index}`)
]
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

for (const original of inventory.pages) {
  const path = resolveExport(original.route)
  if (!path || !records.has(path)) continue
  const { html } = records.get(path)
  const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)]
  // Generated man pages already contain several H1 sections; keep those during migration.
  // Blog posts gain an article title in addition to any headings in their original body.
  const rawArticleSource = readFileSync(join(repository, original.target), 'utf8')
  const articleSource = rawArticleSource.replace(/^---\n.*?\n---\n/s, '').replace(/^```[^\n]*\n.*?^```[^\n]*$/gms, '')
  const bodyH1s = [...articleSource.matchAll(/^#\s+.+$/gm)].length
  const allowedH1s = Math.max(1, bodyH1s + (original.source.startsWith('blog/') ? 1 : 0))
  if (!headings.length || headings.length > allowedH1s) failures.push(`${original.route}: expected 1–${allowedH1s} original/article H1 headings, found ${headings.length}`)
  const title = stripTags(html.match(/<title>(.*?)<\/title>/s)?.[1] || '')
  if (!title || /^(?:undefined|null|Next Hat Documentation)(?: —|$)/.test(title)) failures.push(`${original.route}: missing page-specific title`)
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(match => attributes(match[0])).find(attrs => attrs.rel === 'canonical')?.href
  if (canonical !== origin + original.route) failures.push(`${original.route}: incorrect canonical URL ${canonical || '(missing)'}`)
  const timestamp = rawArticleSource.match(/^timestamp:\s*(\d+)$/m)?.[1]
  if (!timestamp) failures.push(`${original.route}: missing original modification timestamp`)
  else if (!html.includes(new Date(Number(timestamp)).toISOString())) failures.push(`${original.route}: original last-modified time missing from export`)
}

for (const post of posts) {
  const record = records.get(resolveExport(post.route))
  if (!record) continue
  const visible = stripTags(record.html.replace(/<script\b[^>]*>.*?<\/script>/gs, ''))
  if (!visible.includes(post.title)) failures.push(`${post.route}: blog title missing from HTML`)
  if (!record.html.includes(`dateTime="${post.date}"`) && !record.html.includes(`datetime="${post.date}"`)) failures.push(`${post.route}: blog publication date missing from HTML`)
  for (const author of post.authors) if (!visible.includes(author.name)) failures.push(`${post.route}: blog author ${author.name} missing from HTML`)
  for (const tag of post.tags) {
    const href = `/blog/tags/${tagSlug(tag)}`
    if (!record.html.includes(`href="${href}"`)) failures.push(`${post.route}: blog tag link missing ${href}`)
  }
}

for (const listing of ['/blog', '/blog/archive']) {
  const record = records.get(resolveExport(listing))
  if (!record) continue
  for (const post of posts) if (!record.html.includes(`href="${post.route}"`)) failures.push(`${listing}: missing blog navigation link ${post.route}`)
}

for (const feed of ['/blog/rss.xml', '/blog/atom.xml', '/blog/feed.json']) {
  const path = resolveExport(feed)
  if (!path) {
    failures.push(`Missing exported feed: ${feed}`)
    continue
  }
  const contents = readFileSync(path, 'utf8')
  for (const post of posts) if (!contents.includes(origin + post.route)) failures.push(`${feed}: missing blog post ${post.slug}`)
  if (feed.endsWith('.json')) {
    try { const parsed = JSON.parse(contents); if (parsed.items.length < posts.length) failures.push(`${feed}: incomplete entries`) } catch { failures.push(`${feed}: invalid JSON`) }
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
  console.log(`Verified ${htmlFiles.length} exported HTML pages, ${inventory.pages.length} preserved document routes, ${checkedLinks} local links/assets, ${checkedFragments} fragment targets, blog metadata/tags, and three feeds.`)
}
