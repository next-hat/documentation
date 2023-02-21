---
title: Your own apt server !
description: This page contains step-by-step instructions on how to setup your own apt server !
keywords: [guide, tutorial, apt, server, selfhosted, self-hosted, self, hosted, ubuntu]
image: /img/logo.webp
sidebar_label: My apt server
pagination_next: null
pagination_prev: null
---

As an Ubuntu user, I find myself typing apt install ... frequently as a way to install software on my system. But what if I wanted to distribute my code to others via an apt repository? In this guide i'll showcase how to:

* 1) create a deb package in rust
* 2) create an apt repo
* 3) signing that apt repo with a PGP key
* 4) putting it all together to deploy with Docker.

## Prerequisites

This tutorial assumes you are using Ubuntu, and that the following packages are installed:

```sh
sudo apt-get install -y gcc musl-dev dpkg-dev gpg
```

You also need to install [rust](https://www.rust-lang.org/learn/get-started)

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Creating your rust program

You can quickly setup a new rust project by running:

```sh
cargo init my-program
```

We will modify `src/main.rs` as follow :

```rust
fn main() {
    println!("Hello, world!");
    println!("Im running version: {}", env!("CARGO_PKG_VERSION"));
}
```

We can package our rust code into `.deb` using `cargo-deb`

```sh
cargo install cargo-deb
```

To create our `.deb` package `cargo-deb` require an author and a license.
So we will update our `Cargo.toml` as follow:

```toml
[package]
name = "my-program"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <email@domain.com>"]
license = "MIT OR Apache-2.0"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

Now we can create our `.deb` package:

```sh
cargo deb
```

This will create a `.deb` in your `target` folder,
for our example it will be as the following: `target/debian/my-program_0.1.0_amd64.deb`

We can test if it worked by running:

```sh
sudo dpkg -i target/debian/my-program_0.1.0_amd64.deb
my-program
Hello, world!
Im running version: 0.1.0
```

Create we now have a `.deb` package to deploy !
