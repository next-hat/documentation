import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
export const metadata = documentationMetadata('ja')
export default function Layout({ children }: { children: React.ReactNode }) { return <DocumentationLayout locale="ja">{children}</DocumentationLayout> }
