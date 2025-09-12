---
title: Install on Linux - Nanocl
description: Install Nanocl on Linux using script, .deb, or tarball.
keywords: [nanocl, install, linux, deb, tar]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Linux
pagination_prev: manuals/nanocl/install/overview
pagination_next: manuals/nanocl/install/post-installation
---

import InstallBlock from '@site/src/components/install_block.jsx';
import vars from '@site/vars';

# Install Nanocl on Linux

Choose the quick script or manual install.

<InstallBlock
  platform="linux"
  debUrl={`https://github.com/next-hat/nanocl/releases/download/nanocl-${vars.nanoclLatestBinaryVersion}/nanocl_${vars.nanoclLatestBinaryVersion}_amd64.deb`}
  tarUrl={`https://github.com/next-hat/nanocl/releases/download/nanocl-${vars.nanoclLatestBinaryVersion}/nanocl_${vars.nanoclLatestBinaryVersion}_linux_amd64.tar.gz`}
/>

> Tip: The Debian/Ubuntu .deb is recommended on those distros.

## From source (crates.io)

If your platform/arch isn’t covered by our prebuilt binary, install from source using Rust and Cargo.

Prerequisites:

- Install Rust toolchain: https://www.rust-lang.org/tools/install
- Ensure build dependencies are present (Debian/Ubuntu example below)

```bash
sudo apt-get update
sudo apt-get install -y build-essential pkg-config libssl-dev libpq-dev
```

Install:

```bash
cargo install nanocl
```

## Install from Debian/Ubuntu repository (not recommended)

:::caution Not recommended for stability
Installing via apt ties `nanocl` to your system package upgrades. A future `apt upgrade` may update the CLI automatically and potentially break your setup. Prefer the tarball for stable, pinned installs.
:::

1. Install prerequisites and set up Next Hat’s keyring:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.next-hat.com/repo/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/next-hat.gpg
```

2. Add the repository:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/next-hat.gpg] https://download.next-hat.com/repo/linux/ubuntu stable main" | \
  sudo tee /etc/apt/sources.list.d/next-hat.list > /dev/null
```

3. Install `nanocl` (and optionally `c2ncl`):

```bash
sudo apt-get update
sudo apt-get install -y nanocl
# Optional: docker-compose to Statefile conversion tool
sudo apt-get install -y c2ncl
```

:::warning
If you receive a GPG error during `apt-get update`, ensure the key file is world-readable:
:::

```bash
sudo chmod a+r /etc/apt/keyrings/next-hat.gpg
```
