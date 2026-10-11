import assert from 'node:assert/strict'
import test from 'node:test'
import { locales, localePath, routeLocale } from './locales.ts'
test('language URLs preserve existing English paths and the same translated page', () => {
  for (const locale of locales) {
    const path = localePath('/guides/nanocl/overview', locale)
    assert.equal(routeLocale(path).locale, locale)
    assert.equal(routeLocale(path).path, '/guides/nanocl/overview')
    assert.equal(localePath(path, 'en'), '/guides/nanocl/overview')
    assert.equal(localePath(path, 'ja'), '/ja/guides/nanocl/overview')
    assert.equal(localePath('/', locale), locale === 'en' ? '/' : `/${locale}`)
  }
  assert.equal(localePath('https://next-hat.com', 'fr'), 'https://next-hat.com')
  assert.equal(localePath('//next-hat.com', 'fr'), '//next-hat.com')
  assert.equal(localePath('/fr/guides/summary?query=nanocl#install', 'ru'), '/ru/guides/summary?query=nanocl#install')
  assert.equal(localePath('/ja?query=nanocl#install', 'en'), '/?query=nanocl#install')
  assert.equal(localePath('/#intro', 'zh-Hans'), '/zh-Hans#intro')
  assert.equal(routeLocale('/french/guides').locale, 'en')
})
