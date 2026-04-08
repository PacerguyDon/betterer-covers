declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: {
        path?: string
        title?: string
        event?: boolean
      }) => void
    }
  }
}

const GOATCOUNTER_ENDPOINT =
  import.meta.env.VITE_GOATCOUNTER_ENDPOINT?.trim() ?? ''
const GOATCOUNTER_SCRIPT_SRC = 'https://gc.zgo.at/count.js'

let goatCounterInitialized = false

export function initAnalytics() {
  if (!GOATCOUNTER_ENDPOINT || goatCounterInitialized || typeof document === 'undefined') {
    return
  }

  if (document.querySelector('script[data-goatcounter]')) {
    goatCounterInitialized = true
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = GOATCOUNTER_SCRIPT_SRC
  script.setAttribute('data-goatcounter', GOATCOUNTER_ENDPOINT)
  document.head.appendChild(script)

  goatCounterInitialized = true
}

export function trackEvent(path: string, title: string) {
  if (!path || typeof window === 'undefined') {
    return
  }

  window.goatcounter?.count?.({
    event: true,
    path,
    title,
  })
}
