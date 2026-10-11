import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
export const metadata = documentationMetadata('ru')
export default function Layout({ children }: { children: React.ReactNode }) { return <DocumentationLayout locale="ru">{children}</DocumentationLayout> }
