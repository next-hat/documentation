import posts from './blog-posts.json'
const origin = 'https://docs.next-hat.com'
const escape = (value: string) => value.replace(/[<>&'\"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]!)
export function rss() {
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Next Hat blog</title><link>${origin}/blog</link><description>Release notes and infrastructure guides from Next Hat.</description><language>en</language><atom:link href="${origin}/blog/rss.xml" rel="self" type="application/rss+xml"/>${posts.map(post => `<item><title>${escape(post.title)}</title><link>${origin}${post.route}</link><guid>${origin}${post.route}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escape(post.excerpt)}</description>${post.tags.map(tag => `<category>${escape(tag)}</category>`).join('')}</item>`).join('')}</channel></rss>`
}
export function atom() {
  return `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Next Hat blog</title><id>${origin}/blog</id><link href="${origin}/blog"/><link href="${origin}/blog/atom.xml" rel="self"/><updated>${new Date(posts[0].date).toISOString()}</updated>${posts.map(post => `<entry><title>${escape(post.title)}</title><id>${origin}${post.route}</id><link href="${origin}${post.route}"/><updated>${new Date(post.date).toISOString()}</updated><summary>${escape(post.excerpt)}</summary>${post.authors.map(author => `<author><name>${escape(author.name)}</name><uri>${escape(author.url)}</uri></author>`).join('')}</entry>`).join('')}</feed>`
}
export function jsonFeed() {
  return { version: 'https://jsonfeed.org/version/1.1', title: 'Next Hat blog', home_page_url: `${origin}/blog`, feed_url: `${origin}/blog/feed.json`, items: posts.map(post => ({ id: `${origin}${post.route}`, url: `${origin}${post.route}`, title: post.title, content_text: post.excerpt, date_published: new Date(post.date).toISOString(), tags: post.tags, authors: post.authors.map(author => ({ name: author.name, url: author.url })) })) }
}
