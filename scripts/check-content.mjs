import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const app = join(repository, 'apps/documentation')
const contentDirectory = join(app, 'content')
const inventory = JSON.parse(readFileSync(join(repository, 'scripts/migrate-content.inventory.json'), 'utf8'))
const migrationAudit = process.argv.includes('--migration')
const failures = []
const walk = directory => readdirSync(directory).flatMap(name => {
  const path = join(directory, name)
  return statSync(path).isDirectory() ? walk(path) : [path]
})
const pages = walk(contentDirectory).filter(path => /\.mdx?$/.test(path))
const routes = new Set(pages.map(path => {
  const route = '/' + relative(contentDirectory, path).replace(/\.mdx?$/, '')
  return route.replace(/\/index$/, '') || '/'
}))
if (routes.size !== pages.length) failures.push('Content files must resolve to unique public routes')
// These pages are implemented as Next.js routes rather than content files.
for (const route of ['/blog/archive', '/blog/tags', '/blog/rss.xml', '/blog/atom.xml', '/blog/feed.json']) routes.add(route)
const posts = JSON.parse(readFileSync(join(app, 'lib/blog-posts.json'), 'utf8'))
for (const post of posts) {
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(post.date), `Invalid blog date: ${post.slug}`)
  assert.ok(post.authors.length > 0, `Missing blog author: ${post.slug}`)
  assert.ok(post.excerpt.length > 0, `Missing blog excerpt: ${post.slug}`)
  assert.ok(routes.has(post.route), `Missing blog page: ${post.slug}`)
  if (post.image) checkUrl(join(contentDirectory, 'blog/index.mdx'), post.image)
}

const sourceWithoutExamples = source => source
  .replace(/^---\n.*?\n---\n/s, '')
  .replace(/^```[^\n]*\n.*?^```[^\n]*$/gms, '')
  .replace(/\{`[^`]*`\}/gs, '')
  .replace(/\{\/\*.*?\*\/\}/gs, '')

function checkUrl(path, url) {
  if (!url || /^(?:https?:|mailto:|tel:|data:|#|\/\/)/.test(url)) return
  const pathname = url.split(/[?#]/, 1)[0]
  if (!pathname) return
  const route = pathname.startsWith('/') ? pathname : '/' + relative(contentDirectory, resolve(dirname(path), pathname))
  if (routes.has(route.replace(/\/$/, '') || '/')) return
  if (extname(pathname) && !/\.\d+$/.test(pathname)) {
    if (!existsSync(join(app, 'public', route))) failures.push(`${relative(repository, path)}: missing asset ${url}`)
  } else {
    failures.push(`${relative(repository, path)}: missing route ${url}`)
  }
}

for (const original of inventory.pages) {
  const target = join(repository, original.target)
  if (!existsSync(target)) {
    failures.push(`Missing migrated page: ${original.source} → ${original.target}`)
    continue
  }
  if (migrationAudit) {
    const source = readFileSync(target, 'utf8').replace(/^---\n.*?\n---\n/s, '')
    const headings = [...source.matchAll(/^#{1,6}\s+.+$/gm)].map(match => match[0])
    const hashes = [...source.matchAll(/^```[^\n]*\n(.*?)^```[^\n]*$/gms)]
      .map(match => createHash('sha256').update(match[1]).digest('hex'))
    let originalHeading = 0
    for (const heading of headings) if (heading === original.headings[originalHeading]) originalHeading++
    if (originalHeading !== original.headings.length) failures.push(`Original heading order/content changed during migration: ${original.target}`)
    if (JSON.stringify(hashes) !== JSON.stringify(original.codeBlockHashes)) failures.push(`Code examples changed during migration: ${original.target}`)
  }
}

for (const path of pages) {
  const source = readFileSync(path, 'utf8')
  const prose = sourceWithoutExamples(source)
  const frontmatter = source.match(/^---\n(.*?)\n---\n/s)?.[1] || ''
  const image = frontmatter.match(/^image:\s*['"]?([^'"\s]+)/m)?.[1]
  if (image) checkUrl(path, image)
  if (/^:::/m.test(prose) || /@site\/|@theme\/|<!--/.test(prose)) failures.push(`Legacy Docusaurus syntax: ${relative(repository, path)}`)
  for (const match of prose.matchAll(/\bimport\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g)) {
    const specifier = match[1]
    if (specifier.startsWith('@/') || specifier.startsWith('.')) {
      const base = specifier.startsWith('@/') ? join(app, specifier.slice(2)) : resolve(dirname(path), specifier)
      const candidates = [base, ...['.tsx', '.ts', '.jsx', '.js', '.mdx', '.json'].map(extension => base + extension), join(base, 'index.tsx'), join(base, 'index.jsx')]
      if (!candidates.some(existsSync)) failures.push(`${relative(repository, path)}: missing import ${specifier}`)
    }
  }
  for (const match of prose.matchAll(/\]\(([^\s)]+)(?:\s+['"][^'"]*['"])?\)|^\[[^\]]+\]:\s+(\S+)|\b(?:href|src)=['"]([^'"]+)['"]/gm)) {
    checkUrl(path, match[1] || match[2] || match[3])
  }
}

assert.equal(inventory.pages.filter(page => page.source.startsWith('docs/')).length, inventory.documents)
assert.equal(inventory.pages.filter(page => page.source.startsWith('blog/')).length, inventory.blogPosts)
for (const original of inventory.pages.filter(page => page.source.startsWith('blog/'))) {
  assert.ok(posts.some(post => post.route === original.route), `Missing blog index entry: ${original.route}`)
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated ${pages.length} content pages, ${inventory.pages.length} preserved routes, ${posts.length} blog posts, imports, links, and assets${migrationAudit ? ', original headings and code examples' : ''}.`)
}
