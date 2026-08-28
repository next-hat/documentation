---
title: Statefile References - Nanocl
keywords: [documentation, references, nanocl, nanocld, Statefile, specification]
image: /img/logo.webp
sidebar_label: Statefile
sidebar_position: 8
---

import ApiSchema from '@theme/ApiSchema'

# Statefile

A Statefile describes the desired Cargoes, virtual machines, Resources, Jobs,
and Secrets. Nanocl 0.18 expects `ApiVersion: v0.18`; Cargoes use named
`Containers` and optional `InitContainers`.

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/Statefile" />
