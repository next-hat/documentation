import { localizedPosts } from './blog'
import { localePath, type Locale } from './locales'
import { translate } from './translate'
const origin = 'https://docs.next-hat.com'
const escape = (value: string) => value.replace(/[<>&'\"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]!)
export function rss(locale: Locale = 'en') {
  const posts = localizedPosts(locale)
  const blogUrl = origin + localePath('/blog', locale)
  const title = translate(locale, 'Next Hat blog')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${escape(title)}</title><link>${blogUrl}</link><description>${escape(translate(locale, 'Release notes and infrastructure guides from Next Hat.'))}</description><language>${locale}</language><atom:link href="${blogUrl}/rss.xml" rel="self" type="application/rss+xml"/>${posts.map(post => `<item><title>${escape(post.title)}</title><link>${origin}${post.route}</link><guid>${origin}${post.route}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escape(post.excerpt)}</description>${post.authors.map(author => `<dc:creator>${escape(author.name)}</dc:creator>`).join('')}${post.tags.map(tag => `<category>${escape(translate(locale, tag))}</category>`).join('')}</item>`).join('')}</channel></rss>`
}
export function atom(locale: Locale = 'en') {
  const posts = localizedPosts(locale)
  const blogUrl = origin + localePath('/blog', locale)
  const title = translate(locale, 'Next Hat blog')
  return `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}"><title>${escape(title)}</title><id>${blogUrl}</id><link href="${blogUrl}"/><link href="${blogUrl}/atom.xml" rel="self"/><updated>${new Date(posts[0].date).toISOString()}</updated>${posts.map(post => `<entry><title>${escape(post.title)}</title><id>${origin}${post.route}</id><link href="${origin}${post.route}"/><updated>${new Date(post.date).toISOString()}</updated><summary>${escape(post.excerpt)}</summary>${post.authors.map(author => `<author><name>${escape(author.name)}</name><uri>${escape(author.url)}</uri></author>`).join('')}</entry>`).join('')}</feed>`
}
export function jsonFeed(locale: Locale = 'en') {
  const posts = localizedPosts(locale)
  const blogUrl = origin + localePath('/blog', locale)
  const title = translate(locale, 'Next Hat blog')
  return { version: 'https://jsonfeed.org/version/1.1', title, language: locale, home_page_url: `${blogUrl}`, feed_url: `${blogUrl}/feed.json`, items: posts.map(post => ({ id: `${origin}${post.route}`, url: `${origin}${post.route}`, title: post.title, content_text: post.excerpt, date_published: new Date(post.date).toISOString(), tags: post.tags.map(tag => translate(locale, tag)), authors: post.authors.map(author => ({ name: author.name, url: author.url })) })) }
}
