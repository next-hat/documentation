import { Code, Pre } from 'nextra/components';
import type { ReactNode } from 'react';
import { codeToTokens, type BundledLanguage, type SpecialLanguage } from 'shiki';

/** Highlight interpolated examples on the server, using Nextra's copyable code block.
 * Use data-language so Redoc's Prism does not rewrite Shiki's markup before hydration.
 */
export default async function CodeBlock({ children, language = 'text', className = '' }: { children?: ReactNode; language?: string; className?: string }) {
  const lang = className.match(/language-([\w-]+)/)?.[1] || language;
  const source = Array.isArray(children) ? children.join('') : String(children ?? '');
  const { tokens } = await codeToTokens(source.trimEnd(), {
    lang: lang as BundledLanguage | SpecialLanguage,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });

  return (
    <Pre data-language={lang} data-copy="" data-word-wrap="" data-theme="github-light github-dark" className="documentation-code">
      <Code data-language={lang}>
        {tokens.map((line, index) => (
          <span className="line" key={index}>
            {line.map((token, tokenIndex) => (
              <span key={tokenIndex} style={token.htmlStyle}>{token.content}</span>
            ))}
            {index < tokens.length - 1 ? '\n' : null}
          </span>
        ))}
      </Code>
    </Pre>
  );
}
