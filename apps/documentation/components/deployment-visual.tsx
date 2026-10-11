import { ArrowDown, Box, FileCode2, Globe, Server } from "lucide-react"

// An illustrative workflow, not a live console or a deployment status display.
export function DeploymentVisual() {
  return (
    <figure
      aria-label="A Statefile describes workloads that Nanocl runs on your server"
      className="relative min-w-0"
    >
      <div
        className="absolute -inset-5 -z-10 rounded-full bg-linear-to-br from-orange-400/15 to-indigo-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-foreground/5">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 text-xs">
          <span className="flex items-center gap-2 font-medium">
            <FileCode2 className="size-4" aria-hidden="true" />
            Statefile.yml
          </span>
          <span className="text-muted-foreground">01 / Describe</span>
        </div>
        <pre
          className="overflow-x-auto p-5 text-[13px] leading-7 sm:p-7"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <code>
            <span className="text-muted-foreground">
              # A home for your next idea
            </span>
            {"\n"}
            <span>ApiVersion:</span>
            {" v0.18\n"}
            <span>Namespace:</span>
            {" global\n\n"}
            <span>Cargoes:</span>
            {
              "\n  - Name: hello-world\n    Containers:\n      - Name: web\n        Image: nginx:alpine"
            }
          </code>
        </pre>
        <div className="flex items-center gap-3 border-t border-border bg-secondary/60 px-5 py-4 text-xs sm:px-7">
          <span className="text-muted-foreground" aria-hidden="true">
            $
          </span>
          <code className="break-all">nanocl state apply -s Statefile.yml</code>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 py-5 text-xs text-muted-foreground">
        <ArrowDown className="size-4" aria-hidden="true" />
        <span>02 / Apply with Nanocl</span>
      </div>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Server className="size-5" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-semibold">
            Your server. Your workloads.
          </span>
          <span className="text-xs leading-5 text-muted-foreground">
            03 / Run on your infrastructure
          </span>
        </div>
        <Box
          className="hidden size-5 shrink-0 text-muted-foreground sm:block"
          aria-hidden="true"
        />
        <Globe
          className="hidden size-5 shrink-0 text-muted-foreground sm:block"
          aria-hidden="true"
        />
      </div>
      <figcaption className="mt-4 text-center text-xs leading-5 text-muted-foreground">
        A simple container example. Your next deployment starts here.
      </figcaption>
    </figure>
  )
}
