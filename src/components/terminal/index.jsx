import CodeBlock from '@theme/CodeBlock';
import './terminal.css';

export default function Terminal({ filename, language = 'bash', children, className = '' }) {
  return (
    <figure className={`terminal ${className}`}>
      <div className="terminal__bar" role="presentation">
        <div className="terminal__traffic" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--amber" />
          <span className="dot dot--green" />
        </div>
        {filename ? (
          <figcaption className="terminal__title" title={filename}>
            {'> '}{filename}
          </figcaption>
        ) : (
          <div className="terminal__spacer" />
        )}
      </div>
      <div>
        <CodeBlock language={language}>{children}</CodeBlock>
      </div>
    </figure>
  );
}