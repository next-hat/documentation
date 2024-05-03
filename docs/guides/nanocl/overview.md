---
title: Overview - Nanocl
keywords: [documentation, nanocl, guides, get started, overview]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Overview
---

# Nanocl overview

Nanocl is a portable, extensible, open-source platform for managing workloads, that facilitates both declarative configuration and automation. It has a rapidly growing ecosystem. Nanocl runs on many platforms from your garage to the space.

The name Nanocl is a shortcut for nano cloud, because it's a platform that allows you to run your applications in a cloud-like environment, but in your own infrastructure.<br/>

## Why Nanocl

We did give a try to Kubernetes, docker swarm, docker compose, and other solutions but we wasn't satisfied with the results, so we decided to create our own solution.
Also we have the dream to give to everyone the ability to run their own cloud infrastructure at scale like the big cloud providers, but in their own infrastructure, and nanocl is the first step to achieve this dream.

## Going back in time

Let's take a look at why Nanocl is so useful when by going back in time.

<img src="/img/Container_Evolution.svg" />

***Traditional deployment era:*** Early on, organizations ran applications on physical servers. There was no way to define resource boundaries for applications in a physical server, and this caused resource allocation issues. For example, if multiple applications run on a physical server, there can be instances where one application would take up most of the resources, and as a result, the other applications would underperform. A solution for this would be to run each application on a different physical server. But this did not scale as resources were underutilized, and it was expensive for organizations to maintain many physical servers.

***Virtualized deployment era:*** As a solution, virtualization was introduced. It allows you to run multiple Virtual Machines (VMs) on a single physical server's CPU. Virtualization allows applications to be isolated between VMs and provides a level of security as the information of one application cannot be freely accessed by another application.

Virtualization allows better utilization of resources in a physical server and allows better scalability because an application can be added or updated easily, reduces hardware costs, and much more. With virtualization you can present a set of physical resources as a cluster of disposable virtual machines.

Each VM is a full machine running all the components, including its own operating system, on top of the virtualized hardware.

***Container deployment era:*** Containers are similar to VMs, but they have relaxed isolation properties to share the Operating System (OS) among the applications. Therefore, containers are considered lightweight. Similar to a VM, a container has its own filesystem, share of CPU, memory, process space, and more. As they are decoupled from the underlying infrastructure, they are portable across clouds and OS distributions.

Containers have become popular because they provide extra benefits, such as:

* Agile application creation and deployment: increased ease and efficiency of container image creation compared to VM image use.
* Continuous development, integration, and deployment: provides for reliable and frequent container image build and deployment with quick and efficient rollbacks (due to image immutability).
* Dev and Ops separation of concerns: create application container images at build/release time rather than deployment time, thereby decoupling applications from infrastructure.
* Observability: not only surfaces OS-level information and metrics, but also application health and other signals.
* Environmental consistency across development, testing, and production: runs the same on a laptop as it does in the cloud.
* Cloud and OS distribution portability: runs on Ubuntu, RHEL, CoreOS, on-premises, on major public clouds, and anywhere else.
* Application-centric management: raises the level of abstraction from running an OS on virtual hardware to running an application on an OS using logical resources.
* Loosely coupled, distributed, elastic, liberated micro-services: applications are broken into smaller, independent pieces and can be deployed and managed dynamically – not a monolithic stack running on one big single-purpose machine.
* Resource isolation: predictable application performance.
* Resource utilization: high efficiency and density.
* Lifecycle management: promotes a declarative application and infrastructure definition that is version controlled, providing for easier rollbacks and rollouts.

## Why you need Nanocl

Containers are a good way to bundle and run your applications. In a production environment, you need to manage the containers that run the applications and ensure that there is no downtime. For example, if a container goes down, another container needs to start. Wouldn't it be easier if this behavior was handled by a system?

That's how Nanocl comes to the rescue! Nanocl provides you with a framework to run distributed systems resiliently. It takes care of scaling and failover for your application, provides deployment patterns, and more. For example: Nanocl can easily manage a canary deployment for your system.

Nanocl provides you with:

* ***Service discovery and load balancing*** Nanocl can expose a container using the DNS name or using their own IP address. If traffic to a container is high, Nanocl is able to load balance and distribute the network traffic so that the deployment is stable.
* ***Storage orchestration*** Nanocl allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers, and more.
* ***Automated rollouts and rollbacks*** You can describe the desired state for your deployed containers using Nanocl, and it can change the actual state to the desired state at a controlled rate. For example, you can automate Nanocl to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.
* ***Automatic bin packing*** You provide Nanocl with a cluster of nodes that it can use to run containerized tasks. You tell Nanocl how much CPU and memory (RAM) each container needs. Nanocl can fit containers onto your nodes to make the best use of your resources.
* ***Self-healing*** Nanocl restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
* ***Secret and configuration management*** Nanocl lets you store and manage sensitive information. You can deploy and update secrets and application configuration without rebuilding your container images, and without exposing secrets in your stack configuration.
* ***Batch execution*** In addition to services, Nanocl can manage your batch and CI workloads, replacing containers that fail, if desired.
* ***Horizontal scaling*** Scale your application up and down with a simple command, with a UI, or automatically based on CPU usage.
* ***IPv4/IPv6 dual-stack*** Allocation of IPv4 and IPv6 addresses to Pods and Services
* ***Designed for extensibility*** Add features to your Nanocl cluster without changing upstream source code.

## What Nanocl is not

Nanocl is not a traditional, all-inclusive PaaS (Platform as a Service) system. Since Nanocl operates at the container level rather than at the hardware level, it provides some generally applicable features common to PaaS offerings, such as deployment, scaling, load balancing, and lets users integrate their logging, monitoring, and alerting solutions. However, Nanocl is not monolithic, and these default solutions are optional and pluggable. Nanocl provides the building blocks for building developer platforms, but preserves user choice and flexibility where it is important.

* Does not limit the types of applications supported. Nanocl aims to support an extremely diverse variety of workloads, including stateless, stateful, and data-processing workloads. If an application can run in a container, it should run great on Nanocl.
* Does not deploy source code and does not build your application. Continuous Integration, Delivery, and Deployment (CI/CD) workflows are determined by organization cultures and preferences as well as technical requirements.
* Does not provide application-level services, such as middleware (for example, message buses), data-processing frameworks (for example, Spark), databases (for example, MySQL), caches, nor cluster storage systems (for example, Ceph) as built-in services. Such components can run on Nanocl, and/or can be accessed by applications running on Nanocl through portable mechanisms, such as the Open Service Broker.
* Does not dictate logging, monitoring, or alerting solutions. It provides some integrations as proof of concept, and mechanisms to collect and export metrics.
* Does not provide nor mandate a configuration language/system (for example, Jsonnet). It provides a declarative API that may be targeted by arbitrary forms of declarative specifications.
* Does not provide nor adopt any comprehensive machine configuration, maintenance, management, or self-healing systems.
* Additionally, Nanocl is not a mere orchestration system. In fact, it eliminates the need for orchestration. The technical definition of orchestration is execution of a defined workflow: first do A, then B, then C. In contrast, Nanocl comprises a set of independent, composable control processes that continuously drive the current state towards the provided desired state. It shouldn't matter how you get from A to C. Centralized control is also not required. This results in a system that is easier to use and more powerful, robust, resilient, and extensible.


## Nanocl architecture

Nanocl follows the client-server architecture. The Nanocl client talks to the Nanocl daemon, which does the heavy lifting of building, running, and distributing your Nanocl containers. The Nanocl client can run on the same system as the Nanocl daemon, or you can connect a Nanocl client to a remote Nanocl daemon. The Nanocl client and daemon can run on Windows, macOS, or Linux distributions.

By default several components will be installed that fit most of use cases, but you can tweak the installation to fit your needs.

The default components are:

* ***nstore*** An sql store that stores the state of the cluster. Based on cockroachdb.
* ***nmetrics*** A metrics service that collects information for a node. (CPU, RAM, Disk, Network, etc)
* ***ndaemon*** A `nanocld` instance that runs on each node and manages the containers on that node. It's also our rest api to communicate with the client.
* ***nproxy*** A `nginx` reverse proxy instance that will expose the services to the outside world.
* ***ncproxy*** The `nproxy` controller that will update the proxy configuration when the state change.
* ***ndns*** A `dnsmasq` instance that will resolve the dns queries for the services.
* ***ncdns*** The `ndns` controller that will update the dns configuration when the state change.

:::note
Only the ***nstore***, ***nmetrics*** and the ***ndaemon*** are required to run a node.
:::

Simplified architecture of a single node:

<div class="center">
  <img src="/img/architecture.png" />
</div>

### Nanocl Daemon

The Nanocl daemon (`nanocld`) listens for Nanocl API requests and manages Nanocl objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Nanocl services.

### Nanocl Client

The Nanocl client (`nanocl`) is the primary way that many Nanocl users interact with Nanocl. When you use commands such as `nanocl ps` the client sends these commands to `nanocld` to run the command. The Nanocl client can run on the same machine as `nanocld`, or you can connect a Nanocl client to a remote Nanocl daemon.


### Nanocl Objects

When you use Nanocl, you are creating and using namespaces, container images, virtual machine images, jobs, cargoes, virtual machines and other objects. This section is a brief overview of some of those objects.

#### Namespaces

A namespace contains a group of services (Cargoes, Vms) that will share the same network.
This is useful when you want to isolate a group of services from the rest of the cluster.
There is 2 namespaces by default:

* ***global*** The default namespace that will be used if you don't specify a namespace.
* ***system*** The namespace that will be used by the system services.

#### Container Images

An image is a read-only template with instructions for creating a Nanocl container. Often, an image is based on another image, with some additional customization. For example, you may build an image which is based on the `ubuntu` image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

#### Virtual Machine Images

It is similar to a container image, except it is used to create virtual machine. A virtual machine image typically contains a bootable operating system image. Nanocl supports the following virtual machine image formats: `qcow2`, `raw`, `vdi`, `vmdk`, `vhd`, `vhdx`.

#### Jobs

A job creates one or more containers and ensures that a specified number of them successfully terminate. As such, it is often used to run a one-off task, such as a database migration, or for performing a backup.

#### Cargoes

A cargo is one container that is deployed with it's own replication rule. For example, you might have a cargo that includes a web server that will have different replication rules from a cargo that includes a database. They can also communicate with each other using standard network protocols.

#### Virtual Machines

A virtual machine is one virtual machine that is deployed unlike cargoes a virtual machines cannot be replicated (yet). This is useful when you want to run untrusted code.
For example a CI/CD pipeline that will build your code and run the tests.

#### Containers

A container is a runnable instance of an container image. You can create, start, stop, move, or delete a container using the Nanocl API or CLI when using jobs, cargoes or virtual machines.

By default, a container is relatively well isolated from other containers and its host machine. You can control how isolated a container's network, storage, or other underlying subsystems are from other containers or from the host machine.

A container is defined by its image as well as any configuration options you provide to it when you create or start it. When a container is removed, any changes to its state that aren't stored in persistent storage disappear.
