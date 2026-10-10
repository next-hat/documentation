import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import Terminal from './terminal';

const { p: Paragraph } = getMDXComponents();

export default function VerifyInstall() {
  return (
    <>
      <Paragraph>Verify that Nanocl is correctly installed by checking its version:</Paragraph>
      <Terminal language="sh">{'nanocl --version'}</Terminal>
    </>
  );
}
