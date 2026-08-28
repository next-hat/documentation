---
title: Cargo References - Nanocl
keywords: [documentation, references, nanocl, nanocld, cargo, specification, spec]
image: /img/logo.webp
sidebar_label: Cargo
sidebar_position: 3
---

# Cargo

In Nanocl 0.18, a `Cargo` is a durable workload containing named application
`Containers`, optional ordered `InitContainers`, and an integer `Replicas`
count. Cargo-owned network and port settings describe each replica's shared
network boundary; Docker configuration and container-only secrets remain on
each named container.

The OpenAPI schema below is the source reference for `CargoSpec`. For
runtime topology and examples, see
[Multi-container Cargoes](/guides/nanocl/advanced-usage/multi-container-cargoes).

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/CargoSpec" />
