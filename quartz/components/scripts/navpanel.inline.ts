import { loadGraphData, createGalaxy3D, BLHandle } from "./blgraph"
import { getFullSlug, simplifySlug } from "../../util/path"

const MIN_W = 240
const clampW = (w: number) => Math.min(Math.max(w, MIN_W), Math.floor(window.innerWidth * 0.5))

// Restore the persisted panel width before first paint settles.
const savedW = localStorage.getItem("bl-nav-width")
if (savedW) {
  const w = parseInt(savedW, 10)
  if (!isNaN(w)) document.documentElement.style.setProperty("--nav-width", clampW(w) + "px")
}

let handle: BLHandle | null = null

document.addEventListener("nav", () => {
  const panel = document.querySelector(".nav-panel") as HTMLElement | null
  if (!panel) return

  const tabs = [...panel.querySelectorAll(".nav-tab")] as HTMLElement[]
  const outlinePane = panel.querySelector('[data-pane="outline"]') as HTMLElement
  const mapPane = panel.querySelector('[data-pane="map"]') as HTMLElement
  const canvas = panel.querySelector(".nav-panel-canvas") as HTMLCanvasElement
  const isMobile = window.matchMedia("(max-width: 800px)").matches
  const current = simplifySlug(getFullSlug(window))

  let mounted = false
  const mountMap = async () => {
    if (mounted || isMobile) return
    mounted = true
    const data = await loadGraphData()
    handle = createGalaxy3D(canvas, data, {
      getW: () => mapPane.clientWidth,
      getH: () => 380,
      onNavigate: (id) => window.spaNavigate(new URL(`/${id}`, window.location.toString())),
      current,
      neighborhood: true,
      stars: 70,
    })
  }

  const setTab = (t: string, persist = true) => {
    if (persist) localStorage.setItem("bl-nav-tab", t)
    tabs.forEach((b) => b.classList.toggle("on", b.dataset.tab === t))
    outlinePane.style.display = t === "outline" ? "" : "none"
    mapPane.style.display = t === "map" ? "" : "none"
    if (t === "map") void mountMap()
  }
  for (const b of tabs) {
    const f = () => setTab(b.dataset.tab!)
    b.addEventListener("click", f)
    window.addCleanup(() => b.removeEventListener("click", f))
  }
  setTab(isMobile ? "outline" : (localStorage.getItem("bl-nav-tab") ?? "outline"), false)

  // Splitter: drag resizes the whole left column via --nav-width; persisted.
  const splitter = panel.querySelector(".nav-splitter") as HTMLElement
  const sidebar = panel.closest(".sidebar") as HTMLElement | null
  let dragging = false
  const onDown = (e: MouseEvent) => {
    e.preventDefault()
    dragging = true
    splitter.classList.add("live")
  }
  const onMove = (e: MouseEvent) => {
    if (!dragging || !sidebar) return
    const left = sidebar.getBoundingClientRect().left
    const w = clampW(e.clientX - left)
    document.documentElement.style.setProperty("--nav-width", w + "px")
    localStorage.setItem("bl-nav-width", String(w))
    handle?.resize()
  }
  const onUp = () => {
    if (!dragging) return
    dragging = false
    splitter.classList.remove("live")
  }
  splitter.addEventListener("mousedown", onDown)
  window.addEventListener("mousemove", onMove)
  window.addEventListener("mouseup", onUp)
  window.addCleanup(() => {
    splitter.removeEventListener("mousedown", onDown)
    window.removeEventListener("mousemove", onMove)
    window.removeEventListener("mouseup", onUp)
  })

  const onResize = () => handle?.resize()
  window.addEventListener("resize", onResize)
  window.addCleanup(() => window.removeEventListener("resize", onResize))

  // Engine is per-page: destroyed on navigation, positions carried in
  // sessionStorage so the space feels continuous rather than re-shuffled.
  window.addCleanup(() => {
    handle?.destroy()
    handle = null
  })
})
