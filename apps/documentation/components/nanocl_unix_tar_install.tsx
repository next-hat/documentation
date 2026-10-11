import { translate } from '@/lib/translate'
import type { Locale } from '@/lib/locales'
import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import vars from '../lib/vars';
import Terminal from './terminal';
import DirTree from './dir_tree';

const { p: Paragraph, a: Link } = getMDXComponents();

type UnixTarInstallProps = {
  locale?: Locale;
  tarballUrl: string;
  tarballName: string;
};

export default function UnixTarInstall({ tarballUrl, tarballName, locale = 'en' }: UnixTarInstallProps) {
  const t = (text: string) => translate(locale, text);
  return (
    <>
      <Paragraph>{t("You can grab the Nanocl tarball directly from the")}{' '}
        <Link href={vars.nanoclReleaseTagUrl}>{t("GitHub releases page")}</Link>{t(", or download and extract it:")}{' '}</Paragraph>
      <Terminal language="sh" filename="sh">
        {`curl -LO ${tarballUrl}\ntar -xzf ${tarballName}\n`}
      </Terminal>
      <Paragraph>{t("Extracted directory layout:")}</Paragraph>
      <DirTree variant="unix" />
      <Paragraph>{t("Move the")}{' '}<code>nanocl</code>{t("binary and its man pages to the appropriate locations:")}</Paragraph>
      <Terminal language="sh" filename="sh">
        {'sudo mv ./bin/nanocl /usr/local/bin\nsudo mv ./share/man/man1/* /usr/local/share/man/man1'}
      </Terminal>
    </>
  );
}
