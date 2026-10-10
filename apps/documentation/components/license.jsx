import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
const { h2: Heading, p: Paragraph, a: Link } = getMDXComponents();

export default function License() {
  return (
    <>
      <Heading id="licensing">Licensing</Heading>
      <Paragraph>
        <Link href="https://github.com/next-hat/nanocl">Nanocl is open source</Link> and dual licensed
        under the{' '}
        <Link href="https://github.com/next-hat/nanocl/blob/nightly/LICENSE-APACHE">Apache License, Version 2.0</Link>
        {' '}and the{' '}
        <Link href="https://github.com/next-hat/nanocl/blob/nightly/LICENSE-MIT">MIT license</Link>.
      </Paragraph>
    </>
  );
}
