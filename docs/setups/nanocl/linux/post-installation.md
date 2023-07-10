---
title: Nanocl post installation
description: This section contains required procedures for configuring Nanocl after installation.
keywords: [documentation, nanocl , setup, installation, post installation]
image: /img/logo.webp
sidebar_position: 3
sidebar_label: Post Installation
pagination_next: guides/nanocl/get-started/orientation-and-setup
---

# Nanocl post installation instruction

> **Tags** <br />
> documentation, post installation

This section contains the required procedures for configuring Nanocl after installation.

The Nanocl daemon binds to a Unix socket instead of a TCP port. <br />
By default that Unix socket is owned by the user `root` and group `nanocl` and other users can only access it using sudo or by being in `nanocl` group. <br />

1.  If you don't want to preface the nanocl command with sudo, create a Unix group
    called nanocl and add users to it. When the Nanocl daemon starts, it creates a
    Unix socket accessible by members of the `nanocl` group.

    ```sh
    sudo groupadd nanocl
    sudo usermod -aG nanocl $USER
    newgrp nanocl
    ```

2.  Then we need to install nanocl.
    This will download and run a bench images such as:
    
    * cockroachdb as store
    * nanocld as the nanocl daemon to manage and orchestrate
    * metersd to collect metrics from your hosts <br /><br />

    ```sh
    nanocl install
    ```

    You can choose the group assiociated to the unix socket by passing the `--group` argument to the install command as follow

    ```sh
    nanocl install --group my-custom-group
    ```

3.  Test if everything is good by running:

    ```sh
    nanocl version
    ```

Congratz you are now able to you use Nanocl ! <br />
