import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Terminal from './terminal';

/**
 * DirTree renders a simple directory structure tree.
 * Props:
 * - variant: 'unix' | 'windows'
 */
export default function DirTree({ variant = 'unix' }) {
  if (variant === 'windows') {
    return (
      <Terminal language="text">{`<extract-dir>
├─ bin\\
│  └─ nanocl.exe (the nanocl binary)
└─ share\\
   └─ man\\
      └─ man1\\   (multiple man pages for nanocl and its subcommands)`}</Terminal>
    );
  }
  return (
    <Terminal language="text">{`.
├─ bin/
│  └─ nanocl (the nanocl binary)
└─ share/
   └─ man/
      └─ man1/   (multiple man pages for nanocl and its subcommands)`}</Terminal>
  );
}
