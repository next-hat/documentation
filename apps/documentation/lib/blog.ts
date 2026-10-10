import posts from './blog-posts.json'
export { posts }
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const tags = [...new Set(posts.flatMap(post => post.tags))].sort().map(label => ({ label, slug: tagSlug(label) }))
