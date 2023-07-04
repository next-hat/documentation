---
title: Virtual Machine | Nanocl
description: Create virtual machine with Nanocl
keywords: [documentation, nanocl, guides, get started, configuration, virtual machines, vm, virtual, machine]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: Virtual Machine
pagination_next: null
---

# Create Virtual Machine

With nanocl you can spin up virtual machine that are compatible with [cloud-init][cloud-init].


## Add image to the system

Let's start by downloading an ubuntu image from official repository:

```sh
wget https://cloud-images.ubuntu.com/minimal/releases/jammy/release/ubuntu-22.04-minimal-cloudimg-amd64.img
```

Then we add the virtual machine image to the nanocl system using this command:

```sh
nanocl vm image create ubuntu-22 ubuntu-22.04-minimal-cloudimg-amd64.img
```

Once the image have been added you should be able to list them using:

```sh
nanocl vm image ls
```

## Run a virtual machine

To run a virtual machine you can do it with a simple command:

```sh
nanocl vm run myvm ubuntu-22
```

The virtual machine you boot afterwards by default if no options are provided, the virtual machine will boot with:

* 1cpu
* 500mo of ram

It will take arround 90sec the first time to boot your virtual machine with default settings.
This can be improoved if you enable kvm and give a bit more power to your virtual machine.

You can follow the status by attaching to the virtual machine using the following command:

```sh
nanocl vm attach myvm
```

This command allow you to attach to the running virtual machine, you can execute command etc from there.

You should see an output like this:

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

By default the user and password is: cloud:cloud
This can be set when you first start your virtual machine.
You can also set ssh keys for better security.
If need to wait for [cloud-init][cloud-init] to finish to be able to login.

## Patch a virtual machine

You can path a virtual machine to increase his performance, eg: memory, cpu.

To do so you can use the following command:

```sh
nanocl vm patch myvm --kvm --cpu 4 --mem 2048
```

Remove the `--kvm` options if your system doesn't have it enabled.
You can reattach to the virtual machine afterwards.

Note: Patching a virtual machine will stop and restart it.

## SSH connection

If you aren't using docker desktop, you can connect to the virtual machine from his ip address.
To grap the virtual machine ip address you can use the following command:

```sh
nanocl vm inspect myvm
```

Should output something like:

```yml
Key: myvm.global
Name: myvm
ConfigKey: e83fb53b-d645-44a6-9074-38625872fb14
NamespaceName: global
Config:
  Key: e83fb53b-d645-44a6-9074-38625872fb14
  CreatedAt: 2023-07-04T14:14:39.310696
  Name: myvm
  Version: v0.9.0
  VmKey: myvm.global
  Disk:
    Image: ubuntu-22.myvm.global
    Size: 20
  HostConfig:
    Cpu: 4
    Memory: 2048
    Kvm: true
InstanceTotal: 1
InstanceRunning: 1
Instances:
- Id: b082dcba19dfa7d177d12871e8702923dc2a95a80842001408a08c23766d012a
  Names:
  - /myvm.global.v
  Image: ghcr.io/nxthat/nanocl-qemu:8.0.2.0
  ImageID: sha256:119c0cf552aa9651fafc2fe6d7c4e13fa8cfdcd69e222506d935f4aa7a73d896
  Command: /bin/sh entrypoint.sh -hda /home/leone/.nanocl/state/vms/images/ubuntu-22.myvm.global.img --nographic -accel kvm -smp 4 -m 2048M
  Created: 1688480226
  Ports: []
  Labels:
    io.nanocl.vnsp: global
    io.nanocl: enabled
    io.nanocl.v: myvm.global
    org.opencontainers.image.source: https://github.com/nxthat/nanocl-qemu
    org.opencontainers.image.description: Nanocl Qemu Runtime
  State: running
  Status: Up 28 seconds
  HostConfig:
    NetworkMode: global
  NetworkSettings:
    Networks:
      global:
        NetworkID: f2cd255919069b028aa8399582baa3e2d91ed9ca62186cb50184eb6b422b6bc4
        EndpointID: ea733ed8cc6db1d8f0c594e15c41f1c6154779a37d280ae3b998bcea1405d9ed
        Gateway: 10.2.0.1
        IPAddress: 10.2.0.2
        IPPrefixLen: 16
        IPv6Gateway: ''
        GlobalIPv6Address: ''
        GlobalIPv6PrefixLen: 0
        MacAddress: 02:42:0a:02:00:02
  Mounts:
  - Type: bind
    Source: /home/leone/.nanocl/state/vms/images
    Destination: /home/leone/.nanocl/state/vms/images
    Mode: ''
    RW: true
    Propagation: rprivate
```

You can grap the `IPAddress` in my case it's `10.2.0.2`
Then connect with ssh using default credentials:

```sh
ssh cloud@10.2.0.2
```

## Statefile

You can define virtual machine using `Statefile`.
There is an example:

```yml
Kind: VirtualMachine
ApiVersion: v0.9

Namespace: global

# See all options:
# https://docs.next-hat.com/references/nanocl/virtual-machine
VirtualMachines:
  - Name: myvm
    Disk:
      Image: ubuntu-22
    HostConfig:
      Cpu: 2
      Memory: 2048
```

## Expose your virtual machine

You can use a `ProxyRule` to expose specific port of your Virtual Machine

There is a full example to expose the virtual machine port 22 for ssh to a public port 5555

```yml
Kind: Deployment
ApiVersion: v0.9

Namespace: global

# See all options:
# https://docs.next-hat.com/references/nanocl/virtual-machine
Resources:
  - Name: myvm
    Kind: ProxyRule
    Version: v0.6
    Config:
      Watch:
        - myvm.global.v
      Rules:
        - Domain: deploy-example.com
          Network: Public
          Protocol: Tcp
          Port: 5555
          Target:
            Key: myvm.global.v
            Port: 22

VirtualMachines:
  - Name: myvm
    Disk:
      Image: ubuntu-22
    HostConfig:
      Cpu: 2
      Memory: 2048
```

[cloud-init]: https://cloud-init.io
