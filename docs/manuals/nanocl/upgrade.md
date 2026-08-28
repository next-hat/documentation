---
title: Upgrading - Nanocl
description: Back up and migrate a Nanocl installation between pre-v1 releases.
keywords: [documentation, nanocl, upgrade, migration, backup, 0.18]
image: /img/logo.webp
sidebar_label: Upgrade
---

import Terminal from '@site/src/components/terminal';

# Upgrading Nanocl

Nanocl is pre-v1 and its Statefile and storage formats can change between
minor releases. Read the release-specific migration notes before replacing an
installation. A 0.17 to 0.18 migration is breaking and may require downtime.

## Export the current state

Before uninstalling 0.17, export the desired state to an empty directory:

<Terminal language="sh">
{`nanocl backup -o ./nanocl-0.17-backup`}
</Terminal>

The backup command writes one Statefile for each namespace, plus separate
`jobs.yml`, `secrets.yml`, and `resources.yml` files. Keep a copy outside
`/var/lib/nanocl`.

Backups preserve the schema reported by the connected 0.17 daemon. They are
not automatically converted to 0.18. Review and rewrite every exported file
before reapplying it.

## Migrating 0.17 Statefiles to 0.18

The main Cargo shape changed from one anonymous container and replication
modes to named container lists and an integer replica count:

```yaml title="0.17"
ApiVersion: v0.17
Cargoes:
- Name: api
  Container:
    Image: ghcr.io/example/api:1.0.0
  Replication:
    Mode: Static
    Replicas: 2
```

```yaml title="0.18"
ApiVersion: v0.18
Cargoes:
- Name: api
  Replicas: 2
  Containers:
  - Name: api
    Image: ghcr.io/example/api:1.0.0
```

For each Cargo:

- Replace `Container` with one or more named `Containers`.
- Move ordered startup work to named `InitContainers`.
- Replace the old replication object/mode with integer `Replicas` (minimum 1).
- Move network mode, host port bindings, hostname, and DNS configuration to
  the Cargo. Per-container port publishing is rejected.
- Change namespaced object keys and proxy targets from `{name}.{namespace}` to
  the canonical `{namespace}.{name}` order.

VM Statefiles now use a full local `Image` path and may use `InitContainer` to
prepare that image. The daemon-managed `nanocl vm image` workflow was removed.

Cargo-scoped `cargo exec` and group kill operations were also removed. Use
`nanocl ps` to select one concrete process, then run `nanocl exec PROCESS --
COMMAND...` or `nanocl kill PROCESS`.

## Upgrade sequence

1. Back up Statefiles and any application data.
2. Rewrite and review the exported Statefiles for the 0.18 schema.
3. Stop traffic and workloads as appropriate for your application.
4. Uninstall the old components, preserve the external backup, and install
   Nanocl 0.18 using the [installation guide](./install/overview.md).
5. Validate the rewritten files with `nanocl state render` before applying
   them, then apply them in dependency order (secrets, jobs/resources, and
   namespace workloads as required by your deployment).
6. Check Cargo health, proxy/DNS rules, and application behavior before
   restoring traffic.

The installer does not make this breaking Statefile migration automatic and
does not provide a zero-downtime upgrade guarantee.

:::info TLS database secret
On the first upgraded `nanocld` startup, readable legacy certificate paths in
the internal database TLS secret are replaced with their PEM contents. Keep
those certificate files available for that startup.
:::

For more detail, see [Multi-container Cargoes](/guides/nanocl/advanced-usage/multi-container-cargoes),
[Cargo networking](/guides/nanocl/advanced-usage/cargo-networking), and
[Process operations](/guides/nanocl/advanced-usage/process-operations).
