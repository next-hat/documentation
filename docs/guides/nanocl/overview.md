---
title: Overview - Nanocl
description: Nanocl is a portable, open-source platform for running container and virtual-machine workloads from declarative Statefiles.
keywords: [documentation, nanocl, guides, overview, architecture, containers, virtual machines]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Overview
---

# Nanocl overview

Nanocl is a portable, open-source platform for running container and virtual
machine workloads on your own infrastructure. A declarative Statefile
describes Cargoes, virtual machines, jobs, secrets, and controller resources;
the Nanocl daemon reconciles those objects with the local runtime.

The name is short for *nano cloud*: the project aims to provide useful cloud
workload primitives without requiring a large control plane.

## What Nanocl provides

- Named, replicated application containers grouped into Cargoes, with ordered
  init containers and Docker-compatible configuration.
- Health-aware workload readiness, restarts, history, and controlled updates.
- Container and virtual-machine lifecycle management through an HTTP API and
  the `nanocl` CLI.
- Dynamic HTTP, stream, and DNS rules through `ncproxy` and `ncdns`.
- Secrets, jobs, metrics, Statefile templating, and state backup.

Nanocl 0.18 is primarily a single-node operational system. It does not ship
automatic multi-node scheduling, autoscaling, cluster-wide high availability,
or a service mesh. Named Docker networks are local to a node and are not owned
by Nanocl namespaces.

## Nanocl architecture

The `nanocl` client sends API requests to `nanocld`. The daemon stores desired
and observed state in `nstore`, manages Docker processes, and publishes events
consumed by the proxy and DNS controllers.

The default installation contains:

- **nanocld / ndaemon** — the API and workload controller.
- **nstore** — CockroachDB-backed persistent control-plane state.
- **nmetrics** — the `metrsd` host metrics service.
- **ncproxy** — the proxy controller with its Nginx data plane embedded in the
  same service container. There is no separately operated `nproxy` service.
- **ncdns** — the DNS controller with its dnsmasq data plane embedded in the
  same service container. There is no separately operated `ndns` service.
- **ncvpnkit** — the Docker Desktop networking controller, installed only for
  that environment.

Simplified single-node architecture:

<div class="center">
  <img src="/img/architecture.png" alt="Nanocl single-node architecture" />
</div>

The diagram labels each Cargo as a group of processes. In 0.18, one Cargo
replica can contain several named application containers and, when required,
one internal network sandbox.

## Core objects

### Cargo

A Cargo is a durable container workload with one or more named application
containers, optional init containers, and a replica count. See
[Multi-container Cargoes](./advanced-usage/multi-container-cargoes.md).

### Virtual machine

A virtual machine runs QEMU inside a managed runtime container and uses a full
local disk-image path. An optional init container can prepare that image before
the runtime starts.

### Job

A Job is a finite container task. Unlike Cargo application containers, it is
expected to exit after completing its work.

### Resource

Resources extend Nanocl through controllers. The default `ncproxy` and `ncdns`
controllers consume proxy and DNS rule resources.

### Secret

Secrets hold environment, registry, or TLS data. A Cargo-level secret is
inherited by all of its containers; a container-level secret is scoped to that
named container.
