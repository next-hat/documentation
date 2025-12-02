---
title: Secure Your Server
description: A comprehensive guide on securing your Next Hat server.
tags:
  - security
  - server
  - infrastructure
  - guide
---

Below are the essential steps to secure your Next Hat server:

## Create your user

It is important to avoid using the root user for daily operations. Instead, create a new user with sudo and nanocl privileges.

Create a new user and it's home directory:

```bash
adduser your_username
```

Add the new user to the sudo group:

```bash
usermod -aG sudo your_username
```

Add the new user to the nanocl group:

```bash
usermod -aG nanocl your_username
```

Replace `your_username` with your desired username.

## Set up SSH key authentication

To enhance security, disable password authentication and use SSH keys for logging in.

1. Generate an SSH key pair on your **local machine** (if you haven't already):

```bash
ssh-keygen -t ed25519
```

:::caution
DO NOT SET AN EMPTY PASSPHRASE FOR YOUR SSH KEY. SOME MALICIOUS ACTORS MAY STEAL YOUR PRIVATE KEY AND ACCESS YOUR SERVER.
:::

2. Copy the public key to your server:

```bash
ssh-copy-id -i ~/.ssh/<your_key>.pub your_username@your_server
```

3. Edit the SSH configuration file on your server:

```bash
sudo vim /etc/ssh/sshd_config
```

4. Find and modify the following lines:

```plaintext
PasswordAuthentication no
PermitRootLogin no
```

5. Restart the SSH service:

```bash
sudo systemctl restart ssh
```
