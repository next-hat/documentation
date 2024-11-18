---
slug: nanocl-0.14
title: Introducing Nanocl 0.14
authors: [leone]
tags: [nanocl, release, 0.14]
description: Nanocl 0.14 is here with a host of new features and enhancements to streamline your deployment workflows. Dive into the details!
image: /img/logo3.png
keywords: [containerization, Docker, Kubernetes, Nanocl, NGINX, software development, deployment, release, 0.15]
---

In the rapidly evolving landscape of container and virtual machine (VM) orchestration, staying ahead means constantly innovating and adapting to the needs of developers and operators. With that commitment in mind, we're thrilled to unveil Nanocl 0.14 – the latest iteration of our cutting-edge orchestrator that brings a plethora of enhancements and features to streamline your deployment workflows.

<!--truncate-->

Let's dive into the exciting changes and additions across our suite of components:

## Nanocld

### Changed

- **New Event System**: Experience improved event handling for better monitoring and management of your deployments.
- **Enhanced Image Control**: Choose to always pull images or only when they don't exist using `ImagePullPolicy`, along with support for pulling images from private registries using `ImagePullSecrets`.
- **Efficient Process Handling**: Download images in the background, queue tasks for processing objects, and monitor object process statuses seamlessly.

### Fixed

- **Improved Replication**: Addressed issues with the replication feature to ensure seamless scalability and reliability.

## Nanocl

### Changed

- **Secrets Management**: Introduce new commands `nanocl secret create` to create secrets without the need of a Statefile.
- **Contexts**: Flexibility to change the default endpoint, enabling smoother integration into diverse environments.
See our [contexts][contexts] guide for more information.
- **SubStates**: Effortlessly include other Statefiles within your configuration, simplifying complex deployments.
See our [substates][substates] guide for more information.

### Fixed

**Enhanced Logging**: Resolved issues with state logs for jobs, providing clearer insights into your deployment activities.

## Ncproxy

### Changed

- **Improved Event Handling**: Leveraging the new event system from the daemon for enhanced reliability and performance.

### Added

- **Access Control**: Specify allowed IP addresses to reach exposed services using `AllowedIps`, bolstering security and control over your network.

### Fixed

- **Protocol Support**: Addressed issues with TCP over SSL and introduced support for setting specific paths for targets when using HTTP.

With Nanocl 0.14, we've not only addressed existing pain points but also introduced features that empower you to scale and manage your infrastructure more efficiently. Whether you're orchestrating containers, managing VMs, or securing network access, Nanocl 0.14 is designed to meet your evolving needs.

Upgrade today using our [upgrading][upgrading] guide and experience the future of container and VM orchestration with Nanocl 0.14. Stay tuned for more updates and enhancements as we continue our journey to redefine deployment automation.

[substates]: /guides/nanocl/advanced-usage/substate
[contexts]: /guides/nanocl/advanced-usage/contexts
[upgrading]: /manuals/nanocl/upgrade
