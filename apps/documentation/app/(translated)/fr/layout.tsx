import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
export const metadata = documentationMetadata('fr')
export default function Layout({ children }: { children: React.ReactNode }) { return <DocumentationLayout locale="fr">{children}</DocumentationLayout> }
