---
title: Nanocl post installation
description: This section contains required procedures for configuring Nanocl after installation.
sidebar_label: Post Installation
sidebar_position: 3
pagination_prev: setups/nanocl/readme
pagination_next: guides/nanocl/get-started/readme
---

# Nanocl post installation instruction

> **Tags** <br />
> documentation, post installation

This section contains required procedures for configuring Nanocl after installation.

The Nanocl daemon binds to a Unix socket instead of a TCP port. <br />
By default that Unix socket is owned by the user root and other users can only access it using sudo. <br />

1.  If you don't want to preface the nanocl command with sudo, create a Unix group
    called nanocl and add users to it. When the Nanocl daemon starts, it creates a
    Unix socket accessible by members of the root group.

    ```sh
    sudo groupadd nanocl
    sudo usermod -aG nanocl $USER
    newgrp nanocl
    ```

2.  After nanocl and nanocld binary have been installed, you need first to start a
    docker instance. By default we provide a systemd script.

    ```sh
    sudo systemctl start nanocld@dockerd
    ```

3.  But in order to be abble to run nanocl as non root user we need to fix file
    permission after have been lauched your docker instace. Not that our docker
    instance is totaly isolate from existing docker instance.

    ```sh
    sudo chown -R :nanocl /run/nanocl
    ```


4.  Then we need to install nanocl services. This will download a bench of images
    such as

    - nginx as proxy
    - dnsmasq as dns and dhcp server
    - ipsec as vpn server
    - postgresql as nanocld database

    ```sh
    nanocld --install-components
    ```

5.  Then start the daemon

    ```sh
    sudo systemctl start nanocld
    ```

    We need to fix permission one last time.

    ```sh
    sudo chown -R :nanocl /run/nanocl
    sudo chmod 770 /run/nanocl/nanocl.sock
    ```

6.  Test if everything is good

    ```sh
    nanocl version
    ```

    And there we go we can start enjoy using nanocl !

Congratz you are now able to you Nanocl !
To continue see our [Get Started](/docs/guides/nanocl/get-started/1.orientation-and-setup.md) to get familiar with Nanocl.
