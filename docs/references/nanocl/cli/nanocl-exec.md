---
title: Exec
sidebar_position: 30
---

# Exec

# NAME

exec - Execute a command in a process

## SYNOPSIS

**exec** \[**-d**\|**--detach**\] \[**--detach-keys**\]
\[**-e**\|**--env**\] \[**--env-file**\]
\[**-i**\|**--interactive**\] \[**--privileged**\]
\[**-t**\|**--tty**\] \[**-u**\|**--user**\]
\[**-w**\|**--workdir**\] \[**-h**\|**--help**\]
\<*PROCESS*\> \<*COMMAND*\>...

## DESCRIPTION

Execute a command in a process

## OPTIONS

**-d**, **--detach**  
Run the command in the background

**--detach-keys** *\<DETACH_KEYS\>*  
Override the key sequence for detaching from an interactive exec

**-e**, **--env** *\<ENV\>*  
Set an environment variable

**--env-file** *\<ENV_FILE\>*  
Read environment variables from a file

**-i**, **--interactive**  
Keep standard input open

**--privileged**  
Give the command extended privileges

**-t**, **--tty**  
Allocate a pseudo-TTY

**-u**, **--user** *\<USER\>*  
User and optional group for the command

**-w**, **--workdir** *\<WORKDIR\>*  
Working directory inside the process

**-h**, **--help**  
Print help

*\<PROCESS\>*  
Concrete process name or full Docker ID

*\<COMMAND\>*...  
Command and arguments to execute

