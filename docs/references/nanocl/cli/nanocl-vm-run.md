---
title: Vm run
sidebar_position: 81
---

# Vm run

## SYNOPSIS

**run** \[**--hostname**\] \[**--cpu**\] \[**--mem**\]
\[**--net-iface**\] \[**--user**\] \[**--password**\] \[**--ssh-key**\]
\[**--img-size**\] \[**--kvm**\] \[**-a**\|**--attach**\]
\[**-h**\|**--help**\] \<*NAME*\> \<*IMAGE*\>

## DESCRIPTION

Run a vm

## OPTIONS

**--hostname**=*HOSTNAME*  
hostname of the vm

**--cpu**=*CPU*  
Cpu of the vm default to 1

**--mem**=*MEMORY*  
Memory of the vm in MB default to 512

**--net-iface**=*NET_IFACE*  
network interface of the vm

**--user**=*USER*  
Default user of the VM

**--password**=*PASSWORD*  
Default password of the VM

**--ssh-key**=*SSH_KEY*  
Ssh key for the user

**--img-size**=*IMAGE_SIZE*  
Size of the disk in GB

**--kvm**  
Enable KVM

**-a**, **--attach**  
Attach to the vm

**-h**, **--help**  
Print help

\<*NAME*\>  
Name of the vm

\<*IMAGE*\>  
Name of the vm image
