import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { seoPages } from '@/lib/seo-content'
import { socialImagePath } from '@/lib/seo'

export const dynamic = 'force-static'
export const dynamicParams = false
export function generateStaticParams() {
  return seoPages.map(page => ({ slug: socialImagePath(page.path).slice('/social/'.length).split('/') }))
}

const banner = readFile(join(process.cwd(), 'assets/next-hat-social-v1.png'))
const logo = readFile(join(process.cwd(), 'public/img/logo3.png'))
const font = (weight: number) => readFile(join(process.cwd(), `node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${weight}-normal.woff`))
const regular = font(400)
const semibold = font(600)

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const page = seoPages.find(page => socialImagePath(page.path) === `/social/${slug.join('/')}`)
  if (!page) return new Response('Not found', { status: 404 })
  const [background, mark, normalFont, boldFont] = await Promise.all([banner, logo, regular, semibold])
  const section = page.post ? 'Blog / Article' : page.path.split('/')[1] || 'Documentation'
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff', color: '#0b1534', fontFamily: 'IBM Plex Mono' }}>
      <img src={`data:image/png;base64,${background.toString('base64')}`} width={1200} height={630} alt="" style={{ position: 'absolute', left: 0, top: 0 }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 710, height: 630, background: 'linear-gradient(90deg, #ffffff 99%, rgba(255,255,255,0))', display: 'flex' }} />
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 1200, height: 125, background: '#ffffff', display: 'flex' }} />
      <div style={{ position: 'absolute', left: 64, top: 62, display: 'flex', alignItems: 'center', fontSize: 27, gap: 16 }}>
        <img src={`data:image/png;base64,${mark.toString('base64')}`} width={42} height={42} alt="" />
        <span style={{ fontWeight: 600 }}>Next Hat</span><span style={{ color: '#69768c' }}>/ Docs</span>
      </div>
      <div style={{ position: 'absolute', left: 64, top: 157, display: 'flex', color: '#c2410c', fontSize: 19, textTransform: 'uppercase' }}>{section}</div>
      <div style={{ position: 'absolute', left: 64, top: 204, width: 626, display: 'flex', fontSize: page.title.length > 45 ? 42 : 50, fontWeight: 600, lineHeight: 1.16 }}>{page.title}</div>
      <div style={{ position: 'absolute', left: 64, top: 376, width: 626, display: 'flex', color: '#596a86', fontSize: 21, lineHeight: 1.45 }}>{page.description}</div>
      <div style={{ position: 'absolute', left: 64, right: 64, bottom: 58, borderTop: '1px solid #d6dce7', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
        <span>Open tools. Your infrastructure.</span><span>docs.next-hat.com</span>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [
      { name: 'IBM Plex Mono', data: normalFont, weight: 400, style: 'normal' },
      { name: 'IBM Plex Mono', data: boldFont, weight: 600, style: 'normal' }
    ] }
  )
}
