---
title: SubState - Nanocl
description: Use substate in your statefile.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, substate]
image: /img/logo.webp
sidebar_label: SubState
---

import StatefileBlock from '@site/src/components/statefile_block';

# SubState

You can require other Statefiles in your Statefile using the `SubStates` key.

This is useful if you need to reuse a statefile in multiple places.
Or in a mono-repository settings to have a single source of truth for your state.

There is an example of how to use it:

<StatefileBlock example="advanced/substate.yml" />
