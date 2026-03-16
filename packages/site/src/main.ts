import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { palette as defaultPalette, type PaletteKey } from "stilla-colors";
import { analyzePalette, type PaletteStats, type WcagLevel, type ApcaRating } from "./contrast";

// Monaco worker setup for Vite
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

type Palette = Record<PaletteKey, string>;
const currentPalette: Palette = { ...defaultPalette };

const strip = (hex: string) => hex.replace("#", "");

function buildMonacoTheme(p: Palette): monaco.editor.IStandaloneThemeData {
  return {
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "", foreground: strip(p.fg), background: strip(p.bg) },
      { token: "comment", foreground: strip(p.comment) },
      { token: "keyword", foreground: strip(p.steel) },
      { token: "storage", foreground: strip(p.steel) },
      { token: "string", foreground: strip(p.sage) },
      { token: "string.escape", foreground: strip(p.yellow) },
      { token: "number", foreground: strip(p.magenta) },
      { token: "type", foreground: strip(p.teal) },
      { token: "type.identifier", foreground: strip(p.teal) },
      { token: "identifier", foreground: strip(p.fg) },
      { token: "delimiter", foreground: strip(p.warmWhite) },
      { token: "delimiter.bracket", foreground: strip(p.warmWhite) },
      { token: "delimiter.parenthesis", foreground: strip(p.warmWhite) },
      { token: "delimiter.square", foreground: strip(p.warmWhite) },
      { token: "delimiter.angle", foreground: strip(p.warmWhite) },
      { token: "operator", foreground: strip(p.steel) },
      { token: "tag", foreground: strip(p.steel) },
      { token: "attribute.name", foreground: strip(p.teal) },
      { token: "attribute.value", foreground: strip(p.sage) },
      { token: "regexp", foreground: strip(p.yellow) },
      { token: "constant", foreground: strip(p.steel) },
      { token: "variable", foreground: strip(p.fg) },
      { token: "metatag", foreground: strip(p.navy) },
    ],
    colors: {
      "editor.background": p.bg,
      "editor.foreground": p.fg,
      "editor.lineHighlightBackground": p.bgAlt,
      "editor.selectionBackground": `${p.surface}cc`,
      "editorLineNumber.foreground": p.muted,
      "editorLineNumber.activeForeground": p.fg,
      "editorCursor.foreground": p.fg,
      "editorIndentGuide.background": p.surface,
      "editorIndentGuide.activeBackground": p.muted,
      "editorBracketMatch.background": p.bg,
      "editorBracketMatch.border": p.cyan,
      "editor.findMatchBackground": `${p.cyan}66`,
      "editor.findMatchHighlightBackground": `${p.cyan}33`,
      "editorWidget.background": p.bg,
      "editorWidget.border": p.bgAlt,
      "editorSuggestWidget.background": p.bg,
      "editorSuggestWidget.selectedBackground": p.surface,
      "editorHoverWidget.background": p.bgAlt,
      "editorHoverWidget.border": p.bgAlt,
      "minimap.background": p.bg,
      "scrollbar.shadow": "#00000066",
      "scrollbarSlider.background": `${p.surface}99`,
      "scrollbarSlider.hoverBackground": `${p.surface}bb`,
      "scrollbarSlider.activeBackground": `${p.surface}dd`,
    },
  };
}

const sampleCode = `import { createServer, type IncomingMessage } from "node:http";

interface ServerConfig {
  port: number;
  host: string;
  debug?: boolean;
}

/** Start the development server with the given configuration */
async function startServer(config: ServerConfig): Promise<void> {
  const { port, host, debug } = config;
  const startTime = Date.now();

  const handler = (req: IncomingMessage, res: any) => {
    const path = req.url ?? "/";

    if (path === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", uptime: Date.now() - startTime }));
      return;
    }

    if (debug) {
      console.log(\`[\${new Date().toISOString()}] \${req.method} \${path}\`);
    }

    res.writeHead(404);
    res.end("Not Found");
  };

  const server = createServer(handler);

  server.listen(port, host, () => {
    console.log(\`Server running at http://\${host}:\${port}\`);
  });
}

const defaultConfig: ServerConfig = {
  port: 3000,
  host: "localhost",
  debug: true,
};

// Start with default configuration
startServer(defaultConfig);
`;

const colorGroups: Array<{ name: string; keys: PaletteKey[] }> = [
  { name: "Backgrounds", keys: ["bg", "bgAlt", "surface"] },
  { name: "Text", keys: ["muted", "comment", "fg", "fgAlt", "white", "warmWhite"] },
  {
    name: "Accents",
    keys: ["teal", "cyan", "steel", "navy", "red", "orange", "yellow", "sage", "magenta", "deepTeal", "darkBlue", "khaki"],
  },
];

function updateChromeColors(p: Palette) {
  const root = document.documentElement;
  root.style.setProperty("--chrome-bg", p.bg);
  root.style.setProperty("--chrome-bg-alt", p.bgAlt);
  root.style.setProperty("--chrome-surface", p.surface);
  root.style.setProperty("--chrome-muted", p.muted);
  root.style.setProperty("--chrome-comment", p.comment);
  root.style.setProperty("--chrome-fg", p.fg);
  root.style.setProperty("--chrome-cyan", p.cyan);
}

// ---------------------------------------------------------------------------
// Contrast dashboard
// ---------------------------------------------------------------------------

const WCAG_COLORS: Record<WcagLevel, string> = {
  AAA: "#28c840",
  AA: "#88B6D0",
  "AA-large": "#E9B872",
  Fail: "#BA8082",
};

const APCA_COLORS: Record<ApcaRating, string> = {
  Best: "#28c840",
  Good: "#88B6D0",
  OK: "#E9B872",
  Min: "#D99962",
  Fail: "#BA8082",
};

function renderSummary(stats: PaletteStats) {
  const el = document.getElementById("contrast-summary");
  if (!el) return;

  const cards: Array<{ label: string; value: string; sub: string }> = [
    { label: "Avg WCAG Ratio", value: `${stats.avgWcag.toFixed(1)}:1`, sub: `Best ${stats.maxWcag.wcagRatio.toFixed(1)}:1 · Worst ${stats.minWcag.wcagRatio.toFixed(1)}:1` },
    { label: "Avg APCA |Lc|", value: Math.round(stats.avgApca).toString(), sub: `${stats.pairings.length} pairings analyzed` },
    { label: "WCAG AA+ Pass", value: `${stats.wcagAAA + stats.wcagAA}/${stats.pairings.length}`, sub: `AAA: ${stats.wcagAAA} · AA: ${stats.wcagAA}` },
    { label: "Needs Work", value: `${stats.wcagFail + stats.wcagAALarge}`, sub: `AA-large: ${stats.wcagAALarge} · Fail: ${stats.wcagFail}` },
  ];

  el.innerHTML = cards
    .map(
      (c) => `
    <div class="bg-stilla-bg rounded-lg px-4 py-3">
      <div class="text-xs uppercase tracking-wider text-stilla-comment mb-1">${c.label}</div>
      <div class="text-2xl font-semibold text-stilla-fg">${c.value}</div>
      <div class="text-xs text-stilla-muted mt-1">${c.sub}</div>
    </div>`,
    )
    .join("");
}

function badgeHtml(text: string, color: string): string {
  return `<span class="contrast-badge" style="--badge-color:${color}">${text}</span>`;
}

function renderTable(stats: PaletteStats) {
  const tbody = document.getElementById("contrast-tbody");
  if (!tbody) return;

  tbody.innerHTML = stats.pairings
    .map(
      (p) => `
    <tr class="border-t border-white/5">
      <td class="px-3 py-2 whitespace-nowrap">
        <span class="text-stilla-fg">${p.name}</span>
      </td>
      <td class="px-3 py-2">
        <span class="contrast-preview" style="color:${p.fg};background:${p.bg}">Aa</span>
      </td>
      <td class="px-3 py-2 text-right font-mono">${p.wcagRatio.toFixed(2)}</td>
      <td class="px-3 py-2 text-center">${badgeHtml(p.wcagGrade, WCAG_COLORS[p.wcagGrade])}</td>
      <td class="px-3 py-2 text-right font-mono">${p.apca.toFixed(1)}</td>
      <td class="px-3 py-2 text-center">${badgeHtml(p.apcaGrade, APCA_COLORS[p.apcaGrade])}</td>
    </tr>`,
    )
    .join("");
}

function updateDashboard() {
  const stats = analyzePalette(currentPalette);
  renderSummary(stats);
  renderTable(stats);
}

function applyTheme() {
  monaco.editor.defineTheme("stilla", buildMonacoTheme(currentPalette));
  monaco.editor.setTheme("stilla");
  updateChromeColors(currentPalette);
  updateDashboard();
}

function init() {
  monaco.editor.defineTheme("stilla", buildMonacoTheme(currentPalette));

  const container = document.getElementById("monaco-container");
  if (!container) return;

  monaco.editor.create(container, {
    value: sampleCode,
    language: "typescript",
    theme: "stilla",
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
    minimap: { enabled: false },
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    readOnly: true,
    automaticLayout: true,
    padding: { top: 12, bottom: 12 },
    renderLineHighlight: "line",
    bracketPairColorization: { enabled: true },
    guides: { indentation: true },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
  });

  const pickerContainer = document.getElementById("color-pickers");
  if (!pickerContainer) return;

  for (const group of colorGroups) {
    const section = document.createElement("div");
    section.className = "picker-group";

    const heading = document.createElement("h3");
    heading.textContent = group.name;
    section.appendChild(heading);

    for (const key of group.keys) {
      const row = document.createElement("div");
      row.className = "picker-row";

      const input = document.createElement("input");
      input.type = "color";
      input.value = currentPalette[key].toLowerCase();
      input.dataset.key = key;

      const label = document.createElement("label");
      const nameSpan = document.createElement("span");
      nameSpan.className = "color-name";
      nameSpan.textContent = key;
      const codeEl = document.createElement("code");
      codeEl.textContent = currentPalette[key];
      label.appendChild(nameSpan);
      label.appendChild(codeEl);

      input.addEventListener("input", () => {
        const colorKey = input.dataset.key as PaletteKey;
        currentPalette[colorKey] = input.value.toUpperCase();
        codeEl.textContent = input.value.toUpperCase();
        applyTheme();
      });

      row.appendChild(input);
      row.appendChild(label);
      section.appendChild(row);
    }

    pickerContainer.appendChild(section);
  }

  // Reset button
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    for (const key of Object.keys(defaultPalette) as PaletteKey[]) {
      currentPalette[key] = defaultPalette[key];
    }
    document.querySelectorAll<HTMLInputElement>('input[type="color"]').forEach((input) => {
      const key = input.dataset.key as PaletteKey;
      input.value = defaultPalette[key].toLowerCase();
      const code = input.closest(".picker-row")?.querySelector("code");
      if (code) code.textContent = defaultPalette[key];
    });
    applyTheme();
  });

  // Export button
  document.getElementById("export-btn")?.addEventListener("click", () => {
    const entries = Object.entries(currentPalette)
      .map(([k, v]) => `  ${k}: "${v}",`)
      .join("\n");
    const output = `export const palette = {\n${entries}\n} as const;\n`;
    navigator.clipboard.writeText(output);
    const btn = document.getElementById("export-btn");
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    }
  });

  updateChromeColors(currentPalette);
  updateDashboard();
}

init();
