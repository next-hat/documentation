---
title: Overview - Manuals - Nanocl
sidebar_label: Overview
description: Overview of the Nanocl Manual
keywords: [documentation, setups, summary, nanocl, manual, overview]
image: /img/logo.webp
sidebar_position: 1
pagination_next: null
pagination_prev: null
---

import License from '@site/src/components/license.mdx';

# Nanocl overview

Nanocl is a open-source platform for managing workloads.
It acts as a client-server application with:

* A server with a long-running daemon process [nanocld](/docs/references/nanocl/daemon/overview.md).
* APIs which specify interfaces that programs can use to talk to and instruct the Nanocl daemon.
* A command-line interface (CLI) [nanocl](/docs/references/nanocl/cli/overview.md) that communicates with the daemon process.

The CLI uses Nanocl APIs to control or interact with the Nanocl daemon through scripting or direct CLI commands. Many other Nanocl applications use the underlying API and CLI. The daemon creates and manage Nanocl objects, such as images, jobs, cargoes and virtual machines.

Nanocl 0.18 is primarily operated on a single node. The daemon exposes some
experimental node APIs, but this release does not provide automatic multi-node
scheduling, autoscaling, or cluster-wide high availability. Nanocl integrates
with [metrs](https://github.com/next-hat/metrs) to collect host metrics.

For more details, see [Nanocl Architecture](/docs/guides/nanocl/overview.md#nanocl-architecture).

<License />
