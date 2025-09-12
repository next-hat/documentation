import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import DirTree from './dir_tree';
import vars from '@site/vars';

/**
 * InstallBlock renders quick script install and manual tar/deb instructions.
 * Props:
 * - platform: 'linux' | 'macos' | 'windows'
 * - debUrl?: string (linux only)
 * - tarUrl: string
 * - checksumUrl?: string (optional URL to SHA256SUMS or checksum file)
 * - notes?: string (optional HTML string for extra notes)
 */
export default function InstallBlock({ platform, debUrl, tarUrl, checksumUrl, notes }) {
  const script = 'curl -fsSL https://download.next-hat.com/scripts/get-nanocl.sh | sh';
  const releaseTagUrl = `https://github.com/next-hat/nanocl/releases/tag/nanocl-${vars.nanoclLatestBinaryVersion}`;

  const verify = (cmd) => (
    <CodeBlock language="bash">{cmd}</CodeBlock>
  );

  const linuxDeb = debUrl ? (
    <>
      <h3>Debian/Ubuntu (.deb)</h3>
      <CodeBlock language="bash">{`curl -L -o nanocl_amd64.deb ${debUrl}
sudo dpkg -i nanocl_amd64.deb || sudo apt-get -f install -y`}</CodeBlock>
    </>
  ) : null;

  const linuxSteps = (
    <>
      <h3>Step 1 — Get the CLI tarball</h3>
      <p>
        Open the release page for version <code>{vars.nanoclLatestBinaryVersion}</code> in your browser:
        {' '}<a href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</a>
        , or download directly with curl:
      </p>
      <CodeBlock language="bash">{`curl -L ${tarUrl} -o nanocl.tar.gz`}</CodeBlock>

      <h3>Step 2 — Extract and install</h3>
  <CodeBlock language="bash">{`tar -xzf nanocl.tar.gz`}</CodeBlock>
  <p>Extracted directory layout:</p>
  <DirTree variant="unix" />
  <p>Install the binary (and optional man pages):</p>
  <CodeBlock language="bash">{`sudo install -m 0755 bin/nanocl /usr/local/bin/nanocl
if [ -d share/man/man1 ]; then
  sudo install -m 0644 share/man/man1/*.1 /usr/local/share/man/man1/
  command -v mandb >/dev/null 2>&1 && sudo mandb || true
fi`}</CodeBlock>
    </>
  );

  const macSteps = (
    <>
      <h3>Step 1 — Get the CLI tarball</h3>
      <p>
        Open the release page for version <code>{vars.nanoclLatestBinaryVersion}</code> in your browser:
        {' '}<a href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</a>
        , or download directly with curl:
      </p>
      <CodeBlock language="bash">{`curl -L ${tarUrl} -o nanocl.tar.gz`}</CodeBlock>

      <h3>Step 2 — Extract and install</h3>
  <CodeBlock language="bash">{`tar -xzf nanocl.tar.gz`}</CodeBlock>
  <p>Extracted directory layout:</p>
  <DirTree variant="unix" />
  <p>Install the binary (and optional man pages):</p>
  <CodeBlock language="bash">{`sudo install -m 0755 bin/nanocl /usr/local/bin/nanocl
if [ -d share/man/man1 ]; then
  sudo install -m 0644 share/man/man1/*.1 /usr/local/share/man/man1/
fi`}</CodeBlock>
    </>
  );

  const winSteps = (
    <>
      <h3>Step 1 — Get the CLI tarball</h3>
      <p>
        Open the release page for version <code>{vars.nanoclLatestBinaryVersion}</code> in your browser:
        {' '}<a href={releaseTagUrl} target="_blank" rel="noreferrer">{releaseTagUrl}</a>
        , or download directly with PowerShell:
      </p>
      <CodeBlock language="powershell">{`$dst = "$env:USERPROFILE\\nanocl"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Invoke-WebRequest -Uri "${tarUrl}" -OutFile "$dst\\nanocl.tar.gz"`}</CodeBlock>

      <h3>Step 2 — Extract and install</h3>
      <CodeBlock language="powershell">{`# Windows 10+ includes tar
& tar -xzf "$dst\\nanocl.tar.gz" -C $dst
# The binary is under bin\\nanocl.exe
$bin = Join-Path $dst 'bin'
# Add to PATH (current session):
$env:Path = "$env:Path;$bin"
# Or copy to a directory already in PATH (requires admin):
# Copy-Item (Join-Path $bin 'nanocl.exe') "$env:ProgramFiles\\nanocl\\nanocl.exe" -Force`}</CodeBlock>
    <p>Extracted directory layout:</p>
    <DirTree variant="windows" />
    </>
  );

  const checksum = (
    <>
      <h3>Verify checksum (optional)</h3>
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
            <h3>Quick install (script)</h3>
            {verify(script)}
            <p>The script falls back to building from source if needed.</p>
          </>
        )
      }
      <h1 id="manual-install">Manual install</h1>
      {platform === 'linux' && (
        <>
          {linuxSteps}
          {linuxDeb && (
            <>
              <h3>Alternative — Debian/Ubuntu (.deb)</h3>
              {linuxDeb}
            </>
          )}
        </>
      )}
      {platform === 'macos' && macSteps}
      {platform === 'windows' && winSteps}
      {/* {checksum} */}
      <h3>Verify installation</h3>
      {verify('nanocl --version')}
      {notes ? <div dangerouslySetInnerHTML={{ __html: notes }} /> : null}
      {/* Tarball layout details removed per request; described inline above */}
      <p>Next: <a href="/manuals/nanocl/install/post-installation">Post-installation steps</a></p>
    </div>
  );
}
