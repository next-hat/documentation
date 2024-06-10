---
title: Install on Debian / Ubuntu - Nanocl
description: This section contains required procedures for installaling Nanocl on Debian / Ubuntu.
keywords: [documentation, nanocl , setup, installation, ubuntu, install, debian, ubuntu, linux]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Debian / Ubuntu
pagination_prev: manuals/nanocl/install/overview
pagination_next: manuals/nanocl/install/post-installation
---

# Install Nanocl on Debian / Ubuntu

This section contains required procedures to install Nanocl on Debian / Ubuntu.

## OS requirements

Nanocl have been tested on one of the Ubuntu 64-bit versions listed below:

- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Impish 21.10
- Ubuntu Focal 20.04 (LTS)
- Ubuntu Bionic 18.04 (LTS)

But it can be installed on any debian based distribution.
Only the CLI ([nanocl][nanocl]) is installed from our repository, the rest of the components are running inside containers and are available where docker is available.

## Installation methods

You can install Nanocl in different ways, depending on your needs:

- Most users set up Next Hat’s repositories and install from them, for ease of
  installation and upgrade tasks. This is the recommended approach.

- Some users download the [DEB package][deb_package] and install it manually and manage
  upgrades completely manually. This is useful in situations such as installing
  Nanocl on air-gapped systems with no access to the internet.

### Install using the repository

1. Update the `apt` package index and install packages to allow `apt` to use a
   repository over HTTPS :

   ```sh
   sudo apt-get update
   sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

2. Add Next hat's official GPG key :

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.next-hat.com/repo/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/next-hat.gpg
   ```

3. Use the following command to set up the repository :

   ```sh
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/next-hat.gpg] https://download.next-hat.com/repo/linux/ubuntu stable main" \
     | sudo tee /etc/apt/sources.list.d/next-hat.list > /dev/null
   ```

4. Update the `apt` package index, and install the _latest version_ of Nanocl

   ```sh
   sudo apt-get update
   sudo apt-get install -y nanocl
   ```

   Alternativatly you can install [c2ncl][c2ncl_ref] to convert existing `docker-compose` to Nanocl `Statefile`

   ```sh
   sudo apt install -y c2ncl
   ```

:::warning
Receiving a GPG error when running `apt-get update`? <br />
Your default umask may not be set correctly, causing the public key file for the repo to not be detected. <br />
Run the following command and then try to update your repo again : <br />
```sh
sudo chmod a+r /etc/apt/keyrings/next-hat.gpg
```
:::

You are almost done !
To continue see our [post installation guide][post_installation_guide]

[nanocl]: /docs/references/nanocl/cli/overview.md
[post_installation_guide]: /docs/manuals/nanocl/install/post-installation.md
[deb_package]: https://download.next-hat.com/repo/linux/ubuntu/pool/stable/main
[c2ncl_ref]: /docs/references/c2ncl/cli.md