import CodeBlock from '../code_block';

type ChecksumProps = {
  platform: 'linux' | 'macos' | 'windows';
  checksumUrl?: string;
};

export default function Checksum({ platform, checksumUrl }: ChecksumProps) {
  if (platform === 'windows') {
    return (
      <CodeBlock language="powershell">{checksumUrl ? `$dst = "$env:USERPROFILE\\nanocl"
Invoke-WebRequest -Uri "${checksumUrl}" -OutFile "$dst\\SHA256SUMS"
Get-FileHash "$dst\\nanocl.tar.gz" -Algorithm SHA256` : `$bin = "$env:USERPROFILE\\nanocl\\bin\\nanocl.exe"
Get-FileHash $bin -Algorithm SHA256`}</CodeBlock>
    );
  }
  if (platform === 'macos') {
    return (
      <CodeBlock language="bash">{checksumUrl ? `curl -L ${checksumUrl} -o SHA256SUMS
shasum -a 256 -c SHA256SUMS | grep nanocl` : `shasum -a 256 bin/nanocl`}</CodeBlock>
    );
  }
  // linux
  return (
    <CodeBlock language="bash">{checksumUrl ? `curl -L ${checksumUrl} -o SHA256SUMS
sha256sum -c SHA256SUMS | grep nanocl` : `sha256sum bin/nanocl`}</CodeBlock>
  );
}
