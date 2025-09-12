---
title: Install Nanocl
description: How to install Nanocl. Works with Docker Desktop on Windows, macOS, and Linux.
keywords: [documentation, nanocl, setup, installation, ubuntu, debian, linux, macOS, windows, docker, podman]
image: /img/logo.webp
sidebar_position: 0
sidebar_label: Overview
pagination_next: null
pagination_prev: null
---

import License from '@site/src/components/license.mdx';

# Install Nanocl

This page provides an overview of how to install Nanocl.<br/>

## Prerequisites

Nanocl components run inside containers, so a container engine is required.<br/>
Nanocl officially supports [Docker][docker], and it also works with [Podman][podman].

### Docker

Follow the [official Docker installation guide][docker_install] for your system.<br/>
On Windows and macOS, use [Docker Desktop][docker_desktop].

### Podman

Since Podman provides a Docker-compatible API, Nanocl can run with Podman as well.<br/>
If you prefer Podman, install it using the [official documentation][podman_install].

## Supported platforms

Only the CLI ([nanocl][nanocl]) ships prebuilt for a subset of platforms:<br/>

- Linux: amd64
- macOS: aarch64 (Apple Silicon)
- Windows: amd64

Other platforms and architectures can install from source via [crates.io][crates.io]. See the prerequisites listed on that page before running Cargo.

## Installation guides

- Linux: [Install on Linux](./linux) — tarball recommended; apt available but not recommended
- macOS: [Install on macOS](./macos)
- Windows: [Install on Windows](./windows)

## Release channels

Nanocl offers two update channels: **stable** and **nightly**.

* **Stable**: latest releases intended for general availability.
* **Nightly**: pre-release builds for testing upcoming features.

:::caution
Nightly builds are experimental and may include breaking changes.
:::

## Support

Nanocl is an open-source project supported by [Next Hat][next_hat] and the community.<br />
For details and contributions, see the [GitHub repository][git_nanocl].

<License />

[next_hat]: https://next-hat.com
[nanocl]: /references/nanocl/cli/overview
[git_nanocl]: https://github.com/next-hat/nanocl
[docker]: https://www.docker.com/
[docker_install]: https://docs.docker.com/engine/install/
[docker_desktop]: https://docs.docker.com/desktop/
[crates.io]: https://crates.io/crates/nanocl
[podman]: https://podman.io/
[podman_install]: https://podman.io/getting-started/installation
