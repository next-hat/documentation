import { translate } from '@/lib/translate'
import type { Locale } from '@/lib/locales'
import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
const { h2: Heading, p: Paragraph, a: Link } = getMDXComponents();

export default function License({ locale = 'en' }: { locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  return (
    <>
      <Heading id="licensing">{t("Licensing")}</Heading>
      <Paragraph>
        <Link href="https://github.com/next-hat/nanocl">{t("Nanocl is open source")}</Link>{' '}{t("and dual licensed under the")}{' '}
        <Link href="https://github.com/next-hat/nanocl/blob/nightly/LICENSE-APACHE">{t("Apache License, Version 2.0")}</Link>
        {' '}{t("and the")}{' '}
        <Link href="https://github.com/next-hat/nanocl/blob/nightly/LICENSE-MIT">{t("MIT license")}</Link>.
      </Paragraph>
    </>
  );
}
