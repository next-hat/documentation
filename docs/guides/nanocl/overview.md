---
title: Overview | Nanocl
keywords: [documentation, nanocl, guides, get started, overview]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Overview
---

# Nanocl overview

Nanocl is an open-source platform for orchestrating containers and virtual machines across multiple hosts.
It’s a shortcut for Nano Cloud!
And it's a lie because it can create big ones.
Your Hybrid Cloud has never been easier to set up!
I like to call it an HCO for Hybrid Cloud Orchestrator.
On dedicated servers or in your home lab, Nanocl can manage your hosts, network, and the applications running inside.
It enables you to separate your applications using namespaces, clusters, and networks to ensure the best isolation.
With Nanocl, you can manage your infrastructure and scale it depending on your need.
By taking advantage of Nanocl and containers methodologies for shipping, testing, and deploying code, you can significantly reduce the delay between writing code and shipping it in production.
With logs, auto fail-over automatic backups, and zero downtime.
You can sleep while Nanocl takes care of your infrastructure.
Your own AWS at home?
With Nanocl, it’s now possible and for free!


## The Nanocl platform

Nanocl provides the ability to run containers and virtual machines inside clusters and networks, ensuring a perfect isolated environment.
This isolation ensures security and allows you to run many cargoes across multiple clusters simultaneously on a given host.
Your clusters can contain variables that will allow you to change the rules of cargo that will join them.
Cargoes are lightweight configurations based on a container image, containing everything needed to deploy and scale your application or share it while working to be sure that everyone gets it works the same way.


### Manage your clusters

Clusters are like environment configurations that allow you to:

- Manage variables to feed cargoes that will join and dynamically change their rules.
- Manage networks. Cargoes have to join a cluster and a network to run.
- Manage proxy templates to configure cargo connections between your networks.

### Manage the lifecycle of your application

- Develop your application and its supporting components using container image.
- Container image becomes the unit for distributing and testing your application.
- When ready, create a cargo based on the container image and make it join a cluster.
- Nanocl will ensure it will always be running and available inside this cluster.
- You can later update your cargo to deploy an update.
