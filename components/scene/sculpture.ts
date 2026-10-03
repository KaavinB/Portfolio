import * as THREE from "three";
import { BALL_R, buildStates, stateParams, type StateParams, type Vec3 } from "./states";

/**
 * The persistent drawing: one passage of play on one pitch. The point set and
 * line set are morphed on the GPU between states; page scroll picks the state
 * and the camera follows the ball. Nothing here touches React: the loop reads
 * cached layout and writes uniforms and styles.
 */

type Elements = {
  root: HTMLElement;
  host: HTMLElement;
  /** Called once the first frame is on screen, or straight away without WebGL. */
  onReady: () => void;
};

const MORPH = /* glsl */ `
  uniform highp sampler2D uPos;
  uniform float uState;
  uniform float uStates;
  uniform float uTime;
  uniform float uArc;
  uniform float uNoise;
  uniform vec2 uDepth;
  uniform float uOpacity;
  uniform vec3 uBall[STATES];
  uniform float uRoll;

  vec3 hash3(float s) {
    return fract(sin(vec3(s * 127.1, s * 311.7, s * 74.7)) * 43758.5453) - 0.5;
  }

  // flags = accent + 2 * ball + 4 * hidden
  void unpack(float w, out float accent, out float ball, out float hidden) {
    hidden = step(3.5, w);
    float rest = w - 4.0 * hidden;
    ball = step(1.5, rest);
    accent = rest - 2.0 * ball;
  }

  vec3 rotate(vec3 v, vec3 k, float a) {
    return v * cos(a) + cross(k, v) * sin(a) + k * dot(k, v) * (1.0 - cos(a));
  }

  // xyz position, w accent; visible is 0 for nodes of the move not yet played
  vec4 morph(float node, float seed, out float visible) {
    float s0 = floor(uState);
    float s1 = min(s0 + 1.0, uStates - 1.0);
    float f = uState - s0;
    int n = int(node + 0.5);
    vec4 a = texelFetch(uPos, ivec2(n, int(s0)), 0);
    vec4 b = texelFetch(uPos, ivec2(n, int(s1)), 0);
    float accA, ballA, hidA, accB, ballB, hidB;
    unpack(a.w, accA, ballA, hidA);
    unpack(b.w, accB, ballB, hidB);

    // the ball travels as one rigid object; everything else leaves at staggered times
    float smoothF = f * f * (3.0 - 2.0 * f);
    float t = clamp((f - seed * 0.45) / 0.55, 0.0, 1.0);
    t = mix(t * t * (3.0 - 2.0 * t), smoothF, ballA);

    vec3 p = mix(a.xyz, b.xyz, t);
    if (ballA > 0.5) {
      vec3 c = mix(uBall[int(s0)], uBall[int(s1)], t);
      p = c + rotate(p - c, normalize(vec3(0.25, 0.3, 1.0)), uRoll);
    } else {
      // only nodes that actually move between states arc on the way
      float moved = min(1.0, length(b.xyz - a.xyz));
      p += normalize(hash3(seed) + 0.001) * sin(t * 3.14159) * uArc * moved;
      p += uNoise * vec3(sin(uTime * 0.7 + seed * 40.0), cos(uTime * 0.6 + seed * 31.0), sin(uTime * 0.5 + seed * 23.0));
    }
    visible = mix(1.0 - hidA, 1.0 - hidB, t);
    return vec4(p, mix(accA, accB, t));
  }

  float depthFade(float z) {
    return 1.0 - smoothstep(uDepth.x, uDepth.y, z) * 0.85;
  }
`;

const POINTS_VERT = /* glsl */ `
  ${MORPH}
  uniform float uSize;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    float visible;
    vec4 m = morph(position.x, position.y, visible);
    vec4 mv = modelViewMatrix * vec4(m.xyz, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = depthFade(-mv.z) * uOpacity * visible;
    vAccent = m.w;
    // perspective size, clamped so the close kick-off shot doesn't turn dots into discs
    gl_PointSize = uSize * (1.0 + m.w * 0.5) * clamp(4.0 / -mv.z, 0.55, 1.9);
  }
`;

const POINTS_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, d);
    gl_FragColor = vec4(mix(uInk, uAccent, vAccent), edge * vAlpha * mix(0.8, 1.0, vAccent));
  }
`;

const LINES_VERT = /* glsl */ `
  ${MORPH}
  varying float vAlpha;
  varying float vAccent;
  void main() {
    float visible;
    vec4 m = morph(position.x, position.y, visible);
    vec4 mv = modelViewMatrix * vec4(m.xyz, 1.0);
    gl_Position = projectionMatrix * mv;
    // an edge belongs to one state and only exists near it
    float w = clamp(1.0 - abs(uState - position.z) * 1.6, 0.0, 1.0);
    vAlpha = w * w * depthFade(-mv.z) * uOpacity * visible;
    vAccent = m.w;
  }
`;

const LINES_FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    gl_FragColor = vec4(mix(uInk, uAccent, vAccent), vAlpha * mix(0.5, 0.85, vAccent));
  }
`;

type Anchor = { el: HTMLElement; index: number; start: number; end: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** The shaders write colour straight to the canvas, so they need sRGB values, not three's linear working space. */
function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback).convertLinearToSRGB();
}

function mixParams(a: StateParams, b: StateParams, t: number) {
  const v3 = (p: Vec3, q: Vec3): Vec3 => [lerp(p[0], q[0], t), lerp(p[1], q[1], t), lerp(p[2], q[2], t)];
  return {
    target: v3(a.target, b.target),
    offset: v3(a.offset, b.offset),
    pan: lerp(a.pan, b.pan, t),
    opacity: lerp(a.opacity, b.opacity, t),
  };
}

export function mountSculpture({ root, host, onReady }: Elements): () => void {
  const compact = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true, powerPreference: "high-performance" });
  } catch {
    root.dataset.webgl = "off";
    onReady();
    return () => {};
  }
  const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  /* ── data ── */
  const N = compact ? 900 : 1800;
  const { states, ball } = buildStates(N);
  const S = states.length;

  const tex = new Float32Array(N * S * 4);
  states.forEach((s, si) => tex.set(s.nodes, si * N * 4));
  const posTexture = new THREE.DataTexture(tex, N, S, THREE.RGBAFormat, THREE.FloatType);
  posTexture.minFilter = THREE.NearestFilter;
  posTexture.magFilter = THREE.NearestFilter;
  posTexture.needsUpdate = true;

  const rand = Math.random;
  const seeds = new Float32Array(N).map(() => rand());

  const pointAttr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) pointAttr.set([i, seeds[i], 0], i * 3);
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(pointAttr, 3));

  const edgeCount = states.reduce((s, st) => s + st.edges.length, 0);
  const lineAttr = new Float32Array(edgeCount * 3);
  let o = 0;
  states.forEach((st, si) => {
    for (const node of st.edges) {
      lineAttr[o++] = node;
      lineAttr[o++] = seeds[node];
      lineAttr[o++] = si;
    }
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(lineAttr, 3));

  const uniforms = {
    uPos: { value: posTexture },
    uState: { value: 0 },
    uStates: { value: S },
    uTime: { value: 0 },
    uArc: { value: compact ? 0.12 : 0.2 },
    uNoise: { value: reduced ? 0 : 0.004 },
    uDepth: { value: new THREE.Vector2(2, 8) },
    uOpacity: { value: 1 },
    uSize: { value: (compact ? 2.4 : 2.6) * dpr },
    uInk: { value: cssColor("--cream", "#f4f1e8") },
    uAccent: { value: cssColor("--yellow", "#f5c518") },
    uBall: { value: ball.map((b) => new THREE.Vector3(...b)) },
    uRoll: { value: 0 },
  };

  const shared = { uniforms, defines: { STATES: S }, transparent: true, depthTest: false, depthWrite: false };
  const pointMat = new THREE.ShaderMaterial({ ...shared, vertexShader: POINTS_VERT, fragmentShader: POINTS_FRAG });
  const lineMat = new THREE.ShaderMaterial({ ...shared, vertexShader: LINES_VERT, fragmentShader: LINES_FRAG });

  const points = new THREE.Points(pointGeo, pointMat);
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  // positions are node indices, not coordinates; bounds are meaningless
  points.frustumCulled = false;
  lines.frustumCulled = false;

  const scene = new THREE.Scene();
  scene.add(lines, points);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 100);

  /* ── layout ── */
  let width = 1;
  let height = 1;
  let vh = window.innerHeight;
  let anchors: Anchor[] = [];
  /** Rest areas: while one of these crosses the middle of the screen the drawing nearly disappears. */
  let quietZones: { top: number; bottom: number }[] = [];
  /** The missing dot of the "i" in the hero name: the ball sits here until it is played. */
  let ballAnchor: HTMLElement | null = null;

  const measure = () => {
    vh = window.innerHeight;
    const y = window.scrollY;
    anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")).map((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + y;
      const start = top - vh * 0.25;
      return { el, index: Number(el.dataset.scene), start, end: Math.max(start, top + r.height - vh * 0.75) };
    });
    ballAnchor = document.querySelector<HTMLElement>("[data-ball-anchor]");
    quietZones = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-quiet]")).map((el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top + y, bottom: r.bottom + y };
    });
  };

  const resize = () => {
    width = host.clientWidth || window.innerWidth;
    height = host.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    measure();
  };

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  ro.observe(document.body);
  resize();

  /** Scroll position → continuous state index. Each section holds its state while it fills the view. */
  const targetState = () => {
    if (!anchors.length) return 0;
    const y = window.scrollY;
    if (y <= anchors[0].end) return anchors[0].index;
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];
      if (y <= b.start) {
        if (y <= a.end) return a.index;
        const span = b.start - a.end;
        const t = span <= 0 ? 1 : clamp01((y - a.end) / span);
        return lerp(a.index, b.index, t);
      }
      if (y <= b.end) return b.index;
    }
    return anchors[anchors.length - 1].index;
  };

  /* ── input ── */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

  /* ── loop ── */
  let current = targetState();
  let roll = 0;
  let quiet = 0;
  let last = performance.now();
  let raf = 0;
  const target = new THREE.Vector3();
  const eye = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const camUp = new THREE.Vector3();
  const look = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    // damping converges for any step, so it uses real elapsed time; motion uses a capped step
    const elapsed = (now - last) / 1000;
    const dt = Math.min(0.05, elapsed);
    last = now;
    const time = now / 1000;

    const goal = targetState();
    const before = current;
    current = reduced ? Math.round(goal) : lerp(current, goal, 1 - Math.exp(-elapsed * 5));
    if (Math.abs(current - goal) < 1e-4) current = goal;

    const s0 = Math.floor(current);
    const s1 = Math.min(s0 + 1, S - 1);
    const p = mixParams(stateParams[s0], stateParams[s1], smooth(current - s0));

    // the ball idles slowly on the spot and rolls properly while it travels
    if (!reduced) roll += dt * 0.35 + Math.abs(current - before) * 9;

    const aspect = width / height;
    const wide = compact ? 0 : clamp01((aspect - 1.05) / 0.7);
    const reach = compact ? 1.35 : 1;
    // on small screens text always sits over the drawing, so everything past the hero is quieter
    const textHeavy = compact && current > 0.5 ? 0.6 : 1;

    pointer.x = lerp(pointer.x, pointer.tx, 1 - Math.exp(-elapsed * 3));
    pointer.y = lerp(pointer.y, pointer.ty, 1 - Math.exp(-elapsed * 3));

    target.set(...p.target);
    direction.set(...p.offset).normalize();
    let dist = Math.hypot(...p.offset) * reach;
    let panX = p.pan * wide;
    let panY = 0;

    // Hero: put the ball exactly on the dot of the "i", at the dot's size. As the first
    // state hands over to the next, this blends out and the ball is played away.
    const heroWeight = s0 === 0 ? 1 - smooth(current - s0) : 0;
    if (ballAnchor && heroWeight > 0) {
      const r = ballAnchor.getBoundingClientRect();
      const size = r.width * 1.15;
      if (size > 0) {
        const anchorDist = (BALL_R * height) / (size * Math.tan(halfFov));
        dist = lerp(dist, anchorDist, heroWeight);
        panX = lerp(panX, ((r.left + r.width / 2) / width) * 2 - 1, heroWeight);
        panY = lerp(panY, 1 - ((r.top + r.height / 2) / height) * 2, heroWeight);
      }
    }

    eye.copy(target).addScaledVector(direction, dist);
    // parallax scaled to the shot; off while the ball is pinned to the name
    const parallax = 1 - heroWeight;
    eye.x += pointer.x * dist * 0.06 * parallax;
    eye.y -= pointer.y * dist * 0.04 * parallax;

    // pan the camera so the target lands at (panX, panY) on screen rather than the centre
    forward.subVectors(target, eye).normalize();
    right.crossVectors(forward, up).normalize();
    camUp.crossVectors(right, forward).normalize();
    const panRight = panX * Math.tan(halfFov) * dist * aspect;
    const panUp = panY * Math.tan(halfFov) * dist;
    eye.addScaledVector(right, -panRight).addScaledVector(camUp, -panUp);
    look.copy(target).addScaledVector(right, -panRight).addScaledVector(camUp, -panUp);
    camera.position.copy(eye);
    camera.lookAt(look);

    uniforms.uDepth.value.set(dist - 0.6, dist + 6);
    uniforms.uState.value = current;
    uniforms.uTime.value = reduced ? 0 : time;
    uniforms.uRoll.value = roll;
    const centre = window.scrollY + vh * 0.5;
    const inQuiet = quietZones.some((z) => centre >= z.top && centre <= z.bottom);
    quiet = lerp(quiet, inQuiet ? 1 : 0, 1 - Math.exp(-elapsed * 4));
    uniforms.uOpacity.value = p.opacity * textHeavy * (1 - quiet * 0.88);

    renderer.render(scene, camera);
    // the fade-in waits for a drawn frame, so a slow download never pops in mid-fade
    if (!root.dataset.webgl) {
      root.dataset.webgl = "on";
      onReady();
    }
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    pointGeo.dispose();
    lineGeo.dispose();
    pointMat.dispose();
    lineMat.dispose();
    posTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    delete root.dataset.webgl;
  };
}
