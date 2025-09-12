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

import vars from '@site/vars';
import QuickInstall from '@site/src/components/nanocl_quick_install.mdx';
import UnixTarInstall from '@site/src/components/nanocl_unix_tar_install.mdx';
import CratesIoInstall from '@site/src/components/nanocl_crates_io_install.mdx';
import Verify from '@site/src/components/nanocl_verify_install.mdx';
import Terminal from '@site/src/components/terminal';

# Install on Linux

<QuickInstall />

## Manual install

### Get the CLI tarball

<UnixTarInstall tarballUrl={vars.nanoclLinuxTarballUrl} tarballName={`${vars.nanoclLinuxTarballName}`} />

### Debian/Ubuntu

A `.deb` package is also available for Debian-based distributions like Debian and Ubuntu.

<Terminal language="sh" filename="sh">
{`curl -LO ${vars.nanoclDebUrl}
sudo dpkg -i ${vars.nanoclDebName}
`}
</Terminal>

## Compile from source

<CratesIoInstall />

## Verify installation

<Verify />

Now be sure to follow the [post installation steps](/manuals/nanocl/install/post-installation) to install nanocl components.