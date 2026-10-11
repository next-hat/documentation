import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import Terminal from './terminal';

const { p: Paragraph, ul: List, li: ListItem, a: Link } = getMDXComponents();

export default function CratesIoInstall() {
  return (
    <>
      <Paragraph>If there is no release binary for your platform, you can compile Nanocl from source using Cargo.</Paragraph>
      <Paragraph>Prerequisites:</Paragraph>
      <List>
        <ListItem>Install the <Link href="https://www.rust-lang.org/tools/install">Rust toolchain</Link>.</ListItem>
        <ListItem>Ensure OpenSSL and PostgreSQL client libraries are available.</ListItem>
      </List>
      <Terminal language="sh" filename="sh">{'cargo install nanocl'}</Terminal>
    </>
  );
}
