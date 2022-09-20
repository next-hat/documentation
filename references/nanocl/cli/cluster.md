<h1 id="nxtmdoc-meta-title">Nanocl Cluster CLI Reference</h1>

<blockquote class="tags">
	<strong>Tags</strong>
	</br>
 <span id="nxtmdoc-meta-keywords">
	  documentation, nanocl, cli, reference, manual, man, man page, cluster
  </span>
</blockquote>

<p id="nxtmdoc-meta-description">
Manage nanocl clusters
</p>

<h2>Name</h2>

nanocl-cluster - Manage clusters

<h2>Synopsis</h2>

**nanocl-cluster** \[**-h**\|**\--help**\] \[**\--namespace**\]
\<*subcommands*\>

<h2>Description</h2>

Create, Update, Inspect or Delete cluster

<h2>Options</h2>

**-h**, **\--help**

:   Print help information

**\--namespace**=*NAMESPACE*

:   Namespace to target by default global is used

<h2>Subcommands</h2>

nanocl-cluster-list(1)

:   List existing cluster

nanocl-cluster-create(1)

:   Create new cluster

nanocl-cluster-remove(1)

:   Remove cluster by its name

nanocl-cluster-start(1)

:   Start cluster by its name

nanocl-cluster-inspect(1)

:   Inspect cluster by its name

nanocl-cluster-nginx-template(1)

:   Control cluster nginx templates

nanocl-cluster-network(1)

:   Control cluster networks

nanocl-cluster-variable(1)

:   Control cluster variables

nanocl-cluster-join(1)

:   Create containers instances of a cargo inside given cluster and
    network

nanocl-cluster-help(1)

:   Print this message or the help of the given subcommand(s)
