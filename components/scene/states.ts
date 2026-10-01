/**
 * The sculpture is one passage of play on one pitch. Every state places the
 * same N nodes: the pitch, both goals and the team never move between states;
 * only the ball travels and the trail of passes behind it grows. Scroll picks
 * the state, so reading the page plays the move out, from kick-off to goal.
 */

export type Vec3 = [number, number, number];

/**
 * The fourth channel of every node packs three flags:
 * accent (yellow) + 2 × ball (rolls with the ball) + 4 × hidden (not drawn yet).
 */
export const FLAG = { accent: 1, ball: 2, hidden: 4 } as const;

export type BuiltState = {
  /** xyz + flags per node, length n * 4 */
  nodes: Float32Array;
  /** pairs of node indices */
  edges: number[];
};

export type StateParams = {
  name: string;
  /** what the camera looks at, in pitch coordinates */
  target: Vec3;
  /** camera position relative to the target */
  offset: Vec3;
  /** on wide screens, where the target sits: −1 left edge … 1 right edge */
  pan: number;
  opacity: number;
};

type Rng = () => number;

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Builder {
  private data: number[] = [];
  edges: number[] = [];

  constructor(
    readonly n: number,
    readonly rng: Rng,
  ) {}

  get count() {
    return this.data.length / 4;
  }

  get left() {
    return this.n - this.count;
  }

  add(x: number, y: number, z: number, flags = 0): number {
    if (this.count >= this.n) return -1;
    this.data.push(x, y, z, flags);
    return this.count - 1;
  }

  edge(a: number, b: number) {
    if (a >= 0 && b >= 0) this.edges.push(a, b);
  }

  chain(ids: number[], closed = false, every = 1) {
    for (let i = 0; i < ids.length - 1; i += every) this.edge(ids[i], ids[i + 1]);
    if (closed && ids.length > 2) this.edge(ids[ids.length - 1], ids[0]);
  }

  build(): BuiltState {
    // Any unused budget doubles up on existing structure so no node is orphaned.
    // Every state uses the same seed, so padding lands identically and never moves.
    const placed = this.count;
    while (this.count < this.n) {
      const src = Math.floor(this.rng() * placed) * 4;
      const j = () => (this.rng() - 0.5) * 0.04;
      this.data.push(this.data[src] + j(), this.data[src + 1] + j(), this.data[src + 2] + j(), this.data[src + 3]);
    }
    return { nodes: new Float32Array(this.data), edges: this.edges };
  }
}

/** Nodes spread along a polyline at a fixed density and chained into one line (or dashes). */
function trace(b: Builder, pts: Vec3[], density: number, flags = 0, closed = false): number[] {
  const ids: number[] = [];
  const all = closed ? [...pts, pts[0]] : pts;
  for (let i = 0; i < all.length - 1; i++) {
    const a = all[i];
    const c = all[i + 1];
    const n = Math.max(1, Math.round(Math.hypot(c[0] - a[0], c[1] - a[1], c[2] - a[2]) * density));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      ids.push(b.add(a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t, a[2] + (c[2] - a[2]) * t, flags));
    }
  }
  if (!closed) {
    const e = all[all.length - 1];
    ids.push(b.add(e[0], e[1], e[2], flags));
  }
  b.chain(ids, closed);
  return ids;
}

/** Points on a circular arc in the ground (xz) plane. */
function arc(c: Vec3, r: number, a0: number, a1: number, steps = 48): Vec3[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / steps;
    return [c[0] + Math.cos(a) * r, c[1], c[2] + Math.sin(a) * r] as Vec3;
  });
}

/* ── The pitch, to scale ── */

const PITCH_L = 5.4;
const PITCH_W = 3.5;
/** metres → world units */
const M = PITCH_L / 105;
const HX = PITCH_L / 2;
const HZ = PITCH_W / 2;
/** the ball and the goals are drawn larger than life so they read at a distance */
export const BALL_R = 0.12;
const GOAL = { half: 0.42, height: 0.26, depth: 0.26 };

function pitch(b: Builder, density: number) {
  trace(b, [[-HX, 0, -HZ], [HX, 0, -HZ], [HX, 0, HZ], [-HX, 0, HZ]], density, 0, true);
  trace(b, [[0, 0, -HZ], [0, 0, HZ]], density);
  trace(b, arc([0, 0, 0], 9.15 * M, 0, Math.PI * 2, 64), density);
  for (const side of [-1, 1]) {
    const gx = side * HX;
    const box = (depth: number, half: number) =>
      trace(b, [[gx, 0, -half], [gx - side * depth, 0, -half], [gx - side * depth, 0, half], [gx, 0, half]], density);
    box(16.5 * M, 20.15 * M);
    box(5.5 * M, 9.15 * M);
    const reach = Math.acos(5.5 / 9.15);
    const facing = side < 0 ? 0 : Math.PI;
    trace(b, arc([gx - side * 11 * M, 0, 0], 9.15 * M, facing - reach, facing + reach, 20), density);
  }
}

function goals(b: Builder, density: number, mesh: number) {
  const { half, height, depth } = GOAL;
  for (const side of [-1, 1]) {
    const gx = side * HX;
    const back = gx + side * depth;
    trace(b, [[gx, 0, -half], [gx, height, -half], [gx, height, half], [gx, 0, half]], density);
    trace(b, [[back, 0, -half], [back, height * 0.85, -half], [back, height * 0.85, half], [back, 0, half]], density * 0.6);
    // the net: verticals and horizontals across the back, joined to the frame
    const cols = Math.max(4, Math.round(10 * mesh));
    for (let i = 1; i < cols; i++) {
      const z = -half + (2 * half * i) / cols;
      trace(b, [[gx, height, z], [back, height * 0.85, z], [back, 0, z]], density * 0.5);
    }
  }
}

/** A 4-3-3 attacking left to right, in metres from the centre spot. */
const TEAM: [number, number][] = [
  [-47, 0],
  [-22, -25], [-25, -9], [-25, 9], [-22, 25],
  [-4, -16], [-8, 0], [-4, 16],
  [22, -23], [36, -3], [25, 21],
];

function team(b: Builder, nodes: number) {
  for (const [x, z] of TEAM) {
    const ids: number[] = [];
    for (let i = 0; i < nodes; i++) {
      const a = (i / nodes) * Math.PI * 2;
      ids.push(b.add(x * M + Math.cos(a) * 0.07, 0.01, z * M + Math.sin(a) * 0.07, FLAG.accent));
    }
    b.chain(ids, true);
  }
}

/* ── The ball: a truncated icosahedron pushed onto a sphere. Cream, so yellow stays with the team and the move. ── */

const BALL = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const verts: Vec3[] = [];
  const seen = new Set<string>();
  for (const [x, y, z] of [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, phi ** 3]] as Vec3[]) {
    for (const p of [[x, y, z], [z, x, y], [y, z, x]] as Vec3[])
      for (const sx of [1, -1])
        for (const sy of [1, -1])
          for (const sz of [1, -1]) {
            const v: Vec3 = [p[0] * sx, p[1] * sy, p[2] * sz];
            const key = v.map((q) => q.toFixed(4)).join();
            if (!seen.has(key)) {
              seen.add(key);
              verts.push(v);
            }
          }
  }
  const edges: { a: number; b: number }[] = [];
  for (let i = 0; i < verts.length; i++)
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.hypot(verts[i][0] - verts[j][0], verts[i][1] - verts[j][1], verts[i][2] - verts[j][2]);
      if (Math.abs(d - 2) < 1e-3) edges.push({ a: i, b: j });
    }
  return { verts, edges };
})();

function ball(b: Builder, c: Vec3, perEdge: number) {
  const on = (v: Vec3, flags: number) => {
    const l = Math.hypot(v[0], v[1], v[2]);
    return b.add(c[0] + (v[0] / l) * BALL_R, c[1] + (v[1] / l) * BALL_R, c[2] + (v[2] / l) * BALL_R, flags);
  };
  const vid = BALL.verts.map((v) => on(v, FLAG.ball));
  for (const e of BALL.edges) {
    const va = BALL.verts[e.a];
    const vb = BALL.verts[e.b];
    const ids: number[] = [];
    for (let k = 1; k <= perEdge; k++) {
      const t = k / (perEdge + 1);
      ids.push(on([va[0] + (vb[0] - va[0]) * t, va[1] + (vb[1] - va[1]) * t, va[2] + (vb[2] - va[2]) * t], FLAG.ball));
    }
    b.chain([vid[e.a], ...ids, vid[e.b]]);
  }
}

/* ── The move ── */

const atFeet = (i: number): Vec3 => [(TEAM[i][0] + 1.6) * M, BALL_R, TEAM[i][1] * M];

/** Kick-off, out to the left wing, across to the right, into the striker, then the net. */
const ROUTE: Vec3[] = [[0, BALL_R, 0], atFeet(8), atFeet(10), atFeet(9), [HX + GOAL.depth * 0.55, BALL_R, 0.12]];

/** Which point of the move each state shows. */
const STATE_ROUTE = [0, 1, 2, 3, 3, 3, 4];

function trail(b: Builder, upTo: number, ballAt: Vec3) {
  const path: Vec3[] = ROUTE.map((p, i) => [p[0], i === ROUTE.length - 1 ? p[1] : 0.012, p[2]]);
  const lengths = [0];
  for (let i = 1; i < path.length; i++)
    lengths.push(lengths[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][2] - path[i - 1][2]));
  const total = lengths[lengths.length - 1];
  const shown = lengths[upTo];
  const count = b.left;
  const ids: number[] = [];
  for (let k = 0; k < count; k++) {
    const s = (k / Math.max(1, count - 1)) * total;
    if (s > shown) {
      // not played yet: wait inside the ball, undrawn
      ids.push(b.add(ballAt[0], ballAt[1], ballAt[2], FLAG.accent + FLAG.hidden));
      continue;
    }
    let seg = 1;
    while (seg < lengths.length - 1 && lengths[seg] < s) seg++;
    const t = (s - lengths[seg - 1]) / (lengths[seg] - lengths[seg - 1] || 1);
    const p = path[seg - 1];
    const q = path[seg];
    ids.push(b.add(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t, FLAG.accent));
  }
  const visible = ids.filter((_, k) => (k / Math.max(1, count - 1)) * total <= shown);
  b.chain(visible, false, 2);
}

function play(stateIndex: number) {
  return (b: Builder) => {
    const k = b.n / 1800;
    pitch(b, 21 * k);
    goals(b, 24 * k, Math.sqrt(k));
    team(b, Math.max(8, Math.round(14 * k)));
    const at = ROUTE[STATE_ROUTE[stateIndex]];
    ball(b, at, k < 0.75 ? 1 : 3);
    trail(b, STATE_ROUTE[stateIndex], at);
  };
}

export const stateParams: StateParams[] = [
  // kick-off: low and close behind the ball, the pitch running away toward the far goal
  { name: "Kick-off", target: ROUTE[0], offset: [-0.78, 0.2, 0.3], pan: 0.28, opacity: 1 },
  { name: "Left wing", target: ROUTE[1], offset: [-2.1, 2.2, 2.5], pan: 0.45, opacity: 0.9 },
  { name: "Switch of play", target: ROUTE[2], offset: [-2.1, 2.2, -2.5], pan: -0.45, opacity: 0.9 },
  { name: "Into the striker", target: ROUTE[3], offset: [-2.2, 1.9, 2.3], pan: 0.45, opacity: 0.9 },
  { name: "Wide shot", target: [1, 0, 0], offset: [-0.6, 6.5, 3.6], pan: 0, opacity: 0.2 },
  { name: "Wide shot, reversed", target: [1.4, 0, 0], offset: [0.4, 6.2, -3.2], pan: 0, opacity: 0.18 },
  // the end: behind the goal, looking back up the pitch at the ball in the net
  { name: "Goal", target: [HX + 0.1, 0.12, 0], offset: [1.5, 0.5, 1.35], pan: 0.45, opacity: 0.6 },
];

export function buildStates(n: number, seed = 7): { states: BuiltState[]; ball: Vec3[] } {
  const states = stateParams.map((_, i) => {
    const b = new Builder(n, mulberry32(seed));
    play(i)(b);
    return b.build();
  });
  return { states, ball: STATE_ROUTE.map((r) => ROUTE[r]) };
}
