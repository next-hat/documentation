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

import vars from '@site/vars';
import QuickInstall from '@site/src/components/nanocl_quick_install.mdx';
import UnixTarInstall from '@site/src/components/nanocl_unix_tar_install.mdx';
import CratesIoInstall from '@site/src/components/nanocl_crates_io_install.mdx';
import Verify from '@site/src/components/nanocl_verify_install.mdx';
import Terminal from '@site/src/components/terminal';

# Install Nanocl on MacOS

<QuickInstall />

## Manual install

### Get the CLI tarball

<UnixTarInstall tarballUrl={vars.nanoclMacOsTarballUrl} tarballName={`${vars.nanoclMacOsTarballName}`} />

## Compile from source

You need to install PostgreSQL first using Homebrew:

<Terminal language="sh" filename="sh">
{`brew install libpq
brew link --force libpq
`}
</Terminal>

<CratesIoInstall />

## Verify installation

<Verify />

Now be sure to follow the [post installation steps](/manuals/nanocl/install/post-installation) to install nanocl components.