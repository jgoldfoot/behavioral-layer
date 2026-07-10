// Shared graph renderers for The Behavioral Layer.
//
// Two views over the same corpus data, both vanilla canvas (zero dependencies):
//   createMap2D    -- the legible working map (sections as color, hover fades,
//                     collision-culled labels with halo)
//   createGalaxy3D -- the galaxy (perspective projection, additive glow, starfield,
//                     fly-to camera). Used full-scale on /graph and depth-scoped
//                     in the docked navigation panel.
//
// Design rules encoded here: emerald belongs to behavior/ (the thesis core) and to
// "current"; hover state fades rather than pops; labels are placed, not sprayed.

import type { ContentDetails } from "../../plugins/emitters/contentIndex"

export type BLNode = {
  id: string // simplified slug, "" = home
  t: string
  s: string // section key
  deg: number
}
export type BLData = {
  nodes: BLNode[]
  edges: [number, number][]
  adj: Set<number>[]
  byId: Record<string, number>
}
export type BLHandle = {
  destroy(): void
  resize(): void
  setFilter(s: string | null): void
  setQuery(q: string): void
  setCurrent(slug: string | null): void
}

export const BL_SECTIONS = [
  "behavior",
  "evaluate",
  "build",
  "models",
  "research",
  "signal",
  "briefings",
  "meta",
] as const
export const BL_SECTION_LABELS: Record<string, string> = {
  behavior: "Behavior",
  evaluate: "Evaluate",
  build: "Build",
  models: "Models",
  research: "Research",
  signal: "Signal",
  briefings: "Briefings",
  meta: "Meta",
}
// Muted categorical palette; emerald stays with behavior (and "current").
const PAL_LIGHT: Record<string, string> = {
  behavior: "#059669",
  evaluate: "#4a7dbd",
  build: "#8a6fc0",
  models: "#c05f5f",
  research: "#c98b3d",
  signal: "#3aa6a0",
  briefings: "#8a94a3",
  meta: "#9ca3af",
}
const PAL_DARK: Record<string, string> = {
  behavior: "#34d399",
  evaluate: "#7aa7dd",
  build: "#a996dd",
  models: "#d99090",
  research: "#ddb06a",
  signal: "#63c6c0",
  briefings: "#a7b0bd",
  meta: "#7c8694",
}

const reduced = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function sectionOf(id: string): string {
  if (id === "" || id === "about") return "meta"
  const seg = id.split("/")[0]
  return (BL_SECTIONS as readonly string[]).includes(seg) ? seg : "meta"
}

export async function loadGraphData(): Promise<BLData> {
  const raw = Object.entries<ContentDetails>(await fetchData)
  const simplify = (slug: string) =>
    slug === "index" ? "" : slug.endsWith("/index") ? slug.slice(0, -"index".length) : slug
  const nodes: BLNode[] = []
  const byId: Record<string, number> = {}
  for (const [slug, d] of raw) {
    if (slug === "404" || slug === "graph") continue
    const id = simplify(slug)
    byId[id] = nodes.length
    nodes.push({ id, t: d.title ?? id, s: sectionOf(id), deg: 0 })
  }
  const seen = new Set<string>()
  const edges: [number, number][] = []
  for (const [slug, d] of raw) {
    if (slug === "404" || slug === "graph") continue
    const a = byId[simplify(slug)]
    for (const l of d.links ?? []) {
      const b = byId[l]
      if (b === undefined || b === a) continue
      const key = a < b ? `${a}|${b}` : `${b}|${a}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push(a < b ? [a, b] : [b, a])
    }
  }
  const adj = nodes.map(() => new Set<number>())
  for (const [a, b] of edges) {
    nodes[a].deg++
    nodes[b].deg++
    adj[a].add(b)
    adj[b].add(a)
  }
  return { nodes, edges, adj, byId }
}

function loadPos(key: string): Record<string, number[]> {
  try {
    return JSON.parse(sessionStorage.getItem(key) ?? "{}")
  } catch {
    return {}
  }
}
function savePos(key: string, nodes: BLNode[], sim: any[]) {
  const out: Record<string, number[]> = {}
  nodes.forEach((n, i) => (out[n.id] = [sim[i].x, sim[i].y, sim[i].z ?? 0]))
  try {
    sessionStorage.setItem(key, JSON.stringify(out))
  } catch {
    /* full/unavailable: cache is best-effort */
  }
}
function h2r(h: string): [number, number, number] {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
}
function bfs2(adj: Set<number>[], i: number): Set<number> {
  const s = new Set([i])
  adj[i].forEach((a) => {
    s.add(a)
    adj[a].forEach((b) => s.add(b))
  })
  return s
}

type CommonOpts = {
  getW(): number
  getH(): number
  onNavigate?: (id: string) => void
  current?: string | null
}

// ------------------------------------------------------------------ 2D map ---
export function createMap2D(
  canvas: HTMLCanvasElement,
  data: BLData,
  o: CommonOpts & { dark(): boolean; getFilter?(): string | null; getQuery?(): string },
): BLHandle {
  const ctx = canvas.getContext("2d")!
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = o.getW(),
    H = o.getH()
  const EASE = reduced() ? 1 : 0.16
  const cache = loadPos("bl-pos2")
  const sim: any[] = data.nodes.map((n, i) => {
    const c = cache[n.id]
    const a = ((BL_SECTIONS as readonly string[]).indexOf(n.s) / 8) * Math.PI * 2
    return {
      x: c ? c[0] : Math.cos(a) * 150 + ((i * 53) % 80),
      y: c ? c[1] : Math.sin(a) * 110 + ((i * 37) % 60),
      vx: 0,
      vy: 0,
      a: 1,
      lo: 0,
    }
  })
  const eh = new Float32Array(data.edges.length)
  let alpha = Object.keys(cache).length ? 0.15 : 1
  let T = { x: 0, y: 0, k: 1 }
  let hover = -1,
    hset: Set<number> | null = null,
    filter: string | null = null,
    query = "",
    curIdx = o.current != null ? (data.byId[o.current] ?? -1) : -1
  let dragN = -1,
    panning = false,
    lx = 0,
    ly = 0,
    raf = 0,
    dead = false

  function nr(i: number) {
    return 4 + Math.min(10, data.nodes[i].deg * 0.5)
  }
  function dim(i: number) {
    const n = data.nodes[i]
    if (filter && n.s !== filter) return true
    if (query && n.t.toLowerCase().indexOf(query) < 0) return true
    return false
  }
  function step() {
    if (alpha <= 0.02 && dragN < 0) return
    const f = Math.max(alpha, 0.05)
    for (const [ai, bi] of data.edges) {
      const a = sim[ai],
        b = sim[bi]
      const dx = b.x - a.x,
        dy = b.y - a.y,
        d = Math.sqrt(dx * dx + dy * dy) || 1
      const sf = (0.018 * (d - 60) * f) / d
      a.vx += dx * sf
      a.vy += dy * sf
      b.vx -= dx * sf
      b.vy -= dy * sf
    }
    for (let i = 0; i < sim.length; i++)
      for (let j = i + 1; j < sim.length; j++) {
        const a = sim[i],
          b = sim[j]
        let dx = b.x - a.x,
          dy = b.y - a.y,
          d2 = dx * dx + dy * dy
        if (d2 < 64) d2 = 64
        if (d2 > 36000) continue
        const rf = (1500 * f) / d2,
          dd = Math.sqrt(d2)
        dx /= dd
        dy /= dd
        a.vx -= dx * rf
        a.vy -= dy * rf
        b.vx += dx * rf
        b.vy += dy * rf
      }
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      n.vx += -n.x * 0.0045 * f
      n.vy += -n.y * 0.007 * f
      if (i === dragN) {
        n.vx = 0
        n.vy = 0
        continue
      }
      n.vx *= 0.8
      n.vy *= 0.8
      const sp = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
      if (sp > 4) {
        n.vx *= 4 / sp
        n.vy *= 4 / sp
      }
      n.x += n.vx
      n.y += n.vy
    }
    alpha *= 0.996
  }
  if (!Object.keys(cache).length) for (let t = 0; t < 300; t++) step()
  if (reduced()) {
    for (let t = 0; t < 200; t++) step()
    alpha = 0
  }

  function palette() {
    return o.dark()
      ? { P: PAL_DARK, ink: "#f5f5f4", mut: "#b9bfc9", line: "#333333", bg: "#1a1a1a", em: "#34d399" }
      : { P: PAL_LIGHT, ink: "#1f2937", mut: "#6b7280", line: "#e5e7eb", bg: "#ffffff", em: "#059669" }
  }

  function draw() {
    const { P, ink, mut, line, bg, em } = palette()
    for (let i = 0; i < sim.length; i++) {
      let t = 1
      if (dim(i)) t = 0.12
      if (hover >= 0 && !hset!.has(i)) t = Math.min(t, 0.14)
      sim[i].a += (t - sim[i].a) * EASE
    }
    for (let i = 0; i < data.edges.length; i++) {
      const t = hover >= 0 && (data.edges[i][0] === hover || data.edges[i][1] === hover) ? 1 : 0
      eh[i] += (t - eh[i]) * EASE
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.translate(W / 2 + T.x, H / 2 + T.y)
    ctx.scale(T.k, T.k)
    for (let i = 0; i < data.edges.length; i++) {
      const a = sim[data.edges[i][0]],
        b = sim[data.edges[i][1]]
      const minA = Math.min(a.a, b.a)
      let al = Math.max(0.04, 0.06 + 0.32 * ((minA - 0.12) / 0.88))
      al = al + (0.85 - al) * eh[i]
      ctx.globalAlpha = al
      ctx.strokeStyle = eh[i] > 0.5 ? mut : line
      ctx.lineWidth = 1 + 0.4 * eh[i]
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      ctx.globalAlpha = n.a
      ctx.fillStyle = P[data.nodes[i].s]
      ctx.beginPath()
      ctx.arc(n.x, n.y, nr(i), 0, 7)
      ctx.fill()
      if (i === curIdx) {
        ctx.strokeStyle = em
        ctx.lineWidth = 2
        ctx.globalAlpha = Math.max(n.a, 0.6)
        ctx.beginPath()
        ctx.arc(n.x, n.y, nr(i) + 3.5, 0, 7)
        ctx.stroke()
      }
    }
    // labels: priority + greedy collision culling + halo
    const cand: number[] = []
    for (let i = 0; i < sim.length; i++) {
      const n = data.nodes[i]
      ;(sim[i] as any).pri = -1
      if (dim(i)) continue
      const inSet = hover >= 0 && hset!.has(i)
      const isM = !!query && n.t.toLowerCase().indexOf(query) >= 0
      if (i === hover) sim[i].pri = 100
      else if (isM) sim[i].pri = 90
      else if (i === curIdx && (hover < 0 || inSet)) sim[i].pri = 80
      else if (inSet) sim[i].pri = 40 + Math.min(30, n.deg)
      else if (hover < 0 && (n.deg >= 9 || T.k > 1.5)) sim[i].pri = 10 + Math.min(20, n.deg)
      if (sim[i].pri >= 0) cand.push(i)
    }
    cand.sort((a, b) => sim[b].pri - sim[a].pri)
    const boxes: number[][] = []
    const placed = new Set<number>()
    let nbr = 0
    const vx0 = (-W / 2 - T.x) / T.k + 4,
      vy0 = (-H / 2 - T.y) / T.k + 4,
      vx1 = (W / 2 - T.x) / T.k - 4,
      vy1 = (H / 2 - T.y) / T.k - 4
    ctx.textAlign = "center"
    ctx.lineJoin = "round"
    for (const i of cand) {
      const isN = sim[i].pri >= 40 && sim[i].pri < 80 && i !== hover
      if (isN && nbr >= 12) continue
      const full = data.nodes[i].t
      const lbl = full.length > 30 ? full.slice(0, 29) + "…" : full
      ctx.font = (i === hover ? "600 " : "") + "11px Inter, -apple-system, sans-serif"
      const w2 = ctx.measureText(lbl).width / 2 + 4
      const lx2 = Math.min(Math.max(sim[i].x, vx0 + w2), vx1 - w2)
      let ly2 = sim[i].y - nr(i) - 7
      if (ly2 - 11 < vy0) ly2 = sim[i].y + nr(i) + 15
      if (ly2 > vy1) ly2 = sim[i].y - nr(i) - 7
      const box = [lx2 - w2, ly2 - 11, lx2 + w2, ly2 + 4]
      let clash = false
      for (const B of boxes)
        if (box[0] < B[2] && box[2] > B[0] && box[1] < B[3] && box[3] > B[1]) {
          clash = true
          break
        }
      if (clash) continue
      boxes.push(box)
      placed.add(i)
      sim[i].lx = lx2
      sim[i].ly = ly2
      sim[i].lb = lbl
      if (isN) nbr++
    }
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      n.lo += ((placed.has(i) ? 1 : 0) - n.lo) * EASE
      if (n.lo <= 0.03 || n.lx === undefined) continue
      const isM = !!query && data.nodes[i].t.toLowerCase().indexOf(query) >= 0
      ctx.font = (i === hover ? "600 " : "") + "11px Inter, -apple-system, sans-serif"
      ctx.globalAlpha = n.lo
      ctx.lineWidth = 3.5
      ctx.strokeStyle = bg
      ctx.strokeText(n.lb, n.lx, n.ly)
      ctx.fillStyle = i === hover || isM ? ink : mut
      ctx.fillText(n.lb, n.lx, n.ly)
    }
    ctx.globalAlpha = 1
  }
  function loop() {
    if (dead) return
    step()
    draw()
    raf = requestAnimationFrame(loop)
  }

  function toWorld(mx: number, my: number) {
    return [(mx - W / 2 - T.x) / T.k, (my - H / 2 - T.y) / T.k]
  }
  function hit(mx: number, my: number) {
    const w = toWorld(mx, my)
    let best = -1,
      bd = 196
    for (let i = sim.length - 1; i >= 0; i--) {
      const dx = sim[i].x - w[0],
        dy = sim[i].y - w[1],
        d2 = dx * dx + dy * dy
      const rr = Math.max(10, nr(i) + 4)
      if (d2 <= rr * rr && d2 < bd) {
        bd = d2
        best = i
      }
    }
    return best
  }
  function pos(ev: MouseEvent) {
    const r = canvas.getBoundingClientRect()
    return [ev.clientX - r.left, ev.clientY - r.top]
  }
  let downAt = 0,
    moved = false
  const onDown = (ev: MouseEvent) => {
    const p = pos(ev)
    downAt = performance.now()
    moved = false
    const h = hit(p[0], p[1])
    if (h >= 0) {
      dragN = h
      alpha = Math.max(alpha, 0.45)
    } else {
      panning = true
      lx = p[0]
      ly = p[1]
    }
  }
  const onUp = (ev: MouseEvent) => {
    if (!moved && performance.now() - downAt < 450 && o.onNavigate) {
      const p = pos(ev)
      const h = hit(p[0], p[1])
      if (h >= 0) o.onNavigate(data.nodes[h].id)
    }
    dragN = -1
    panning = false
  }
  const onWinUp = () => {
    dragN = -1
    panning = false
  }
  const onMove = (ev: MouseEvent) => {
    const p = pos(ev)
    if (dragN >= 0) {
      moved = true
      const w = toWorld(p[0], p[1])
      sim[dragN].x = w[0]
      sim[dragN].y = w[1]
      alpha = Math.max(alpha, 0.45)
      return
    }
    if (panning) {
      moved = true
      T.x += p[0] - lx
      T.y += p[1] - ly
      lx = p[0]
      ly = p[1]
      return
    }
    const h = hit(p[0], p[1])
    hover = h
    if (h >= 0) {
      hset = new Set([h])
      data.adj[h].forEach((x) => hset!.add(x))
    }
    canvas.style.cursor = h >= 0 ? "pointer" : "grab"
  }
  const onLeave = () => (hover = -1)
  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault()
    const p = pos(ev)
    const k2 = Math.min(5, Math.max(0.4, T.k * Math.exp(-ev.deltaY * 0.0012)))
    const wx = p[0] - W / 2,
      wy = p[1] - H / 2
    T.x = wx - ((wx - T.x) * k2) / T.k
    T.y = wy - ((wy - T.y) * k2) / T.k
    T.k = k2
  }
  canvas.addEventListener("mousedown", onDown)
  canvas.addEventListener("mouseup", onUp)
  window.addEventListener("mouseup", onWinUp)
  canvas.addEventListener("mousemove", onMove)
  canvas.addEventListener("mouseleave", onLeave)
  canvas.addEventListener("wheel", onWheel, { passive: false })

  function resize() {
    W = Math.max(160, o.getW())
    H = Math.max(160, o.getH())
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + "px"
    canvas.style.height = H + "px"
  }
  resize()
  raf = requestAnimationFrame(loop)

  return {
    destroy() {
      dead = true
      cancelAnimationFrame(raf)
      savePos("bl-pos2", data.nodes, sim)
      canvas.removeEventListener("mousedown", onDown)
      canvas.removeEventListener("mouseup", onUp)
      window.removeEventListener("mouseup", onWinUp)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      canvas.removeEventListener("wheel", onWheel)
    },
    resize,
    setFilter(s) {
      filter = s
    },
    setQuery(q) {
      query = q.trim().toLowerCase()
    },
    setCurrent(slug) {
      curIdx = slug != null ? (data.byId[slug] ?? -1) : -1
    },
  }
}

// -------------------------------------------------------------- 3D galaxy ---
export function createGalaxy3D(
  canvas: HTMLCanvasElement,
  data: BLData,
  o: CommonOpts & { neighborhood?: boolean; focusFlight?: boolean; stars?: number },
): BLHandle {
  const ctx = canvas.getContext("2d")!
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = o.getW(),
    H = o.getH()
  const F = 470
  const BG = "#0b0e14",
    INK = "#e8ecf4",
    MUT = "#9aa6b8",
    LINE = "#31405a"
  const EASE = reduced() ? 1 : 0.15
  const cache = loadPos("bl-pos3")
  const sim: any[] = data.nodes.map((n, i) => {
    const c = cache[n.id]
    const a = ((BL_SECTIONS as readonly string[]).indexOf(n.s) / 8) * Math.PI * 2
    return {
      x: c ? c[0] : Math.cos(a) * 185 + (((i * 37) % 90) - 45),
      y: c ? c[1] : (((i * 23) % 50) - 25) * 0.8,
      z: c ? c[2] : Math.sin(a) * 185 + (((i * 61) % 90) - 45),
      vx: 0,
      vy: 0,
      vz: 0,
      e: 1,
      va: o.neighborhood ? 0 : 1,
      lo: 0,
    }
  })
  const hubFlag = data.nodes.map((n) => n.id.endsWith("/") || n.id === "")
  let alpha = Object.keys(cache).length ? 0.1 : 1
  let yaw = 0.6,
    pitch = 0.4,
    dist = 760,
    tgt = { x: 0, y: 0, z: 0 }
  let hover = -1,
    hset: Set<number> | null = null,
    sel = -1,
    sset: Set<number> | null = null,
    filter: string | null = null,
    query = "",
    curIdx = o.current != null ? (data.byId[o.current] ?? -1) : -1
  let vis: Set<number> | null = null
  let anim: any = null,
    userD = false,
    lastTouch = performance.now(),
    dragging = false,
    lx = 0,
    ly = 0,
    md: any = null,
    raf = 0,
    dead = false

  const nr = (i: number) => 3 + Math.min(9, data.nodes[i].deg * 0.45)
  function refreshVis() {
    vis = o.neighborhood && curIdx >= 0 ? bfs2(data.adj, curIdx) : null
  }
  refreshVis()
  if (o.neighborhood && curIdx >= 0) {
    tgt = { x: sim[curIdx].x, y: sim[curIdx].y, z: sim[curIdx].z }
  }

  function step() {
    if (alpha <= 0.02) return
    const f = Math.max(alpha, 0.05)
    for (const [ai, bi] of data.edges) {
      const a = sim[ai],
        b = sim[bi]
      const dx = b.x - a.x,
        dy = b.y - a.y,
        dz = b.z - a.z,
        d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1
      const sf = (0.02 * (d - 58) * f) / d
      a.vx += dx * sf
      a.vy += dy * sf
      a.vz += dz * sf
      b.vx -= dx * sf
      b.vy -= dy * sf
      b.vz -= dz * sf
    }
    for (let i = 0; i < sim.length; i++)
      for (let j = i + 1; j < sim.length; j++) {
        const a = sim[i],
          b = sim[j]
        let dx = b.x - a.x,
          dy = b.y - a.y,
          dz = b.z - a.z,
          d2 = dx * dx + dy * dy + dz * dz
        if (d2 < 100) d2 = 100
        if (d2 > 40000) continue
        const rf = (1500 * f) / d2,
          dd = Math.sqrt(d2)
        dx /= dd
        dy /= dd
        dz /= dd
        a.vx -= dx * rf
        a.vy -= dy * rf
        a.vz -= dz * rf
        b.vx += dx * rf
        b.vy += dy * rf
        b.vz += dz * rf
      }
    // constellation cohesion + disc flattening
    const cent: Record<string, number[]> = {},
      cnt: Record<string, number> = {}
    for (let i = 0; i < sim.length; i++) {
      const s = data.nodes[i].s
      if (!cent[s]) {
        cent[s] = [0, 0]
        cnt[s] = 0
      }
      cent[s][0] += sim[i].x
      cent[s][1] += sim[i].z
      cnt[s]++
    }
    for (const k in cent) {
      cent[k][0] /= cnt[k]
      cent[k][1] /= cnt[k]
    }
    for (let i = 0; i < sim.length; i++) {
      const a = sim[i],
        s = data.nodes[i].s
      a.vx += (cent[s][0] - a.x) * 0.0025 * f + -a.x * 0.004 * f
      a.vz += (cent[s][1] - a.z) * 0.0025 * f + -a.z * 0.004 * f
      a.vy += -a.y * 0.012 * f
      a.vx *= 0.8
      a.vy *= 0.8
      a.vz *= 0.8
      const sp = Math.sqrt(a.vx * a.vx + a.vy * a.vy + a.vz * a.vz)
      if (sp > 4) {
        a.vx *= 4 / sp
        a.vy *= 4 / sp
        a.vz *= 4 / sp
      }
      a.x += a.vx
      a.y += a.vy
      a.z += a.vz
    }
    alpha *= 0.995
  }
  if (!Object.keys(cache).length) for (let t = 0; t < 260; t++) step()
  if (reduced()) alpha = 0

  const NSTARS = o.stars ?? 240
  const stars: any[] = []
  for (let st = 0; st < NSTARS; st++) {
    const u = (st * 0.618034) % 1,
      v = ((st * 0.754877) % 1) * 2 - 1
    const th = u * Math.PI * 2,
      ph = Math.acos(v),
      R = 2000 + ((st * 97) % 900)
    stars.push({
      x: R * Math.sin(ph) * Math.cos(th),
      y: R * Math.cos(ph) * 0.6,
      z: R * Math.sin(ph) * Math.sin(th),
      r: 0.4 + ((st * 13) % 9) / 11,
      a: 0.16 + ((st * 7) % 45) / 100,
      ph: (st % 628) / 100,
      sp: 0.4 + ((st * 11) % 10) / 10,
    })
  }

  function proj(x: number, y: number, z: number) {
    x -= tgt.x
    y -= tgt.y
    z -= tgt.z
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw),
      cp = Math.cos(pitch),
      sp = Math.sin(pitch)
    const xr = x * cy + z * sy,
      zr = -x * sy + z * cy
    const yr = y * cp - zr * sp,
      z2 = y * sp + zr * cp
    const depth = z2 + dist
    if (depth < 70) return null
    const s = F / depth
    return [W / 2 + xr * s, H / 2 + yr * s, s, depth]
  }
  const fog = (d: number) => Math.max(0.1, Math.min(1, (dist + 500 - d) / 600))
  const eio = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
  function frameNeed(ci: number, yV: number, pV: number) {
    const c = sim[ci],
      mx = Math.max(70, W / 2 - 70),
      my = Math.max(60, H / 2 - 56)
    let need = 230
    const ids = [ci, ...data.adj[ci]]
    const cy = Math.cos(yV),
      sy = Math.sin(yV),
      cp = Math.cos(pV),
      sp = Math.sin(pV)
    for (const k of ids) {
      const n = sim[k]
      const x = n.x - c.x,
        y = n.y - c.y,
        z = n.z - c.z
      const xr = x * cy + z * sy,
        zr = -x * sy + z * cy
      const yr = y * cp - zr * sp,
        z2 = y * sp + zr * cp
      need = Math.max(need, (Math.abs(xr) * F) / mx - z2, (Math.abs(yr) * F) / my - z2)
    }
    return Math.min(1400, Math.max(240, need * 1.15 + 45))
  }
  function startAnim(to: any) {
    if (reduced()) {
      tgt = { x: to.tx, y: to.ty, z: to.tz }
      dist = to.d
      yaw = to.y
      pitch = to.p
      anim = null
      return
    }
    anim = {
      t0: performance.now(),
      dur: 900,
      f: { tx: tgt.x, ty: tgt.y, tz: tgt.z, d: dist, y: yaw, p: pitch },
      to,
    }
  }
  function focusOn(i: number) {
    sel = i
    sset = new Set([i])
    data.adj[i].forEach((x) => sset!.add(x))
    const yTo = yaw + (reduced() ? 0 : 0.35),
      pTo = Math.min(0.7, Math.max(0.18, pitch))
    startAnim({ tx: sim[i].x, ty: sim[i].y, tz: sim[i].z, d: frameNeed(i, yTo, pTo), y: yTo, p: pTo })
  }
  function clearFocus() {
    sel = -1
    sset = null
    startAnim({ tx: 0, ty: 0, tz: 0, d: 760, y: yaw, p: pitch })
  }

  function dim(i: number) {
    const n = data.nodes[i]
    if (filter && n.s !== filter) return true
    if (query && n.t.toLowerCase().indexOf(query) < 0) return true
    return false
  }

  function draw(now: number) {
    if (anim) {
      const k = Math.min(1, (performance.now() - anim.t0) / anim.dur),
        e = eio(k)
      tgt.x = anim.f.tx + (anim.to.tx - anim.f.tx) * e
      tgt.y = anim.f.ty + (anim.to.ty - anim.f.ty) * e
      tgt.z = anim.f.tz + (anim.to.tz - anim.f.tz) * e
      dist = anim.f.d + (anim.to.d - anim.f.d) * e
      yaw = anim.f.y + (anim.to.y - anim.f.y) * e
      pitch = anim.f.p + (anim.to.p - anim.f.p) * e
      if (k >= 1) anim = null
    } else {
      if (o.neighborhood && curIdx >= 0) {
        tgt.x += (sim[curIdx].x - tgt.x) * (reduced() ? 1 : 0.08)
        tgt.y += (sim[curIdx].y - tgt.y) * (reduced() ? 1 : 0.08)
        tgt.z += (sim[curIdx].z - tgt.z) * (reduced() ? 1 : 0.08)
        if (!userD) dist += (frameNeed(curIdx, yaw, pitch) - dist) * (reduced() ? 1 : 0.06)
      }
      if (!reduced() && !dragging && performance.now() - lastTouch > 3500) yaw += 0.0011
    }
    const fIdx = hover >= 0 ? hover : sel
    const fSet = hover >= 0 ? hset : sset
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      let t = 1
      if (dim(i)) t = 0.08
      if (fIdx >= 0 && !fSet!.has(i)) t = Math.min(t, 0.22)
      n.e += (t - n.e) * EASE
      const visT = vis ? (vis.has(i) ? 1 : 0) : 1
      n.va += (visT - n.va) * EASE
      const p = n.va > 0.02 ? proj(n.x, n.y, n.z) : null
      n.sx = p ? p[0] : -9e3
      n.sy = p ? p[1] : -9e3
      n.ss = p ? p[2] : 0
      n.sd = p ? p[3] : 9e9
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, W, H)
    for (const s2 of stars) {
      const pp = proj(s2.x, s2.y, s2.z)
      if (!pp) continue
      const tw = reduced() ? 1 : 0.75 + 0.25 * Math.sin(now * 0.001 * s2.sp + s2.ph)
      ctx.globalAlpha = s2.a * tw
      ctx.fillStyle = "#cdd7e8"
      ctx.beginPath()
      ctx.arc(pp[0], pp[1], s2.r, 0, 7)
      ctx.fill()
    }
    ctx.globalCompositeOperation = "lighter"
    for (let i = 0; i < data.edges.length; i++) {
      const a = sim[data.edges[i][0]],
        b = sim[data.edges[i][1]]
      if (a.ss <= 0 || b.ss <= 0) continue
      const va = Math.min(a.va, b.va)
      if (va <= 0.05) continue
      const em = fIdx >= 0 && (data.edges[i][0] === fIdx || data.edges[i][1] === fIdx)
      const al = 0.1 * fog((a.sd + b.sd) / 2) * Math.min(a.e, b.e) * va + (em ? 0.5 : 0)
      ctx.globalAlpha = Math.min(0.75, al)
      ctx.strokeStyle = em ? "#8fa3bd" : LINE
      ctx.lineWidth = em ? 1.3 : 0.8
      ctx.beginPath()
      ctx.moveTo(a.sx, a.sy)
      ctx.lineTo(b.sx, b.sy)
      ctx.stroke()
    }
    const order = sim.map((_, ix) => ix).sort((a, b) => sim[b].sd - sim[a].sd)
    for (const i of order) {
      const n = sim[i]
      if (n.va <= 0.03 || n.ss <= 0) continue
      const r = nr(i) * n.ss * 1.5,
        fg = fog(n.sd),
        rgb = h2r(PAL_DARK[data.nodes[i].s])
      const G = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, r * 2.3)
      G.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.6)`)
      G.addColorStop(0.4, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.2)`)
      G.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
      ctx.globalAlpha = fg * n.e * n.va
      ctx.fillStyle = G
      ctx.beginPath()
      ctx.arc(n.sx, n.sy, r * 2.3, 0, 7)
      ctx.fill()
      ctx.globalAlpha = Math.min(1, fg * n.e * n.va * 1.2)
      ctx.fillStyle = "#eef4ff"
      ctx.beginPath()
      ctx.arc(n.sx, n.sy, Math.max(0.7, r * 0.42), 0, 7)
      ctx.fill()
    }
    ctx.globalCompositeOperation = "source-over"
    if (curIdx >= 0 && sim[curIdx].ss > 0) {
      const n = sim[curIdx]
      ctx.globalAlpha = Math.max(0.55, n.e)
      ctx.strokeStyle = "#34d399"
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.arc(n.sx, n.sy, nr(curIdx) * n.ss * 1.5 + 5, 0, 7)
      ctx.stroke()
    }
    // labels
    const cand: number[] = []
    for (let i = 0; i < sim.length; i++) {
      const n = data.nodes[i]
      sim[i].pri = -1
      if (sim[i].va <= 0.5 || sim[i].ss <= 0 || dim(i)) continue
      const inSet = fIdx >= 0 && fSet!.has(i)
      const isM = !!query && n.t.toLowerCase().indexOf(query) >= 0
      if (i === fIdx) sim[i].pri = 100
      else if (isM) sim[i].pri = 90
      else if (i === curIdx && (fIdx < 0 || inSet)) sim[i].pri = 80
      else if (inSet || (o.neighborhood && curIdx >= 0 && data.adj[curIdx].has(i) && fIdx < 0))
        sim[i].pri = 40 + Math.min(30, n.deg)
      else if (fIdx < 0 && !o.neighborhood && hubFlag[i]) sim[i].pri = 30
      if (sim[i].pri >= 0) cand.push(i)
    }
    cand.sort((a, b) => sim[b].pri - sim[a].pri)
    const boxes: number[][] = []
    const placed = new Set<number>()
    let nbr = 0
    ctx.textAlign = "center"
    ctx.lineJoin = "round"
    const nbrCap = o.neighborhood ? 8 : 8
    for (const i of cand) {
      const isN = sim[i].pri >= 40 && sim[i].pri < 80 && i !== fIdx
      if (isN && nbr >= nbrCap) continue
      const constel = hubFlag[i] && fIdx < 0 && !o.neighborhood
      const full = data.nodes[i].t
      const lbl = constel
        ? (BL_SECTION_LABELS[data.nodes[i].s] ?? full).toUpperCase()
        : full.length > 28
          ? full.slice(0, 27) + "…"
          : full
      ctx.font = (i === fIdx ? "600 " : "") + (constel ? "10.5px" : "11px") + " Inter, -apple-system, sans-serif"
      const w2 = ctx.measureText(lbl).width / 2 + 4
      const lx2 = Math.min(Math.max(sim[i].sx, w2 + 6), W - w2 - 6)
      let ly2 = sim[i].sy - nr(i) * sim[i].ss * 1.5 - 8
      if (ly2 < 14) ly2 = sim[i].sy + nr(i) * sim[i].ss * 1.5 + 14
      const box = [lx2 - w2, ly2 - 10, lx2 + w2, ly2 + 4]
      let clash = false
      for (const B of boxes)
        if (box[0] < B[2] && box[2] > B[0] && box[1] < B[3] && box[3] > B[1]) {
          clash = true
          break
        }
      if (clash) continue
      boxes.push(box)
      placed.add(i)
      sim[i].lx = lx2
      sim[i].ly = ly2
      sim[i].lb = lbl
      sim[i].lc = constel
      if (isN) nbr++
    }
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      n.lo += ((placed.has(i) ? 1 : 0) - n.lo) * EASE
      if (n.lo <= 0.03 || n.lx === undefined) continue
      ctx.font = (i === fIdx ? "600 " : "") + (n.lc ? "10.5px" : "11px") + " Inter, -apple-system, sans-serif"
      ctx.globalAlpha = n.lo * Math.max(n.va, 0.3)
      ctx.lineWidth = 3.5
      ctx.strokeStyle = BG
      ctx.strokeText(n.lb, n.lx, n.ly)
      ctx.fillStyle = i === fIdx ? INK : n.lc ? MUT : INK
      ctx.fillText(n.lb, n.lx, n.ly)
    }
    ctx.globalAlpha = 1
  }
  function loop(now: number) {
    if (dead) return
    step()
    draw(now || 0)
    raf = requestAnimationFrame(loop)
  }

  function pos(ev: MouseEvent) {
    const r = canvas.getBoundingClientRect()
    return [ev.clientX - r.left, ev.clientY - r.top]
  }
  function hit(p: number[]) {
    let best = -1,
      bd = 196
    for (let i = 0; i < sim.length; i++) {
      const n = sim[i]
      if (n.va <= 0.5 || n.ss <= 0) continue
      const dx = n.sx - p[0],
        dy = n.sy - p[1],
        d2 = dx * dx + dy * dy
      const rr = Math.max(10, nr(i) * n.ss * 1.5 + 6)
      if (d2 < rr * rr && d2 < bd) {
        bd = d2
        best = i
      }
    }
    return best
  }
  const onDown = (ev: MouseEvent) => {
    dragging = true
    const p = pos(ev)
    lx = p[0]
    ly = p[1]
    md = { x: p[0], y: p[1], t: performance.now(), mv: false }
    lastTouch = performance.now()
  }
  const onUp = (ev: MouseEvent) => {
    if (md && !md.mv && performance.now() - md.t < 450) {
      const h = hit(pos(ev))
      if (h >= 0) {
        if (o.focusFlight) {
          if (sel === h && o.onNavigate) o.onNavigate(data.nodes[h].id)
          else focusOn(h)
        } else if (o.onNavigate && h !== curIdx) {
          o.onNavigate(data.nodes[h].id)
        }
      } else if (o.focusFlight && sel >= 0) {
        clearFocus()
      }
    }
    md = null
  }
  const onWinUp = () => (dragging = false)
  const onMove = (ev: MouseEvent) => {
    const p = pos(ev)
    lastTouch = performance.now()
    if (dragging) {
      if (md && (Math.abs(p[0] - md.x) > 5 || Math.abs(p[1] - md.y) > 5)) md.mv = true
      if (md && md.mv) anim = null
      yaw += (p[0] - lx) * 0.005
      pitch = Math.min(1.25, Math.max(-1.25, pitch + (p[1] - ly) * 0.004))
      lx = p[0]
      ly = p[1]
      return
    }
    hover = hit(p)
    if (hover >= 0) {
      hset = new Set([hover])
      data.adj[hover].forEach((x) => hset!.add(x))
    }
    canvas.style.cursor = hover >= 0 ? "pointer" : "grab"
  }
  const onLeave = () => (hover = -1)
  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault()
    lastTouch = performance.now()
    anim = null
    userD = true
    dist = Math.min(1500, Math.max(110, dist * Math.exp(ev.deltaY * 0.0012)))
  }
  canvas.addEventListener("mousedown", onDown)
  canvas.addEventListener("mouseup", onUp)
  window.addEventListener("mouseup", onWinUp)
  canvas.addEventListener("mousemove", onMove)
  canvas.addEventListener("mouseleave", onLeave)
  canvas.addEventListener("wheel", onWheel, { passive: false })

  function resize() {
    W = Math.max(160, o.getW())
    H = Math.max(160, o.getH())
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + "px"
    canvas.style.height = H + "px"
  }
  resize()
  raf = requestAnimationFrame(loop)

  return {
    destroy() {
      dead = true
      cancelAnimationFrame(raf)
      savePos("bl-pos3", data.nodes, sim)
      canvas.removeEventListener("mousedown", onDown)
      canvas.removeEventListener("mouseup", onUp)
      window.removeEventListener("mouseup", onWinUp)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      canvas.removeEventListener("wheel", onWheel)
    },
    resize,
    setFilter(s) {
      filter = s
    },
    setQuery(q) {
      query = q.trim().toLowerCase()
    },
    setCurrent(slug) {
      curIdx = slug != null ? (data.byId[slug] ?? -1) : -1
      userD = false
      alpha = Math.max(alpha, 0.25)
      refreshVis()
    },
  }
}
