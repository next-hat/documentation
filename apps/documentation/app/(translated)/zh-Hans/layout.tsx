import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
export const metadata = documentationMetadata('zh-Hans')
export default function Layout({ children }: { children: React.ReactNode }) { return <DocumentationLayout locale="zh-Hans">{children}</DocumentationLayout> }
