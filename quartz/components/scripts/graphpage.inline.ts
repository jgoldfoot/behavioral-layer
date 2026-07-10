import {
  loadGraphData,
  createMap2D,
  createGalaxy3D,
  BL_SECTIONS,
  BL_SECTION_LABELS,
  BLHandle,
} from "./blgraph"
import { getFullSlug } from "../../util/path"

let handle: BLHandle | null = null

document.addEventListener("nav", async () => {
  if (getFullSlug(window) !== ("graph" as ReturnType<typeof getFullSlug>)) return
  const root = document.getElementById("bl-graph-page")
  if (!root) return

  const data = await loadGraphData()
  const wrap = root.querySelector(".bl-graph-canvas-wrap") as HTMLElement
  const canvas = document.getElementById("bl-graph-canvas") as HTMLCanvasElement
  const countEl = document.getElementById("bl-graph-count")
  if (countEl) countEl.textContent = `${data.nodes.length} notes · ${data.edges.length} links`

  const from = new URLSearchParams(window.location.search).get("from")
  const dark = () => document.documentElement.getAttribute("saved-theme") !== "light"
  const navTo = (id: string) =>
    window.spaNavigate(new URL(`/${id}`, window.location.toString()))
  let filter: string | null = null
  let query = ""

  const mount = (view: string) => {
    handle?.destroy()
    const common = {
      getW: () => wrap.clientWidth,
      getH: () => wrap.clientHeight,
      onNavigate: navTo,
      current: from,
    }
    handle =
      view === "galaxy"
        ? createGalaxy3D(canvas, data, { ...common, focusFlight: true, stars: 240 })
        : createMap2D(canvas, data, { ...common, dark })
    handle.setFilter(filter)
    handle.setQuery(query)
  }

  const seg = [...root.querySelectorAll(".bl-graph-seg button")] as HTMLElement[]
  const setView = (v: string) => {
    localStorage.setItem("bl-graph-view", v)
    seg.forEach((b) => b.classList.toggle("on", b.dataset.view === v))
    mount(v)
  }
  for (const b of seg) {
    const f = () => setView(b.dataset.view!)
    b.addEventListener("click", f)
    window.addCleanup(() => b.removeEventListener("click", f))
  }

  const legend = document.getElementById("bl-graph-legend")!
  legend.innerHTML = ""
  const counts: Record<string, number> = {}
  for (const n of data.nodes) counts[n.s] = (counts[n.s] ?? 0) + 1
  for (const s of BL_SECTIONS) {
    const b = document.createElement("button")
    b.className = "bl-chip"
    b.dataset.s = s
    b.innerHTML = `<span class="dot" data-s="${s}"></span>${BL_SECTION_LABELS[s]} <span class="n">${counts[s] ?? 0}</span>`
    const f = () => {
      filter = filter === s ? null : s
      legend
        .querySelectorAll(".bl-chip")
        .forEach((c) => c.classList.toggle("on", (c as HTMLElement).dataset.s === filter))
      handle?.setFilter(filter)
    }
    b.addEventListener("click", f)
    window.addCleanup(() => b.removeEventListener("click", f))
    legend.appendChild(b)
  }

  const q = document.getElementById("bl-graph-q") as HTMLInputElement
  const onQ = () => {
    query = q.value
    handle?.setQuery(query)
  }
  q.addEventListener("input", onQ)
  window.addCleanup(() => q.removeEventListener("input", onQ))

  const back = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.href = "/"
  }
  const closeBtn = document.getElementById("bl-graph-close")!
  closeBtn.addEventListener("click", back)
  window.addCleanup(() => closeBtn.removeEventListener("click", back))
  const esc = (e: KeyboardEvent) => {
    if (e.key === "Escape") back()
  }
  document.addEventListener("keydown", esc)
  window.addCleanup(() => document.removeEventListener("keydown", esc))

  const onResize = () => handle?.resize()
  window.addEventListener("resize", onResize)
  window.addCleanup(() => window.removeEventListener("resize", onResize))

  setView(localStorage.getItem("bl-graph-view") ?? "map")
  window.addCleanup(() => {
    handle?.destroy()
    handle = null
  })
})
