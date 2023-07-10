---
title: Overview
keywords: "documentation, nanocl, guides, get started, overview"
image: /img/logo.webp
sidebar_position: 1
---

# Nanocl overview

Nanocl is an open-source platform for orchestrating containers and virtual machines across multiple hosts.<br/>
It’s a shortcut for Nano Cloud!
And that's a lie because it can create big ones.<br/>
Deploying and managing application and server as never been that easy!<br/>
I like to call it an HCO for Hybrid Cloud Orchestrator.<br/>
On dedicated servers or in your home lab, Nanocl can manage your hosts, network, and the applications running inside.<br/>
It enables you to separate your applications using hosts, namespaces, and networks to ensure the best isolation.<br/>
With Nanocl, you can manage your infrastructure and scale it depending on your need.<br/>
By taking advantage of Nanocl and container methodologies for shipping, testing, and deploying code, you can significantly reduce the delay between writing code and shipping it in production.<br/>
With logs, auto fail-over automatic backups, and zero downtime,
you can sleep while Nanocl takes care of your infrastructure.


## The Nanocl platform

Nanocl provides the ability to run containers and virtual machines inside hosts, namespaces and networks, ensuring a perfect isolated environment.
Cargoes are lightweight configurations based on a container image, containing everything needed to deploy and scale your application or share it while working to be sure that everyone gets the same behavior.

## Manage the lifecycle of your application

- Develop your application and its supporting components using a container image.
- The container image becomes the unit for distributing and testing your application.
- When ready, create a cargo based on the container image.
- Nanocl will ensure it will always be running and available.
- You can later update your cargo to deploy an update and nanocl will ensure zero downtime.
