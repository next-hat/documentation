import { translate } from '@/lib/translate'
import type { Locale } from '@/lib/locales'
import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import Terminal from './terminal';

const { p: Paragraph } = getMDXComponents();

export default function VerifyInstall({ locale = 'en' }: { locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  return (
    <>
      <Paragraph>{t("Verify that Nanocl is correctly installed by checking its version:")}</Paragraph>
      <Terminal language="sh">{'nanocl --version'}</Terminal>
    </>
  );
}
