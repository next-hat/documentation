---
title: C2ncl CLI References
description: To list available commands, either run c2ncl with no parameters or execute c2ncl --help
keywords: [documentation, references, nanocl, nanocl CLI, CLI, C2ncl, convert docker compose to nanocl, docker compose, statefile]
image: /img/logo.webp
sidebar_label: CLI
sidebar_position: 1
---

# Docker Compose To Nanocl Statefile

## C2ncl

```sh
c2ncl [OPTIONS]
```

To list available commands, either run `c2ncl` with no parameters or execute `c2ncl --help` :

```console
$ c2ncl --help
Converts docker-compose.yml to nanocl Statefile.yml

Usage: c2ncl --in-file <IN_FILE> --out-file <OUT_FILE>

Options:
  -i, --in-file <IN_FILE>    Path to docker-compose file
  -o, --out-file <OUT_FILE>  Output filepath
  -h, --help                 Print help
  -V, --version              Print version
```

## Description

C2ncl is an utility that convert `docker-compose.yml` into Nanocl `Statefile` that way you can quickly start using Nanocl !


## Example

```sh
c2ncl -i docker-compose.yml -o Statefile.yml
```
