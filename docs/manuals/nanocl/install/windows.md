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

import InstallBlock from '@site/src/components/install_block.jsx';
import vars from '@site/vars';

# Install on Windows

Use PowerShell to download and extract the tarball, then add the folder to your PATH.

:::warning
Windows support is experimental. Use at your own risk.
We recommend using Windows Subsystem for Linux (WSL) for a more stable experience.
:::

<InstallBlock
  platform="windows"
  tarUrl={`https://github.com/next-hat/nanocl/releases/download/nanocl-${vars.nanoclLatestBinaryVersion}/nanocl_${vars.nanoclLatestBinaryVersion}_windows_amd64.tar.gz`}
  notes="If you're using Windows Terminal or PowerShell 7, ensure the extraction path is in your PATH environment variable, or move the binary to a folder like C:\\Windows\\System32 (requires admin)."
/>

## From source (crates.io)

If you’re on a different architecture or prefer building from source.

Prerequisites:

- Install Rust toolchain: https://www.rust-lang.org/tools/install
- Visual Studio Build Tools (C++ build tools) or a working MSVC toolchain
- OpenSSL and libpq development libraries if not bundled; on Windows these are typically statically linked during build if available

```powershell
cargo --version  # should print version after installing toolchain
```

Install:

```powershell
cargo install nanocl
```
