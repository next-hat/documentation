---
title: Nanocl post installation
description: This section contains required procedures for configuring Nanocl after installation.
keywords: [documentation, nanocl , setup, installation, post installation]
image: /img/logo.webp
sidebar_position: 3
sidebar_label: Post Installation
pagination_prev: setups/nanocl/readme
pagination_next: guides/nanocl/get-started/readme
---

# Nanocl post installation instruction

> **Tags** <br />
> documentation, post installation

This section contains the required procedures for configuring Nanocl after installation.

The Nanocl daemon binds to a Unix socket instead of a TCP port. <br />
By default that Unix socket is owned by the user `root` and other users can only access it using sudo. <br />

1.  If you don't want to preface the nanocl command with sudo, create a Unix group
    called nanocl and add users to it. When the Nanocl daemon starts, it creates a
    Unix socket accessible by members of the `nanocl` group.

    ```sh
    sudo groupadd nanocl
    sudo usermod -aG nanocl $USER
    newgrp nanocl
    ```

2.  Then we need to setup nanocl.
    This will download and run a bench images such as:
    
    * cockroachdb as store
    * nanocl-daemon as daemon to manage and orchestrate <br /><br />

    ```sh
    nanocl setup
    ```

3.  Test if everything is good by running:

    ```sh
    nanocl version
    ```

Congratz you are now able to you use Nanocl ! <br />
To continue see our [Get Started](/docs/guides/nanocl/get-started/1.orientation-and-setup.md) to get familiar with Nanocl.
