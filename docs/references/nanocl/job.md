---
title: Nanocl Job References
keywords: [documentation, references, nanocl, nanocld, job, specification, spec]
image: /img/logo.webp
sidebar_label: Job
sidebar_position: 5
---

# Job

In Nanocl, a `Job` is a list of commands to run.<br />
Unlike a [Cargo](./cargo.md) it aim to stop running.<br />

There is the openapi specification for a `JobPartial` used to create a `job`:

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/JobPartial" />
