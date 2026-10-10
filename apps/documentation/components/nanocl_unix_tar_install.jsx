import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import vars from '../lib/vars';
import Terminal from './terminal';
import DirTree from './dir_tree';

const { p: Paragraph, a: Link } = getMDXComponents();

export default function UnixTarInstall({ tarballUrl, tarballName }) {
  return (
    <>
      <Paragraph>
        You can grab the Nanocl tarball directly from the{' '}
        <Link href={vars.nanoclReleaseTagUrl}>GitHub releases page</Link>, or download and extract it:
      </Paragraph>
      <Terminal language="sh" filename="sh">
        {`curl -LO ${tarballUrl}\ntar -xzf ${tarballName}\n`}
      </Terminal>
      <Paragraph>Extracted directory layout:</Paragraph>
      <DirTree variant="unix" />
      <Paragraph>Move the <code>nanocl</code> binary and its man pages to the appropriate locations:</Paragraph>
      <Terminal language="sh" filename="sh">
        {'sudo mv ./bin/nanocl /usr/local/bin\nsudo mv ./share/man/man1/* /usr/local/share/man/man1'}
      </Terminal>
    </>
  );
}
