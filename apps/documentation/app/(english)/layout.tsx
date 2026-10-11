import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
export const metadata = documentationMetadata('en')
export default function Layout({ children }: { children: React.ReactNode }) { return <DocumentationLayout locale="en">{children}</DocumentationLayout> }
