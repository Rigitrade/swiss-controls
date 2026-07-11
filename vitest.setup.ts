import "@testing-library/jest-dom/vitest"

// jsdom doesn't implement the browser APIs our scroll-reveal / count-up
// components rely on. Shim them so those components can render in tests.
const globalRef = globalThis as {
  matchMedia?: (query: string) => MediaQueryList
  IntersectionObserver?: typeof IntersectionObserver
}

if (typeof globalRef.matchMedia !== "function") {
  globalRef.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

if (typeof globalRef.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    readonly root = null
    readonly rootMargin = ""
    readonly thresholds: ReadonlyArray<number> = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
  globalRef.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver
}
