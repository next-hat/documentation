import { Search } from 'nextra/components'
export const metadata = { title: 'Search documentation', robots: { index: false } }
export default function SearchPage() { return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><header className="section-heading"><span className="eyebrow">Next Hat Docs</span><h1>Find what you need.</h1><p>Search guides, commands, examples, and release notes.</p></header><Search /></main> }
