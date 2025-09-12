---
title: Install on Windows - Nanocl
description: Install Nanocl on Windows using script or tarball.
keywords: [nanocl, install, windows, tar]
image: /img/logo.webp
sidebar_position: 3
sidebar_label: Windows
pagination_prev: manuals/nanocl/install/overview
pagination_next: manuals/nanocl/install/post-installation
---

import vars from '@site/vars';
import Terminal from '@site/src/components/terminal';
import DirTree from '@site/src/components/dir_tree.jsx';
import InstallBlock from '@site/src/components/install_block.jsx';

# Install on Windows

Use PowerShell to download and extract the tarball, then add the folder to your PATH.

:::warning
Windows support is experimental. Use at your own risk.<br/>
We recommend using Windows Subsystem for Linux (WSL) for a more stable experience.
:::

## Manual install

### Get the CLI tarball

You can grab the nanocl tarball directly from the <a href={vars.nanoclReleaseTagUrl}>GitHub releases page</a>.<br/>
You can also use the following commands to download and extract the tarball:

<Terminal language="powershell">{`$dst = "$env:USERPROFILE\\nanocl"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Invoke-WebRequest -Uri "${vars.nanoclWindowsTarballUrl}" -OutFile "$dst\\nanocl.tar.gz"`}</Terminal>

Extracted directory layout:

<DirTree variant="windows" />

<Terminal language="powershell">{`# Windows 10+ includes tar
& tar -xzf "$dst\\nanocl.tar.gz" -C $dst
# The binary is under bin\\nanocl.exe
$bin = Join-Path $dst 'bin'
# Add to PATH (current session):
$env:Path = "$env:Path;$bin"
# Or copy to a directory already in PATH (requires admin):
# Copy-Item (Join-Path $bin 'nanocl.exe') "$env:ProgramFiles\\nanocl\\nanocl.exe" -Force`}</Terminal>


## Compile from source

If you're on a different architecture or prefer building from source.

Prerequisites:

- Install Rust toolchain: https://www.rust-lang.org/tools/install
- Visual Studio Build Tools (C++ build tools) or a working MSVC toolchain
- OpenSSL and libpq development libraries if not bundled; on Windows these are typically statically linked during build if available

<Terminal language="powershell">
{`cargo install nanocl`}
</Terminal>

