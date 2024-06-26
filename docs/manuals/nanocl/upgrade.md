---
title: Upgrading - Nanocl
description: Upgrade Nanocl to the latest version.
keywords: [documentation, nanocl, guides, upgrade, update, version, latest]
image: /img/logo.webp
sidebar_label: Upgrade
---

# Overview

In the current state of Nanocl, upgrading is not as simple as it should be. This is because Nanocl is still in development and the API is not stable yet. This means that the API can change at any time and upgrading Nanocl can break because of the previous database state.

:::note
We encourage our community to help us stabilize the API and make upgrading as simple as possible.
To do so don't hesitate to create [issues][github_issues], create [discussions][github_discussions] on our github repository or join our [discord][discord] server.
:::

# Upgrading

To upgrade Nanocl, you will need to follow these steps:

-  Backup your current state by running:
    ```sh
    nanocl backup -o /path/to/backup
    ```

-   Uninstall the current version of Nanocl
    ```sh
    nanocl uninstall
    ```
-   Remove the current nanocl state by running:
    ```sh
    sudo rm -rf /var/lib/nanocl
    ```
-   Grap the latest version of the nanocl cli using our [installation guide](/manuals/nanocl/install/overview)
-   Install the new version
    ```sh
    nanocl install
    ```

Then you need to reapply your Statefiles to recover your previous state.

To compensate the lack of upgrade support you can share this meme with your friends:

<div class="center">
    <img src="/img/nanocl_upgrade.jpg" />
</div>

[github_issues]: https://github.com/next-hat/nanocl/issues
[github_discussions]: https://github.com/next-hat/nanocl/discussions
[discord]: https://discord.gg/WV4Aac8uZg