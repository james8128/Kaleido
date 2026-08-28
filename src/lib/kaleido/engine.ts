import type { ColorMode, KaleidoSettings } from "./types";
import { DEFAULT_COLOR_MODE, DEFAULT_SEGMENTS } from "./types";

const BG = "rgb(7, 8, 12)";
const SPRITE_SIZE = 64;
const HUE_STEPS = 36;

type Color = { h: number; s: number; l: number };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function sampleColor(
  mode: ColorMode,
  time: number,
  radius: number,
  angle: number,
  hueShift: number,
): Color {
  const turn = (angle + Math.PI) / (Math.PI * 2);
  switch (mode) {
    case "prism":
      return {
        h: (turn * 360 + time * 14 + hueShift + radius * 48) % 360,
        s: 84,
        l: 58,
      };
    case "ember":
      return {
        h: (10 + radius * 30 + Math.sin(angle * 4 + time) * 12 + hueShift * 0.12 + 360) % 360,
        s: 90,
        l: 52 + radius * 10,
      };
    case "tide":
      return {
        h: (188 + Math.sin(time * 0.45 + angle) * 24 + radius * 16 + hueShift * 0.2 + 360) % 360,
        s: 72,
        l: 54,
      };
    case "noir":
      return {
        h: 210,
        s: 6,
        l: 80 + Math.sin(angle * 6 + time * 0.3) * 8,
      };
    case "bloom":
      return {
        h: (332 + Math.sin(angle * 3 + time * 0.5) * 20 + radius * 18 + hueShift * 0.18 + 360) % 360,
        s: 68,
        l: 62,
      };
    case "forest":
      return {
        h: (132 + Math.sin(angle * 2 + time) * 26 + radius * 18 + hueShift * 0.16 + 360) % 360,
        s: 64,
        l: 48,
      };
  }
}

function makeGlowSprite(h: number, s: number, l: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SPRITE_SIZE;
  canvas.height = SPRITE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const g = ctx.createRadialGradient(
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    0,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
    SPRITE_SIZE / 2,
  );
  g.addColorStop(0, `hsla(${h} ${s}% ${Math.min(96, l + 18)}% / 0.95)`);
  g.addColorStop(0.18, `hsla(${h} ${s}% ${l}% / 0.55)`);
  g.addColorStop(0.42, `hsla(${h} ${s}% ${l}% / 0.16)`);
  g.addColorStop(1, `hsla(${h} ${s}% ${l}% / 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return canvas;
}

let spriteCache: HTMLCanvasElement[] | null = null;

function getSprites(): HTMLCanvasElement[] {
  if (spriteCache) return spriteCache;
  const list: HTMLCanvasElement[] = [];
  for (let i = 0; i < HUE_STEPS; i++) {
    list.push(makeGlowSprite(i * 10, 86, 58));
  }
  list.push(makeGlowSprite(210, 4, 92));
  spriteCache = list;
  return list;
}

function spriteFor(color: Color, sprites: HTMLCanvasElement[]): HTMLCanvasElement {
  if (color.s < 18) return sprites[HUE_STEPS] ?? sprites[0]!;
  const idx = ((Math.round(color.h / 10) % HUE_STEPS) + HUE_STEPS) % HUE_STEPS;
  return sprites[idx] ?? sprites[0]!;
}

export class KaleidoEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sprites: HTMLCanvasElement[];
  private w = 1;
  private h = 1;
  private dpr = 1;
  private time = 0;
  private hueShift = 24;
  private brush = 36;
  private segments = DEFAULT_SEGMENTS;
  private colorMode: ColorMode = DEFAULT_COLOR_MODE;
  private frozen = false;
  private pointerX = 0;
  private pointerY = 0;
  private hasPointer = false;
  private lastX = 0;
  private lastY = 0;
  private haveLast = false;
  private idleT = 0.6;
  private idleSpeed = 0.82;
  private gearR = 0.41;
  private gearD = 0.64;
  private seeded = false;
  private reducedMotion = false;
  private idleEnabled = true;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Canvas 2D is unavailable");
    this.canvas = canvas;
    this.ctx = ctx;
    this.sprites = getSprites();
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  setSettings(settings: KaleidoSettings) {
    this.segments = clamp(Math.round(settings.segments), 3, 20);
    this.colorMode = settings.colorMode;
    this.frozen = settings.frozen;
  }

  setPointer(canvasX: number, canvasY: number) {
    this.pointerX = canvasX;
    this.pointerY = canvasY;
    this.hasPointer = true;
    this.idleEnabled = true;
  }

  clearPointer() {
    this.hasPointer = false;
    this.haveLast = false;
  }

  resize(cssWidth: number, cssHeight: number, dpr: number) {
    const nextW = Math.max(1, Math.floor(cssWidth * dpr));
    const nextH = Math.max(1, Math.floor(cssHeight * dpr));
    if (nextW < 8 || nextH < 8) return;
    if (nextW === this.w && nextH === this.h && dpr === this.dpr) return;

    const prev = document.createElement("canvas");
    prev.width = this.canvas.width;
    prev.height = this.canvas.height;
    const prevCtx = prev.getContext("2d");
    if (prevCtx && this.canvas.width > 0 && this.canvas.height > 0) {
      prevCtx.drawImage(this.canvas, 0, 0);
    }

    this.dpr = dpr;
    this.w = nextW;
    this.h = nextH;
    this.canvas.width = nextW;
    this.canvas.height = nextH;
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
    this.ctx.fillStyle = BG;
    this.ctx.fillRect(0, 0, nextW, nextH);

    if (prev.width > 1 && prev.height > 1) {
      this.ctx.drawImage(
        prev,
        (nextW - prev.width) / 2,
        (nextH - prev.height) / 2,
      );
    }

    this.brush = Math.min(this.w, this.h) * 0.052;

    if (!this.seeded) {
      this.seeded = true;
      this.seedPattern();
    }
  }

  tick(dt: number) {
    if (this.frozen || this.w < 8) return;
    this.time += dt;
    this.fade(dt);
    if (this.hasPointer) {
      this.strokeTo(this.pointerX, this.pointerY);
    } else if (this.idleEnabled) {
      this.drawIdle(dt);
    }
  }

  clear() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = BG;
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.haveLast = false;
    this.hasPointer = false;
    this.idleEnabled = false;
  }

  randomizeVisuals() {
    this.idleEnabled = true;
    this.hueShift = Math.random() * 360;
    this.idleSpeed = 0.55 + Math.random() * 0.7;
    this.gearR = 0.34 + Math.random() * 0.18;
    this.gearD = 0.48 + Math.random() * 0.28;
    this.brush = Math.min(this.w, this.h) * (0.038 + Math.random() * 0.028);
    this.burst();
  }

  exportBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("無法匯出圖像"));
      }, "image/png");
    });
  }

  clientToCanvas(clientX: number, clientY: number, rect: DOMRect) {
    const x = ((clientX - rect.left) / rect.width) * this.w;
    const y = ((clientY - rect.top) / rect.height) * this.h;
    return { x, y };
  }

  destroy() {
    this.hasPointer = false;
  }

  private seedPattern() {
    const steps = this.reducedMotion ? 36 : 160;
    const dt = 1 / 60;
    for (let i = 0; i < steps; i++) {
      this.time += dt;
      this.fade(dt);
      this.drawIdle(dt);
    }
  }

  private fade(dt: number) {
    const alpha = Math.min(0.18, 0.034 * dt * 60);
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = `rgba(7, 8, 12, ${alpha})`;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  private drawIdle(dt: number) {
    this.idleT += dt * this.idleSpeed * (this.reducedMotion ? 0.45 : 1);
    const point = this.idlePoint(this.idleT);
    this.strokeTo(point.x, point.y);
  }

  private idlePoint(t: number) {
    const R = 1;
    const r = this.gearR;
    const d = this.gearD + Math.sin(t * 0.13) * 0.12;
    const k = (R - r) / r;
    const px = (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const py = (R - r) * Math.sin(t) - d * Math.sin(k * t);
    const scale = Math.min(this.w, this.h) * 0.3;
    return { x: this.w / 2 + px * scale, y: this.h / 2 + py * scale };
  }

  private strokeTo(x: number, y: number) {
    if (!this.haveLast) {
      this.stamp(x, y, 0);
      this.lastX = x;
      this.lastY = y;
      this.haveLast = true;
      return;
    }

    const dx = x - this.lastX;
    const dy = y - this.lastY;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.85) return;
    const step = Math.max(4, this.brush * 0.18);
    const count = Math.min(48, Math.max(1, Math.round(dist / step)));
    const speed = dist;

    for (let i = 1; i <= count; i++) {
      const t = i / count;
      this.stamp(this.lastX + dx * t, this.lastY + dy * t, speed);
    }

    this.lastX = x;
    this.lastY = y;
  }

  private stamp(x: number, y: number, speed: number) {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const dx = x - cx;
    const dy = y - cy;
    const radius = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const maxR = Math.hypot(cx, cy) || 1;
    const rNorm = clamp(radius / maxR, 0, 1);
    const color = sampleColor(this.colorMode, this.time, rNorm, angle, this.hueShift);
    const sprite = spriteFor(color, this.sprites);
    const size =
      this.brush *
      (0.55 + rNorm * 0.7) *
      (0.78 + Math.min(speed, 90) / 140);

    this.ctx.globalCompositeOperation = "lighter";
    this.ctx.globalAlpha = 0.92;

    const slice = (Math.PI * 2) / this.segments;
    for (let i = 0; i < this.segments; i++) {
      const rot = i * slice;
      this.blit(sprite, cx + radius * Math.cos(angle + rot), cy + radius * Math.sin(angle + rot), size);
      this.blit(sprite, cx + radius * Math.cos(-angle + rot), cy + radius * Math.sin(-angle + rot), size);
    }
  }

  private blit(sprite: HTMLCanvasElement, x: number, y: number, size: number) {
    const halo = size * 1.65;
    const core = size * 0.48;
    this.ctx.globalAlpha = 0.42;
    this.ctx.drawImage(sprite, x - halo / 2, y - halo / 2, halo, halo);
    this.ctx.globalAlpha = 0.95;
    this.ctx.drawImage(sprite, x - core / 2, y - core / 2, core, core);
  }

  private burst() {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const radius = Math.min(this.w, this.h) * 0.22;
    const count = 18;
    this.haveLast = false;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      this.stamp(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 24);
    }
    this.haveLast = false;
  }
}
