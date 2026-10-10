import { Code, Pre } from 'nextra/components';
import { codeToTokens } from 'shiki';

/** Highlight interpolated examples on the server, using Nextra's copyable code block. */
export default async function CodeBlock({ children, language = 'text', className = '' }) {
  const lang = className.match(/language-([\w-]+)/)?.[1] || language;
  const source = Array.isArray(children) ? children.join('') : String(children ?? '');
  const { tokens } = await codeToTokens(source.trimEnd(), {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });

  return (
    <Pre data-language={lang} data-copy="" data-word-wrap="" data-theme="github-light github-dark" className="documentation-code">
      <Code className={`language-${lang}`}>
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
