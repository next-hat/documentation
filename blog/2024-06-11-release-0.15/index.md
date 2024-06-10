---
slug: nanocl-0.15
title: Announcing Nanocl 0.15
authors: [leone]
tags: [nanocl, release, 0.15]
---

# Announcing Nanocl 0.15

## Enhanced Functionality and Improved Performance

We are thrilled to announce the release of **Nanocl 0.15.0**, packed with exciting new features, significant enhancements, and important fixes to streamline your container orchestration and virtualization management. This release, effective from **June 11, 2024**, brings you the tools and improvements you’ve been waiting for. Let’s dive into the details!

## Key Highlights

### New Features

1. **Enhanced Command Output:**
   - Status information is now available in the tables for `cargo ls`, `vm ls`, and `job ls` commands, providing immediate insights into your resources.

2. **Detailed Inspections:**
   - Introducing `nanocl metric inspect` and `nanocl event inspect` commands to get detailed information about specific metrics and events.

3. **State Backup:**
   - The new `nanocl backup` command enables you to back up the current state into multiple Statefiles, ensuring your configurations are safe and recoverable.

4. **Environment Variable Overrides:**
   - Use the `HOST` environment variable to override the default host.
   - Pass certificates and keys via `CERT` and `CERT_KEY` environment variables for client operations.

5. **Orphan Removal:**
   - The `nanocl state apply --remove-orphans` option helps you clean up orphaned objects, maintaining a tidy environment.

6. **TLS Secret Creation:**
   - `nanocl secret create tls` now accepts paths to the certificate and key, simplifying the process of creating TLS secrets.

7. **Generated Man Pages:**
   - All commands now have associated man pages. View them in markdown format [here][manpages], or use `man nanocl-cargo-create` for example.


### Bug Fixes

- **Improved Command Reliability:**
  - Commands like `nanocl cargo run`, `nanocl vm run`, `nanocl cargo start`, `nanocl cargo stop`, `nanocl cargo patch`, `nanocl job start`, `nanocl vm start`, and `nanocl vm stop` now correctly wait for the respective operations to complete before returning.

- **Accurate State Comparisons:**
  - The diff trigger when applying a Statefile now accurately compares the current state with the new state, ensuring consistency.

### Changes

- **Unified Interface:**
  - Commands such as `inspect`, `rm`, `stop`, and `start` have been refactored to a single interface, providing a consistent user experience across all objects.

- **Streamlined Output:**
  - The namespace has been removed from the tables in `cargo ls` and `vm ls` commands for a cleaner output.

- **Enhanced Loader Experience:**
  - Applying and removing Statefiles now feature a cleaner loader for a more intuitive process.

# Nanocld 0.15.0

Released on **May 16, 2024**, Nanocld 0.15.0 focuses on updating dependencies, adding new endpoints and options, and fixing several critical issues.

### Key Enhancements

- **Command-Line Improvements:**
  - Added `--store-addr` option to specify the store address directly from the command line.

- **New Endpoints:**
  - `GET /metrics/{key}/inspect` and `GET /event/{key}/inspect` to fetch detailed information about metrics and events.

- **Repository and Filter Enhancements:**
  - A new generic `RepositoryCountBy` interface and improved SQL filtering mechanisms for better performance and flexibility.
  - Indexes added for all SQL schema to enhance query performance.
  - Ability to filter queries by dates.

### Bug Fixes

- **Job Management:**
  - Stopping processes before removing jobs ensures proper cleanup.
  - Fixed issues with patching and restarting cargoes.

### Changes

- **Resource Inspection Path:**
  - Updated the resource inspection path to `GET /resources/{name}/inspect` for consistency.

# Ncproxy 0.12.0

Released alongside Nanocld on **May 16, 2024**, Ncproxy 0.12.0 brings updates to dependencies and introduces request limiting to enhance security.

### Key Updates

- **Dependency Update:**
  - Upgraded to ntex version 2.

- **Request Limiting:**
  - Added limit request zone for HTTP to prevent abuse.

### Changes

- **HTTPS Handling:**
  - Removed redirection to HTTPS in favor of HSTS (HTTP Strict Transport Security) for enhanced security.

We are excited for you to experience the improvements and new features in Nanocl 0.15.0, Nanocld 0.15.0, and Ncproxy 0.12.0. As always, your feedback is invaluable to us, so please let us know how these updates impact your workflow and any suggestions you might have for future releases.

Happy deploying!
The Nanocl Team


[manpages]: /references/nanocl/cli/overview