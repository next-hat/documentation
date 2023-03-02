---
title: From localhost to VPS
description: This comprehensive guide walks you through the step-by-step process of deploying your frontend app and API on a VPS using Docker containers and Nginx. You'll learn how to create and configure your containers, set up a basic Docker network, and use Nginx to redirect traffic from your domain to your containers. Plus, you'll see how to secure your setup with free SSL certificates using Certbot.
image: /img/logo.webp
keywords: [deploying, VPS, Baremetal, Dedicated server, Nginx, guide, frontend app, API, Docker containers, configure, create, basic Docker network, redirect traffic, domain, secure, free SSL certificates, Certbot, architecture, services, frontend, backend, performance, scalability, reliability, separation of concerns, development, maintenance, responsiveness]
---

## Introduction

Looking to deploy your application to a VPS or Baremetal/Dedicated server and struggling to configure Nginx? You're not alone! One of the most common questions on Stack Overflow lately has been about how to configure Nginx to deploy an application. Fortunately, with the right guidance, this process can be streamlined and straightforward.

In this comprehensive guide, we'll walk you through the step-by-step process of deploying your frontend app and API on a VPS using Docker containers and Nginx. You'll learn how to create and configure your containers, set up a basic Docker network, and use Nginx to redirect traffic from your domain to your containers. Plus, we'll show you how to secure your setup with free SSL certificates using Certbot.

Whether you're new to Docker and Nginx or a seasoned pro, this guide will give you the tools and knowledge you need to set up a robust and secure infrastructure for your application. So, let's get started!


## Architecture

In this guide, we'll create two services, one for the `frontend` and one for the `backend`, and deploy them using the following architecture:

<img src="/img/simple_architecture.jpg" />

To follow along, you'll need to have purchased a domain name and added an A record pointing to your server.

By deploying your services using this architecture, you'll be able to achieve a good level of performance, scalability, and reliability. The frontend service will handle user requests and interact with the backend service, which will process data and return results to the frontend. This separation of concerns allows for easier development and maintenance of each service and can improve the overall performance and responsiveness of your application.

So, let's get started and create a simple robust architecture for your frontend and backend services!
