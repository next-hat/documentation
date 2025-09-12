---
title: Install on macOS - Nanocl
description: Install Nanocl on macOS using script or tarball.
keywords: [nanocl, install, macos, tar]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: MacOS
pagination_prev: manuals/nanocl/install/overview
pagination_next: manuals/nanocl/install/post-installation
---

import InstallBlock from '@site/src/components/install_block.jsx';
import vars from '@site/vars';

# Install Nanocl on MacOS

Choose the quick script or manual install.

<InstallBlock
  platform="macos"
  tarUrl={`https://github.com/next-hat/nanocl/releases/download/nanocl-${vars.nanoclLatestBinaryVersion}/nanocl_${vars.nanoclLatestBinaryVersion}_mac_aarch64.tar.gz`}
/>

## From source (crates.io)

For non-aarch64 macOS or if you prefer building from source.

Prerequisites:

- Install Rust toolchain: https://www.rust-lang.org/tools/install
- Ensure OpenSSL and PostgreSQL client libraries are available (libpq installed via Homebrew)

```bash
cargo --version  # should print version after installing toolchain
# OpenSSL is provided by macOS, but ensuring headers via Homebrew can help
brew install libpq
brew link --force libpq
```

Install:

```bash
cargo install nanocl
```
