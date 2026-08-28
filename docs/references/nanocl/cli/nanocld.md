---
title: Nanocld
sidebar_position: 1
---

# Nanocld

# NAME

Nanocl - Nanocl Daemon - Self Sufficient Orchestrator

## SYNOPSIS

**Nanocl** \[**-H**\|**--hosts**\] \[**--docker-host**\]
\[**--store-addr**\] \[**--state-dir**\] \[**--conf-dir**\] \[**--gateway**\]
\[**--hostname**\] \[**--node**\] \[**--advertise-addr**\] \[**--gid**\]
\[**--cert**\] \[**--cert-key**\] \[**--cert-ca**\] \[**--verify**\]
\[**--password**\]
\[**-h**\|**--help**\] \[**-V**\|**--version**\]

## DESCRIPTION

Nanocl Daemon - Self Sufficient Orchestrator

## OPTIONS

**-H**, **--hosts**=*HOSTS*  
Hosts to listen to use tcp:// and unix:// \[default:
unix:///run/nanocl.sock\]

**--docker-host**=*DOCKER_HOST*  
Docker daemon socket to connect \[default: unix:///var/run/docker.sock\]

**--store-addr**=*STORE_ADDR*
Store address to connect to

**--state-dir**=*STATE_DIR*  
State directory \[default: /var/lib/nanocl\]

**--conf-dir**=*CONF_DIR* \[default: /etc/nanocl\]  
Config directory

**--gateway**=*GATEWAY*  
Gateway automatically detected to host default source ip gateway if not
set

**--hostname**=*HOSTNAME*  
Hostname to use for the node automatically detected if not set

**--node**=*NODES*  
Join current node to a cluster

**--advertise-addr**=*ADVERTISE_ADDR*  
Address to advertise to other nodes

**--gid**=*GID* \[default: 0\]  
Group id

**--cert**=*CERT*  

**--cert-key**=*CERT_KEY*  

**--cert-ca**=*CERT_CA*  

**--verify**
Verify certificate authority

**--password**=*PASSWORD*
The certificate password if any

**-h**, **--help**  
Print help

**-V**, **--version**  
Print version

# VERSION

v0.18.0

# AUTHORS

Next Hat team \<team@next-hat.com\>
