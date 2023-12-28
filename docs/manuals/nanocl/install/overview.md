---
title: Install | Nanocl
description: This section describes how to install Nanocl. Nanocl is available for Windows, macOS, and Linux, through Docker Desktop.
keywords: [documentation, nanocl , setup, installation, ubuntu, install, debian, linux, macos, windows]
image: /img/logo.webp
sidebar_position: 0
sidebar_label: Overview
pagination_next: null
pagination_prev: null
---

import License from '@site/src/components/license.mdx';

# Install Nanocl

This section describes how to install Nanocl.<br/>

## Prerequisites

Nanocl components run inside containers so it requires a container engine to be installed.<br/>
Currently it's have an official support for [Docker][docker] but [Podman][podman] can be used as well.

### Docker

Please follow the [official documentation][docker_install] to install Docker on your system.<br/>
Nanocl is also available for Windows, MacOS, through [Docker Desktop][docker_desktop].

### Podman

Since podman have a docker compatible API, Nanocl can be run with podman.<br/>
If you prefer to use podman, please start by installing it on your system using the [official documentation][podman_install].

## Supported platforms

Only the CLI ([nanocl][nanocl]) lack of platform and architecture support.<br/>
But it can be easily compiled by yourself using [rust][rust].

| Platforms    |  x86_64 / amd64 | arm64 / aarch64
| ----------- | ----------- | ----------- |
| Debian / Ubuntu | ✅ | [crates.io][crates.io] |
| MacOS       | [crates.io][crates.io] | [crates.io][crates.io] |
| Windows     | [crates.io][crates.io] | [crates.io][crates.io] |
| Binaries      | ✅ | [crates.io][crates.io] |

## Release channels

Nanocl has two types of update channels, **stable** and **nightly**:

* The **stable** channel gives you the latest versions released for general availability.
* The **nightly** channel gives you pre-release versions that are ready for testing before general availability.

:::caution
The nightly channel is a pre-release versions include experimental and early-access features that are subject to breaking changes.
:::

## Support

Nanocl is an open source project, supported by [Next Hat][next_hat] and community members.<br />
For information about the open source project, refer to the [github repository][git_nanocl].

<License />

[next_hat]: https://next-hat.com
[nanocl]: /docs/references/nanocl/cli.md
[git_nanocl]: https://github.com/next-hat/nanocl
[rust]: https://www.rust-lang.org/
[docker]: https://www.docker.com/
[docker_desktop]: https://docs.docker.com/desktop/
[crates.io]: /manuals/nanocl/install/crates-io
[docker]: https://www.docker.com/
[docker_install]: https://docs.docker.com/engine/install/
[docker_desktop]: https://docs.docker.com/desktop/
[podman]: https://podman.io/
[podman_install]: https://podman.io/getting-started/installation