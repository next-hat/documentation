import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, FileCode2, Terminal } from 'lucide-react'
import { Button } from '@next-hat/ui/components/ui/button'
import { Badge } from '@next-hat/ui/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@next-hat/ui/components/ui/card'
import posts from '@/lib/blog-posts.json'
import { DeploymentVisual } from './deployment-visual'
import { LandingBackgroundDecorations } from './landing-background-decorations'

const sections = [
  { icon: BookOpen, title: 'Guides', description: 'Build something, one step at a time.', href: '/guides/summary', links: [
    ['Your first deployment', '/guides/nanocl/get-started/orientation-and-setup'],
    ['Routing & networking', '/guides/nanocl/get-started/configure-your-proxy'],
    ['Advanced workloads', '/guides/nanocl/advanced-usage/multi-container-cargoes']
  ] },
  { icon: Terminal, title: 'Manuals', description: 'Install, configure, and operate your tools.', href: '/manuals/summary', links: [
    ['Install Nanocl', '/manuals/nanocl/install/overview'],
    ['Post-installation setup', '/manuals/nanocl/install/post-installation'],
    ['Upgrade your installation', '/manuals/nanocl/upgrade']
  ] },
  { icon: FileCode2, title: 'References', description: 'The details, when you need them.', href: '/references/summary', links: [
    ['CLI commands', '/references/nanocl/cli/overview'],
    ['Statefile specification', '/references/nanocl/statefile'],
    ['Daemon API', '/references/nanocl/daemon/v0.18']
  ] }
]

export function DocsHome() {
  return <div className="docs-home" data-pagefind-body>
    <section className="home-intro relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24">
      <LandingBackgroundDecorations />
      <div className="docs-container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex min-w-0 flex-col items-start gap-7">
          <Badge variant="outline">
            <span className="mr-2 size-1.5 rounded-full bg-orange-400" aria-hidden="true" />
            Built in the open. Built for builders.
          </Badge>
          <h1 className="text-balance text-[clamp(2.5rem,12vw,3rem)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl xl:text-[4rem]">
            Your next idea.
            <br />
            <span className="text-gradient">Your infrastructure.</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
            From your first container to your own cloud. Nanocl gives you
            open-source tools to deploy and run applications on infrastructure
            you control.
          </p>
          <div className="flex w-full flex-wrap gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/guides/nanocl/overview">
                Get started with Nanocl
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://next-hat.com/products/servers">
                Explore managed servers
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-6 text-muted-foreground">
            <span>Open-source core</span>
            <span>Written in Rust</span>
            <span>Self-host on your terms</span>
          </p>
        </div>
        <DeploymentVisual />
      </div>
    </section>
    <div className="docs-container home-sections">
    <section className="docs-sections" aria-labelledby="explore-title">
      <div className="section-heading"><span className="eyebrow">Find your way</span><h2 id="explore-title">A place for every question.</h2><p>Follow a guide, look up a command, or go deeper into how it works.</p></div>
      <div className="section-grid">{sections.map(({ icon: Icon, title, description, href, links }) =>
        <Card key={title}>
          <CardHeader><Icon className="section-icon" aria-hidden="true" /><CardTitle><h3>{title}</h3></CardTitle><CardDescription>{description}</CardDescription></CardHeader>
          <CardContent><ul className="section-links">{links.map(([label, route]) => <li key={route}><Link href={route}>{label}<ArrowRight className="size-3.5" aria-hidden="true" /></Link></li>)}</ul></CardContent>
          <CardFooter><Link className="section-all" href={href}>Explore {title.toLowerCase()}<ArrowRight className="size-4" aria-hidden="true" /></Link></CardFooter>
        </Card>
      )}</div>
    </section>
    <section className="start-path" aria-labelledby="path-title">
      <div><span className="eyebrow">New to Nanocl?</span><h2 id="path-title">Start small.<br />Build from there.</h2><p>A short path from an empty server to your first application.</p></div>
      <ol>{[
        ['01', 'Install your tools', 'Choose your platform and set up the CLI and daemon.', '/manuals/nanocl/install/overview'],
        ['02', 'Run your first container', 'Get oriented and deploy a workload on your server.', '/guides/nanocl/get-started/orientation-and-setup'],
        ['03', 'Make it your own', 'Describe your application in a versioned Statefile.', '/guides/nanocl/get-started/statefile']
      ].map(([number, title, description, route]) => <li key={number}><Link href={route}><span className="path-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowRight className="size-4" aria-hidden="true" /></Link></li>)}</ol>
    </section>
    <section className="latest-post"><div><span className="eyebrow">From the project</span><h2>{posts[0].title}</h2><p>{posts[0].description}</p><Link href={posts[0].route}>Read the release notes <ArrowRight className="size-4" aria-hidden="true" /></Link></div><Link className="all-updates" href="/blog">All updates ↗</Link></section>
    </div>
  </div>
}
