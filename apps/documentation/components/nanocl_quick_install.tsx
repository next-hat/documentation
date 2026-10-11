import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import { Callout } from 'nextra/components';
import Terminal from './terminal';

const { h2: Heading, p: Paragraph } = getMDXComponents();

export default function QuickInstall() {
  return (
    <>
      <Heading id="quick-install">Quick install</Heading>
      <Terminal language="sh" filename="sh">
        {'curl -fsSL https://download.next-hat.com/scripts/get-nanocl.sh | sh'}
      </Terminal>
      <Paragraph>
        This script downloads and installs the latest version of Nanocl for your platform.
        It does not require root privileges: it installs under <code>~/.nanocl</code> and
        adds <code>~/.nanocl/env</code> to your shell profile so the <code>nanocl</code> command
        is available in your user&apos;s <code>PATH</code>.
      </Paragraph>
      <Callout type="info">
        The script falls back to building from crates.io if no prebuilt binary is available
        for your platform. Man pages are not installed in that case.
      </Callout>
    </>
  );
}
