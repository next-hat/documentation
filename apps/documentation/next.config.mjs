import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  mdxOptions: { rehypePrettyCodeOptions: { theme: { light: 'github-light', dark: 'github-dark' } } }
})

export default withNextra({
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  transpilePackages: ['@next-hat/ui'],
  experimental: { cpus: 4 }
})
