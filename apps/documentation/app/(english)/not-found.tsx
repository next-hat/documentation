import Link from 'next/link'
export default function NotFound() {
  return <main id="nextra-skip-nav" tabIndex={-1} className="not-found"><span className="eyebrow">404 / Page not found</span><h1>Let's get you back on track.</h1><p>This page could not be found. Browse the documentation or search for what you need.</p><Link href="/">Back to documentation →</Link></main>
}
