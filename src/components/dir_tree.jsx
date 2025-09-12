import React from 'react';
import CodeBlock from '@theme/CodeBlock';

/**
 * DirTree renders a simple directory structure tree.
 * Props:
 * - variant: 'unix' | 'windows'
 */
export default function DirTree({ variant = 'unix' }) {
  if (variant === 'windows') {
    return (
      <CodeBlock language="text">{`<extract-dir>
├─ bin\\
│  └─ nanocl.exe
└─ share\\
   └─ man\\
      └─ man1\\   (multiple .1 man pages for nanocl and subcommands)`}</CodeBlock>
    );
  }
  return (
    <CodeBlock language="text">{`.
├─ bin/
│  └─ nanocl
└─ share/
   └─ man/
      └─ man1/   (multiple .1 man pages for nanocl and subcommands)`}</CodeBlock>
  );
}
