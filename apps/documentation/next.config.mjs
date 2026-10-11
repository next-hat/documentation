import nextra from 'nextra'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const withNextra = nextra({
  defaultShowCopyCode: true,
  mdxOptions: { rehypePrettyCodeOptions: { theme: { light: 'github-light', dark: 'github-dark' } } }
})

export default withNextra({
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  compiler: { styledComponents: true },
  webpack(config) {
    // Redoc's Node and browser bundles produce different styled-component
    // classes. Use the browser-safe bundle for both SSR and hydration.
    config.resolve.alias['redoc$'] = require.resolve('redoc/bundles/redoc.browser.lib.js')
    return config
  },
  transpilePackages: ['@next-hat/ui'],
  // Redoc's labels are global within a worker; render one language at a time.
  experimental: { cpus: 4, globalNotFound: true, staticGenerationMaxConcurrency: 1 }
})
