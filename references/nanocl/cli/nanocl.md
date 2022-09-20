<h1 id="nxtmdoc-meta-title">Nanocl Subcommands CLI Reference</h1>

<blockquote class="tags">
	<strong>Tags</strong>
	</br>
 <span id="nxtmdoc-meta-keywords">
	  documentation, nanocl, cli, reference, manual, man, man page, subcommands
  </span>
</blockquote>

<p id="nxtmdoc-meta-description">
Manage your hybrid cloud with nanocl
</p>

<h2>Name</h2>

nanocl - self-sufficient Hybrid-Cloud Orchestrator (HCO)

<h2>Synopsis</h2>

**nanocl** \[**-h**\|**\--help**\] \[**-V**\|**\--version**\]
\[**-H**\|**\--host**\] \<*subcommands*\>

<h2>Description</h2>

Manage your hybrid cloud with nanocl

<h2>Options</h2>

**-h**, **\--help**

:   Print help information

**-V**, **\--version**

:   Print version information

**-H**, **\--host**=*HOST* \[default: unix://run/nanocl/nanocl.sock\]

:   Nanocld host

<h2>Subcommands</h2>

nanocl-docker(1)

:   Alias to self-managed dockerd can be used for debug

nanocl-namespace(1)

:   Manage namespaces

nanocl-cluster(1)

:   Manage clusters

nanocl-cargo(1)

:   Manage cargoes

nanocl-apply(1)

:   Apply a configuration file

nanocl-revert(1)

:   Revert a configuration file

nanocl-git-repository(1)

:   Manage git repositories

nanocl-nginx-template(1)

:   Manage nginx templates

nanocl-container-image(1)

:   Manage container images

nanocl-lsc(1)

:   List container by namespace cluster or cargo

nanocl-run(1)

:   Run a cargo in given environement

nanocl-exec(1)

:   Execute command inside a container

nanocl-node(1)

:   Manage nanocl cluster nodes

nanocl-nginx-log(1)

:   Connect to nginx logging

nanocl-version(1)

:   Show the Nanocl version information

nanocl-help(1)

:   Print this message or the help of the given subcommand(s)

<h2>Version</h2>

v0.1.2
