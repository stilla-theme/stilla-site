// Abstract "code token" animation using the Stilla palette.
// Renders scrolling rows of rounded pill shapes that mimic syntax-highlighted
// code, drawn on a <canvas> element.

interface Pill {
  x: number;
  w: number;
  color: string;
}

interface Line {
  y: number;      // vertical center, in CSS pixels
  pills: Pill[];
  alpha: number;  // 0..1
}

// Stilla palette — actual hex values
const C = {
  bg:      "#0D0D0D",
  neutral: "#ADB2BA",
  comment: "#8C8C8C",
  dim:     "#4C566A",
  teal:    "#8FBCBB",
  cyan:    "#88B6D0",
  navy:    "#5E81AC",
  red:     "#BA8082",
  orange:  "#D99962",
  yellow:  "#E9B872",
  sage:    "#A19C9A",
  magenta: "#CD96B3",
  fg:      "#F2F2F2",
} as const;

// Weighted pool for mid-line tokens — neutral dominates, accents appear sparingly
const MID_POOL: string[] = [
  C.neutral, C.neutral, C.neutral, C.neutral, C.neutral,
  C.fg,      C.fg,      C.fg,
  C.comment, C.comment,
  C.teal,    C.teal,
  C.cyan,    C.cyan,
  C.sage,    C.sage,
  C.navy,
  C.orange,
  C.yellow,
  C.red,
  C.magenta,
  C.dim,
];

// First token on a line — biased toward "keyword-like" accent colors
const FIRST_POOL: string[] = [
  C.cyan,    C.cyan,
  C.teal,
  C.navy,
  C.orange,
  C.fg,      C.fg,
  C.neutral, C.neutral,
];

const PILL_H        = 7;    // pill height, px
const PILL_R        = 3.5;  // corner radius, px
const ROW_H         = 20;   // vertical spacing between line centers, px
const PAD_X         = 18;   // horizontal padding, px
const INDENT_W      = 14;   // width per indent level, px
const SCROLL_PPS    = 14;   // scroll speed, CSS px / second
const FADE_TOP_FRAC = 0.14; // top fraction of canvas where lines fade out

const INDENT_WEIGHTS = [0, 0, 0, 1, 1, 2, 2, 3];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function buildLine(cssW: number): Line {
  const pills: Pill[] = [];

  if (Math.random() >= 0.09) {          // ~9% chance of blank line
    const indent = pick(INDENT_WEIGHTS);
    let x = PAD_X + indent * INDENT_W;
    let first = true;

    while (x < cssW - PAD_X - 15) {
      const remaining = cssW - PAD_X - x;
      const maxW = Math.min(105, remaining - 4);
      if (maxW < 18) break;

      const w     = rand(18, maxW);
      const color = first ? pick(FIRST_POOL) : pick(MID_POOL);
      first = false;

      pills.push({ x, w, color });
      x += w + rand(3, 7);
    }
  }

  return { y: 0, pills, alpha: 0 };
}

export function initCodeAnimation(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let dpr  = 1;
  let cssW = 0;
  let cssH = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    cssW = rect.width;
    cssH = rect.height;
    dpr  = window.devicePixelRatio || 1;
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
  }

  resize();

  const lines: Line[] = [];

  function seed() {
    lines.length = 0;
    for (let y = ROW_H; y <= cssH + ROW_H; y += ROW_H) {
      const line = buildLine(cssW);
      line.y     = y;
      line.alpha = 1;
      lines.push(line);
    }
  }

  seed();

  let prevTs: number | null = null;
  let raf: number;

  function frame(ts: number) {
    const dt  = prevTs !== null ? Math.min((ts - prevTs) / 1000, 0.05) : 0;
    prevTs    = ts;
    const dy  = SCROLL_PPS * dt;
    const fadeH = cssH * FADE_TOP_FRAC;

    for (const line of lines) {
      line.y -= dy;

      // Fade in as lines enter from the bottom
      if (line.alpha < 1) line.alpha = Math.min(1, line.alpha + dt * 2.5);

      // Fade out as lines approach the top
      if (line.y < fadeH) line.alpha = Math.max(0, line.y / fadeH);
    }

    // Drop fully scrolled-off lines
    while (lines.length > 0 && lines[0].y < 0) lines.shift();

    // Append new lines at the bottom
    const lastY = lines.length > 0 ? lines[lines.length - 1].y : cssH;
    if (lastY < cssH + ROW_H * 0.5) {
      const line = buildLine(cssW);
      line.y     = lastY + ROW_H;
      lines.push(line);
    }

    // --- render ---
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, cssW, cssH);

    for (const line of lines) {
      if (line.alpha <= 0 || line.pills.length === 0) continue;
      ctx.globalAlpha = line.alpha;
      for (const pill of line.pills) {
        ctx.fillStyle = pill.color;
        ctx.beginPath();
        ctx.roundRect(pill.x, line.y - PILL_H / 2, pill.w, PILL_H, PILL_R);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    ctx.restore();

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  const ro = new ResizeObserver(() => {
    resize();
    seed();
  });
  ro.observe(canvas);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}
