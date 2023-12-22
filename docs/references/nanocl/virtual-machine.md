---
title: Virtual Machine References | Nanocl
keywords: [documentation, references, nanocl, nanocld, virtual machine, vm, vms, specification, spec]
image: /img/logo.webp
sidebar_label: Virtual Machine
sidebar_position: 4
---

# Virtual Machine

In Nanocl, a `Virtual Machine` refers to a virtual machine configuration.<br />
Once created the system will ensure your Virtual Machine is always running.<br />
There is the openapi specification for a `VmSpecPartial` used to create a `Virtual Machine`:

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/VmSpecPartial" />
