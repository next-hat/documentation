---
title: Install Nanocl on Linux from Sources
description: This section contains required procedures for installing Nanocl from the source code.
keywords: [documentation, nanocl , setup, installation, from sources]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: From Sources
pagination_prev: setups/nanocl/readme
pagination_next: setups/nanocl/linux/post-installation
---

# Install Nanocl on Linux from Sources

> **Tags** <br />
> documentation, installation, from sources

This section contains required procedures for installing Nanocl from the source code.

## DAEMON installation

1.  Install Rustlang

    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

2.  Clone the repository

    ```sh
    git clone https://github.com/nxthat/nanocld 
    cd nanocld
    ```

3.  Install Ubuntu dependencies, you might need to install gcc first

    ```sh
    sudo apt install gcc
    ```

    ```sh
    sudo sh ./scripts/ubuntu.deps.sh
    ```

    For other linux distros refer to the package name and install it with the
    correct package manager / name, in addition if you can make a PR to update the doc it
    would be great! You can see what package is needed by looking in the script


4.  Afterwards install Rust dependencies
   
    ```sh
    sh ./scripts/rust.deps.sh
    ```

5.  Finally you can build from the source

    ```sh
    sh ./scripts/release_nanocld.sh
    ```

    You will find a .deb package inside `target/debian` folder or release binary in
    `target/release` folder.

## CLI installation

1.  Clone the repository 

    ```sh
    git clone https://github.com/nxthat/nanocl
    cd nanocl
    ```

2.  Run the build script

    ```sh
    sh ./scripts/release_nanocl.sh
    ```

    You will find a .deb package inside `target/debian` folder or release binary in
    `target/release` folder.

You are almost done !
To continue see our [post installation guide](/docs/setups/nanocl/linux/post-installation.md)
