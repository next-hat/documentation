'use client'

import { Redoc } from 'redoc'
import type { RedocSpec } from '../lib/redoc-options'
import { useRedocStore } from './use-redoc-store'
import './open_api.css'

// StrictMode replays mount/unmount on the same instance. Keep Redoc's search
// worker alive for that replay, then dispose it after a real unmount.
class MountedRedoc extends Redoc {
  private disposalGeneration = 0

  componentDidMount() {
    this.disposalGeneration++
    super.componentDidMount()
  }

  componentWillUnmount() {
    const generation = ++this.disposalGeneration
    queueMicrotask(() => {
      if (generation === this.disposalGeneration) super.componentWillUnmount()
    })
  }
}

export default function RedocViewer({ spec, specUrl, version }: { spec: RedocSpec; specUrl: string; version: string }) {
  const { store, theme } = useRedocStore(spec, specUrl)
  return <div className="redoc-documentation" data-redoc-version={version}>
    <MountedRedoc key={`${specUrl}:${theme}`} store={store} />
  </div>
}
