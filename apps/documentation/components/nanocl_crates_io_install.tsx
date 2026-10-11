import { translate } from '@/lib/translate'
import type { Locale } from '@/lib/locales'
import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import Terminal from './terminal';

const { p: Paragraph, ul: List, li: ListItem, a: Link } = getMDXComponents();

export default function CratesIoInstall({ locale = 'en' }: { locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  return (
    <>
      <Paragraph>{t("If there is no release binary for your platform, you can compile Nanocl from source using Cargo.")}</Paragraph>
      <Paragraph>{t("Prerequisites:")}</Paragraph>
      <List>
        <ListItem>{t("Install the")}{' '}<Link href="https://www.rust-lang.org/tools/install">{t("Rust toolchain")}</Link>.</ListItem>
        <ListItem>{t("Ensure OpenSSL and PostgreSQL client libraries are available.")}</ListItem>
      </List>
      <Terminal language="sh" filename="sh">{'cargo install nanocl'}</Terminal>
    </>
  );
}
