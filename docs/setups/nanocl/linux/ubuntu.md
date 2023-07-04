---
title: Install Nanocl on Ubuntu
description: This section contains required procedures for installaling Nanocl on Ubuntu.
keywords: [documentation, nanocl , setup, installation, ubuntu]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Ubuntu / Debian
pagination_next: setups/nanocl/linux/post-installation
---

# Install Nanocl on Ubuntu / Debian

> **Tags** <br />
> documentation, nanocl , setup, installation, ubuntu

This section contains required procedures for installaling Nanocl on Ubuntu.

## Prerequisites

### OS requirements

To install Nanocl, you need the 64-bit version of one of these Ubuntu versions :

- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Impish 21.10
- Ubuntu Focal 20.04 (LTS)
- Ubuntu Bionic 18.04 (LTS)

And be sure to have a docker installation with the right to communication with `/run/docker.sock`. <br />
You can see how to install docker on ubuntu [there](https://docs.docker.com/engine/install/ubuntu)

## Installation methods

You can install Nanocl in different ways, depending on your needs:

- Most users set up Next Hat’s repositories and install from them, for ease of
  installation and upgrade tasks. This is the recommended approach.

- Some users download the DEB package and install it manually and manage
  upgrades completely manually. This is useful in situations such as installing
  Nanocl on air-gapped systems with no access to the internet.

- You can also install it from [crates.io](https://crates.io/crates/nanocl)

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

   Alternativatly you can install [c2ncl](/docs/references/c2ncl/cli.md) to convert existing `docker-compose` to Nanocl `Statefile`

   ```sh
   sudo apt install -y c2ncl
   ```

   > **Warning** <br />
   > Receiving a GPG error when running `apt-get update`? <br />
   > Your default umask may not be set correctly, causing the public key file for the repo to not be detected. <br />
   > Run the following command and then try to update your repo again : <br />
   > ```sh
   > sudo chmod a+r /etc/apt/keyrings/next-hat.gpg
   > ```

### Install from crates.io

If you already have `Rust` and `Cargo` installed you can download nanocl using this command:

```sh
cargo install nanocl
```

Be sure to have `libpq` and `openssl` installed

You are almost done !
To continue see our [post installation guide](/docs/setups/nanocl/linux/post-installation.md)
