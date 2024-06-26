---
title: Virtual Machine - Nanocl
description: Create virtual machine with Nanocl
keywords: [documentation, nanocl, guides, get started, configuration, virtual machines, vm, virtual, machine, statefile, state, file]
image: /img/logo.webp
sidebar_position: 0
sidebar_label: Virtual Machine
pagination_next: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Create a VM

With `Nanocl`, you can quickly spin up virtual machines that are compatible with [cloud-init][cloud-init].<br/>
Most Linux cloud images have it as a baseline, which allows us to set up network, users, and SSH keys inside the virtual machine.

## Install the default VM runtime

To facilitate networking, Nanocl starts a virtual machine inside a container using the default runtime image [nanocl-qemu][nanocl-qemu].<br/>


## Create a VM base image

Let's start by downloading an Ubuntu image from the official repository:

```sh
wget https://cloud-images.ubuntu.com/minimal/releases/jammy/release/ubuntu-22.04-minimal-cloudimg-amd64.img
```

Then, we add the virtual machine image to the Nanocl system using the following command:

```sh
nanocl vm image create ubuntu-22 ubuntu-22.04-minimal-cloudimg-amd64.img
```

Here is some information about the options being utilized:

* `ubuntu-22` - the name of the image.
* `ubuntu-22.04-minimal-cloudimg-amd64.img` - the path of the image.

Once the image has been added, you should be able to list them using the following command:

```sh
nanocl vm image ls
```

## Run a VM

To run a virtual machine, you can use a simple command:

```sh
nanocl vm run myvm ubuntu-22
```

You can observe a few options being used:

* `myvm` - the name of the virtual machine.
* `ubuntu-22` - the name of the image to use.

The virtual machine will boot with the following default settings if no options are provided:

* 1 CPU
* 500 MB of RAM

The initial boot time with default settings is approximately 90 seconds. This can be improved by enabling KVM and allocating more resources to your virtual machine.

:::info
The virtual machine won't use the base image directly.<br/>
Instead, it will create a snapshot of the base image and use the snapshot as its own disk.
:::

You can monitor the status by attaching to the virtual machine using the following command:

```sh
nanocl vm attach myvm
```

This command allows you to attach to the running virtual machine, where you can execute commands and perform other actions.

You should see an output similar to this:

```console
[  OK  ] Finished Permit User Sessions.
[  OK  ] Started Serial Getty on ttyS0.
[  OK  ] Reached target Login Prompts.
[  OK  ] Finished Record successful boot for GRUB.
         Starting GRUB failed boot detection...
[  OK  ] Started LSB: automatic crash report generation.
[  OK  ] Finished GRUB failed boot detection.
[  OK  ] Finished Pollinate to seed…seudo random number generator.
         Starting OpenBSD Secure Shell server...
[  OK  ] Started User Login Management.
[  OK  ] Started Unattended Upgrades Shutdown.
[  OK  ] Started OpenBSD Secure Shell server.
[  OK  ] Started Dispatcher daemon for systemd-networkd.
cloud-init[494]: Cloud-init v. 23.1.2-0ubuntu0~22.04.1 running 'modules:config' at Tue, 04 Jul 2023 12:36:13 +0000. Up 78.27 seconds.
cloud-init[517]: Cloud-init v. 23.1.2-0ubuntu0~22.04.1 running 'modules:final' at Tue, 04 Jul 2023 12:36:18 +0000. Up 83.19 seconds.
cloud-init[515]: The system is finally up, after 93.54 seconds
[  OK  ] Finished Execute cloud user/final scripts.
[  OK  ] Reached target Cloud-init target.
Ubuntu 22.04.2 LTS 91daefd21c1b ttyS0

91daefd21c1b login: 
```

By default, the username and password are set `cloud:cloud`.
You can set these credentials when you first start your virtual machine.
For enhanced security, you can also set up SSH keys.
Please note that you have to wait for [cloud-init][cloud-init] to finish before being able to log in.

## Patch a VM

You can adjust the performance of a virtual machine by modifying its resources, such as memory and CPU.

To do so, you can use the following command:

```sh
nanocl vm patch myvm --kvm --cpu 4 --mem 2048
```

In the above command, you can observe several options being utilized:

* `myvm` - the name of the virtual machine to patch.
* `--kvm` - enables KVM acceleration.
* `--cpu` - sets the number of CPUs to use.
* `--mem` - sets the amount of memory to allocate.

If your system does not have KVM enabled, you can remove the --kvm option. After patching, you can reattach to the virtual machine.

:::warning
Patching a virtual machine will cause it to stop and restart.
:::

## SSH connection

If you are not using Docker Desktop, you can connect to the virtual machine using its IP address. To obtain the IP address of the virtual machine, you can use the following command:

```sh
nanocl vm inspect myvm
```

You can grab the `IPAddress`, which in this case is `10.2.0.2`.
Afterwards, you can connect using SSH with the default credentials: `cloud:cloud`.

```sh
ssh cloud@10.2.0.2
```

## Statefile

You can define a virtual machine using a ``Statefile``. Here is an example:

<StatefileBlock example="advanced/vm" />

## Expose your VM

You can use a `ProxyRule` to expose a specific port of your virtual machine.
Here is a complete example of exposing the virtual machine's port 22 for SSH to a public port 5555:

<StatefileBlock example="advanced/vm-proxy" />

[cloud-init]: https://cloud-init.io
[nanocl-qemu]: https://github.com/next-hat/nanocl-qemu
