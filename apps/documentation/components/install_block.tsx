import { translate } from '@/lib/translate'
import { localePath, type Locale } from '@/lib/locales'
import { useMDXComponents as getMDXComponents } from 'nextra-theme-docs';
import CodeBlock from './code_block';
import DirTree from './dir_tree';
import vars from '../lib/vars';

const { h2: Heading, h3: Subheading, p: Paragraph, a: Link } = getMDXComponents();

type InstallBlockProps = {
  locale?: Locale;
  platform: 'linux' | 'macos' | 'windows';
  debUrl?: string;
  tarUrl: string;
  checksumUrl?: string;
  notes?: string;
};

/**
 * InstallBlock renders quick script install and manual tar/deb instructions.
 * Props:
 * - platform: 'linux' | 'macos' | 'windows'
 * - debUrl?: string (linux only)
 * - tarUrl: string
 * - checksumUrl?: string (optional URL to SHA256SUMS or checksum file)
 * - notes?: string (optional HTML string for extra notes)
 */
export default function InstallBlock({ platform, debUrl, tarUrl, checksumUrl, notes, locale = 'en' }: InstallBlockProps) {
  const t = (text: string) => translate(locale, text);
  const script = 'curl -fsSL https://download.next-hat.com/scripts/get-nanocl.sh | sh';
  const releaseTagUrl = `https://github.com/next-hat/nanocl/releases/tag/nanocl-${vars.nanoclLatestBinaryVersion}`;

  const verify = (cmd: string) => (
    <CodeBlock language="bash">{cmd}</CodeBlock>
  );

  const linuxDeb = debUrl ? (
    <>
      <Subheading>{t("Debian/Ubuntu (.deb)")}</Subheading>
      <CodeBlock language="bash">{`curl -L -o nanocl_amd64.deb ${debUrl}
sudo dpkg -i nanocl_amd64.deb || sudo apt-get -f install -y`}</CodeBlock>
    </>
  ) : null;

  const linuxSteps = (
    <>
      <Subheading>{t("Step 1 — Get the CLI tarball")}</Subheading>
      <Paragraph>{t("Open the release page for version")}{' '}<code>{vars.nanoclLatestBinaryVersion}</code>{' '}{t("in your browser:")}{' '}<Link href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</Link>{t(", or download directly with curl:")}{' '}</Paragraph>
      <CodeBlock language="bash">{`curl -L ${tarUrl} -o nanocl.tar.gz`}</CodeBlock>

      <Subheading>{t("Step 2 — Extract and install")}</Subheading>
  <CodeBlock language="bash">{`tar -xzf nanocl.tar.gz`}</CodeBlock>
  <Paragraph>{t("Extracted directory layout:")}</Paragraph>
  <DirTree variant="unix" />
  <Paragraph>{t("Install the binary (and optional man pages):")}</Paragraph>
  <CodeBlock language="bash">{`sudo install -m 0755 bin/nanocl /usr/local/bin/nanocl
if [ -d share/man/man1 ]; then
  sudo install -m 0644 share/man/man1/*.1 /usr/local/share/man/man1/
  command -v mandb >/dev/null 2>&1 && sudo mandb || true
fi`}</CodeBlock>
    </>
  );

  const macSteps = (
    <>
      <Subheading>{t("Step 1 — Get the CLI tarball")}</Subheading>
      <Paragraph>{t("Open the release page for version")}{' '}<code>{vars.nanoclLatestBinaryVersion}</code>{' '}{t("in your browser:")}{' '}<Link href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</Link>{t(", or download directly with curl:")}{' '}</Paragraph>
      <CodeBlock language="bash">{`curl -L ${tarUrl} -o nanocl.tar.gz`}</CodeBlock>

      <Subheading>{t("Step 2 — Extract and install")}</Subheading>
  <CodeBlock language="bash">{`tar -xzf nanocl.tar.gz`}</CodeBlock>
  <Paragraph>{t("Extracted directory layout:")}</Paragraph>
  <DirTree variant="unix" />
  <Paragraph>{t("Install the binary (and optional man pages):")}</Paragraph>
  <CodeBlock language="bash">{`sudo install -m 0755 bin/nanocl /usr/local/bin/nanocl
if [ -d share/man/man1 ]; then
  sudo install -m 0644 share/man/man1/*.1 /usr/local/share/man/man1/
fi`}</CodeBlock>
    </>
  );

  const winSteps = (
    <>
      <Subheading>{t("Step 1 — Get the CLI tarball")}</Subheading>
      <Paragraph>{t("Open the release page for version")}{' '}<code>{vars.nanoclLatestBinaryVersion}</code>{' '}{t("in your browser:")}{' '}<Link href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</Link>{t(", or download directly with PowerShell:")}{' '}</Paragraph>
      <CodeBlock language="powershell">{`$dst = "$env:USERPROFILE\\nanocl"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Invoke-WebRequest -Uri "${tarUrl}" -OutFile "$dst\\nanocl.tar.gz"`}</CodeBlock>

      <Subheading>{t("Step 2 — Extract and install")}</Subheading>
      <CodeBlock language="powershell">{`# Windows 10+ includes tar
& tar -xzf "$dst\\nanocl.tar.gz" -C $dst
# The binary is under bin\\nanocl.exe
$bin = Join-Path $dst 'bin'
# Add to PATH (current session):
$env:Path = "$env:Path;$bin"
# Or copy to a directory already in PATH (requires admin):
# Copy-Item (Join-Path $bin 'nanocl.exe') "$env:ProgramFiles\\nanocl\\nanocl.exe" -Force`}</CodeBlock>
    <Paragraph>{t("Extracted directory layout:")}</Paragraph>
    <DirTree variant="windows" />
    </>
  );

  const checksum = (
    <>
      <Subheading>{t("Verify checksum (optional)")}</Subheading>
      {checksumUrl && platform === 'linux' && (
        <CodeBlock language="bash">{`curl -L ${checksumUrl} -o SHA256SUMS
sha256sum -c SHA256SUMS | grep nanocl`}</CodeBlock>
      )}
      {checksumUrl && platform === 'macos' && (
        <CodeBlock language="bash">{`curl -L ${checksumUrl} -o SHA256SUMS
shasum -a 256 -c SHA256SUMS | grep nanocl`}</CodeBlock>
      )}
      {checksumUrl && platform === 'windows' && (
        <CodeBlock language="powershell">{`$dst = "$env:USERPROFILE\\nanocl"
Invoke-WebRequest -Uri "${checksumUrl}" -OutFile "$dst\\SHA256SUMS"
Get-FileHash "$dst\\nanocl.tar.gz" -Algorithm SHA256`}</CodeBlock>
      )}
      {!checksumUrl && platform === 'linux' && (
        <CodeBlock language="bash">{`# Print the SHA256 of the extracted binary
sha256sum bin/nanocl`}</CodeBlock>
      )}
      {!checksumUrl && platform === 'macos' && (
        <CodeBlock language="bash">{`# Print the SHA256 of the extracted binary
shasum -a 256 bin/nanocl`}</CodeBlock>
      )}
      {!checksumUrl && platform === 'windows' && (
        <CodeBlock language="powershell">{`# Print the SHA256 of the extracted binary
$bin = "$env:USERPROFILE\\nanocl\\bin\\nanocl.exe"
Get-FileHash $bin -Algorithm SHA256`}</CodeBlock>
      )}
    </>
  );

  return (
    <div>
      {platform !== "windows" && (
          <>
            <Subheading>{t("Quick install (script)")}</Subheading>
            {verify(script)}
            <Paragraph>{t("The script falls back to building from source if needed.")}</Paragraph>
          </>
        )
      }
      <Heading id="manual-install">{t("Manual install")}</Heading>
      {platform === 'linux' && (
        <>
          {linuxSteps}
          {linuxDeb && (
            <>
              <Subheading>{t("Alternative — Debian/Ubuntu (.deb)")}</Subheading>
              {linuxDeb}
            </>
          )}
        </>
      )}
      {platform === 'macos' && macSteps}
      {platform === 'windows' && winSteps}
      {/* {checksum} */}
      <Subheading>{t("Verify installation")}</Subheading>
      {verify('nanocl --version')}
      {notes ? <div dangerouslySetInnerHTML={{ __html: notes }} /> : null}
      {/* Tarball layout details removed per request; described inline above */}
      <Paragraph>{t("Next:")}{' '}<Link href={localePath("/manuals/nanocl/install/post-installation", locale)}>{t("Post-installation steps")}</Link></Paragraph>
    </div>
  );
}
