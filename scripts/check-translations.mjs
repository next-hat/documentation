import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const app = join(repository, 'apps/documentation')
const require = createRequire(join(app, 'package.json'))
const { parse } = require('yaml')
const content = join(app, 'content')
const locales = ['fr', 'ru', 'ja', 'zh-Hans']
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = join(directory, entry.name)
  return entry.isDirectory() ? walk(file) : [file]
})
const originals = walk(content).filter(file => !locales.includes(relative(content, file).split('/')[0]))
const pages = originals.filter(file => file.endsWith('.mdx'))
const metadata = source => parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] || '')
const fences = source => [...source.matchAll(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)^\1[^\n]*$/gm)].map(match => match[0])
const codeComponents = source => [...source.matchAll(/<(Terminal|CodeBlock|StatefileBlock)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(match => match[2])
const uiKeys = JSON.parse(readFileSync(join(app, 'lib/translations/source.json'), 'utf8'))
const apiTexts = new Set()
function collect(value) {
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if ((key === 'description' || key === 'summary') && typeof child === 'string') apiTexts.add(child)
    else collect(child)
  }
}
for (const version of ['0.12', '0.13', '0.14', '0.15', '0.16', '0.17', '0.18']) collect(parse(readFileSync(join(app, `public/specs/nanocld/${version}.yaml`), 'utf8')))
const codeFragments = text => [...text.matchAll(/```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]*`/g)].map(match => match[0])
for (const locale of locales) {
  const directory = join(content, locale)
  assert.ok(existsSync(directory), `Missing ${locale} content`)
  const navigation = readFileSync(join(directory, '_meta.js'), 'utf8')
  for (const language of locales) assert.ok(!new RegExp(`^\\s*['"]?${language}['"]?\\s*:`, 'm').test(navigation), `Nested language entry in ${locale} navigation: ${language}`)
  assert.equal(walk(directory).filter(file => file.endsWith('.mdx')).length, pages.length, `${locale} page coverage`)
  for (const original of originals.filter(file => /\.mdx$|\/_meta\.js$/.test(file))) {
    const file = join(directory, relative(content, original))
    assert.ok(existsSync(file), `Missing ${file}`)
    if (!file.endsWith('.mdx')) continue
    const source = readFileSync(original, 'utf8')
    const translated = readFileSync(file, 'utf8')
    assert.ok(metadata(translated).title, `Missing title: ${file}`)
    assert.deepEqual(fences(translated), fences(source), `Changed fenced example: ${file}`)
    assert.deepEqual(codeComponents(translated), codeComponents(source), `Changed code component: ${file}`)
    for (const match of translated.matchAll(/<(?:DocsHome|BlogIndex|InstallBlock|License|CratesIoInstall|QuickInstall|UnixTarInstall|VerifyInstall|OpenApi|ApiSchema)\b[^>]*>/g)) {
      assert.ok(match[0].includes(`locale="${locale}"`), `Missing component locale: ${file}: ${match[0]}`)
    }
  }
  const ui = JSON.parse(readFileSync(join(app, `lib/translations/${locale}.json`), 'utf8'))
  for (const key of uiKeys) assert.ok(typeof ui[key] === 'string' && ui[key].trim(), `Missing ${locale} interface text: ${key}`)
  const api = JSON.parse(readFileSync(join(app, `lib/translations/spec.${locale}.json`), 'utf8'))
  for (const text of apiTexts) {
    assert.ok(typeof api[text] === 'string' && api[text].trim(), `Missing ${locale} API text: ${text}`)
    assert.deepEqual(codeFragments(api[text]), codeFragments(text), `Changed ${locale} API example: ${text}`)
  }
}
console.log(`Validated ${pages.length} pages per translation, navigation, locale props, unchanged examples, ${uiKeys.length} interface strings and ${apiTexts.size} API strings in all four languages.`)
