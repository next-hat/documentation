---
title: Nanocl Statefile References
keywords: [documentation, references, nanocl, nanocld, Statefile, specification]
image: /img/logo.webp
sidebar_label: Statefile
sidebar_position: 6
---

import ApiSchema from '@theme/ApiSchema'

# Statefile

In Nanocl, a `Statefile` refers to a file that will containt the current state you want.<br />
It will help you manage your `Cargoes`, `Virtual Machines` and `Resources`.

## Metadata

The `Metadata` of the `Statefile` is always present usually at the top of the file:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/StateMeta" />

## Deployment


`Statefile` with a `Kind` set to `Deployment` can have the following keys:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/StateDeployment" />

If the kind is only set on `Cargo`, `Virtual Machine`, `Resource` or `Secret` only an array with the specific `Kind` will be allowed.
