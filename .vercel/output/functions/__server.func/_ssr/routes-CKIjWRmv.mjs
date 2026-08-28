import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Pause, i as Play, n as Shuffle, o as Download, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKIjWRmv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none select-none transition-[scale,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-subtle text-fg hover:bg-subtle/80",
			ghost: "text-muted hover:bg-subtle hover:text-fg",
			outline: "text-fg shadow-[var(--shadow-border)] hover:bg-subtle hover:shadow-[var(--shadow-border-hover)]",
			pressed: "bg-fg text-bg"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			dock: "h-11 min-w-11 px-3",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
});
Button.displayName = "Button";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex h-11 w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow,scale] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.96]" })]
}));
Slider.displayName = Slider$1.displayName;
var COLOR_MODES = [
	{
		id: "prism",
		label: "棱鏡"
	},
	{
		id: "ember",
		label: "燼火"
	},
	{
		id: "tide",
		label: "潮汐"
	},
	{
		id: "noir",
		label: "墨白"
	},
	{
		id: "bloom",
		label: "花開"
	},
	{
		id: "forest",
		label: "林間"
	}
];
var DEFAULT_COLOR_MODE = "prism";
var STORAGE_KEY = "kaleido-v1";
function isColorMode(value) {
	return COLOR_MODES.some((mode) => mode.id === value);
}
function ControlDock({ segments, colorMode, frozen, onSegments, onColorMode, onToggleFreeze, onRandomize, onExport, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		"data-controls": true,
		className: "pointer-events-auto w-full max-w-3xl rounded-2xl bg-surface p-2 shadow-[var(--shadow-dock)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-bg px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium tracking-wide text-muted",
							children: "區段"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display w-6 text-sm font-semibold tabular-nums text-fg",
							children: segments
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 3,
						max: 18,
						step: 1,
						value: [segments],
						onValueChange: (value) => {
							const next = value[0];
							if (typeof next === "number") onSegments(next);
						},
						"aria-label": "對稱區段數量"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-nowrap items-center justify-center gap-1 rounded-lg bg-bg px-1.5 py-1 md:gap-1.5 md:px-2 md:py-1.5",
					role: "radiogroup",
					"aria-label": "顏色模式",
					children: COLOR_MODES.map((mode) => {
						const selected = mode.id === colorMode;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "radio",
							"aria-checked": selected,
							"aria-label": mode.label,
							title: mode.label,
							onClick: () => onColorMode(mode.id),
							className: cn("relative size-9 rounded-full p-1 transition-[box-shadow,scale] duration-150 ease-out md:size-11 md:p-1.5", "focus-visible:ring-2 focus-visible:ring-ring", selected ? "mode-swatch-selected" : "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-full rounded-full", `mode-swatch-${mode.id}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: mode.label
							})]
						}, mode.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 gap-1.5 md:flex md:shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: frozen ? "pressed" : "secondary",
							size: "dock",
							"aria-pressed": frozen,
							onClick: onToggleFreeze,
							className: "flex-1 md:flex-none",
							children: [frozen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}), frozen ? "繼續" : "凍結"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							size: "dock",
							onClick: onRandomize,
							className: "flex-1 md:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, {}), "隨機"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							size: "dock",
							onClick: onExport,
							className: "flex-1 md:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "匯出"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "dock",
							onClick: onClear,
							className: "flex-1 md:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "清除"]
						})
					]
				})
			]
		})
	});
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 rounded-md bg-surface px-2.5 py-1.5 text-xs text-fg shadow-[var(--shadow-border)] origin-[var(--radix-tooltip-content-transform-origin)]", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var BG = "rgb(7, 8, 12)";
var SPRITE_SIZE = 64;
var HUE_STEPS = 36;
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function sampleColor(mode, time, radius, angle, hueShift) {
	const turn = (angle + Math.PI) / (Math.PI * 2);
	switch (mode) {
		case "prism": return {
			h: (turn * 360 + time * 14 + hueShift + radius * 48) % 360,
			s: 84,
			l: 58
		};
		case "ember": return {
			h: (10 + radius * 30 + Math.sin(angle * 4 + time) * 12 + hueShift * .12 + 360) % 360,
			s: 90,
			l: 52 + radius * 10
		};
		case "tide": return {
			h: (188 + Math.sin(time * .45 + angle) * 24 + radius * 16 + hueShift * .2 + 360) % 360,
			s: 72,
			l: 54
		};
		case "noir": return {
			h: 210,
			s: 6,
			l: 80 + Math.sin(angle * 6 + time * .3) * 8
		};
		case "bloom": return {
			h: (332 + Math.sin(angle * 3 + time * .5) * 20 + radius * 18 + hueShift * .18 + 360) % 360,
			s: 68,
			l: 62
		};
		case "forest": return {
			h: (132 + Math.sin(angle * 2 + time) * 26 + radius * 18 + hueShift * .16 + 360) % 360,
			s: 64,
			l: 48
		};
	}
}
function makeGlowSprite(h, s, l) {
	const canvas = document.createElement("canvas");
	canvas.width = SPRITE_SIZE;
	canvas.height = SPRITE_SIZE;
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas;
	const g = ctx.createRadialGradient(SPRITE_SIZE / 2, SPRITE_SIZE / 2, 0, SPRITE_SIZE / 2, SPRITE_SIZE / 2, SPRITE_SIZE / 2);
	g.addColorStop(0, `hsla(${h} ${s}% ${Math.min(96, l + 18)}% / 0.95)`);
	g.addColorStop(.18, `hsla(${h} ${s}% ${l}% / 0.55)`);
	g.addColorStop(.42, `hsla(${h} ${s}% ${l}% / 0.16)`);
	g.addColorStop(1, `hsla(${h} ${s}% ${l}% / 0)`);
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
	return canvas;
}
var spriteCache = null;
function getSprites() {
	if (spriteCache) return spriteCache;
	const list = [];
	for (let i = 0; i < HUE_STEPS; i++) list.push(makeGlowSprite(i * 10, 86, 58));
	list.push(makeGlowSprite(210, 4, 92));
	spriteCache = list;
	return list;
}
function spriteFor(color, sprites) {
	if (color.s < 18) return sprites[HUE_STEPS] ?? sprites[0];
	return sprites[(Math.round(color.h / 10) % HUE_STEPS + HUE_STEPS) % HUE_STEPS] ?? sprites[0];
}
var KaleidoEngine = class {
	canvas;
	ctx;
	sprites;
	w = 1;
	h = 1;
	dpr = 1;
	time = 0;
	hueShift = 24;
	brush = 36;
	segments = 8;
	colorMode = DEFAULT_COLOR_MODE;
	frozen = false;
	pointerX = 0;
	pointerY = 0;
	hasPointer = false;
	lastX = 0;
	lastY = 0;
	haveLast = false;
	idleT = .6;
	idleSpeed = .82;
	gearR = .41;
	gearD = .64;
	seeded = false;
	reducedMotion = false;
	idleEnabled = true;
	constructor(canvas) {
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) throw new Error("Canvas 2D is unavailable");
		this.canvas = canvas;
		this.ctx = ctx;
		this.sprites = getSprites();
		this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		this.ctx.imageSmoothingEnabled = true;
		this.ctx.imageSmoothingQuality = "high";
	}
	setSettings(settings) {
		this.segments = clamp(Math.round(settings.segments), 3, 20);
		this.colorMode = settings.colorMode;
		this.frozen = settings.frozen;
	}
	setPointer(canvasX, canvasY) {
		this.pointerX = canvasX;
		this.pointerY = canvasY;
		this.hasPointer = true;
		this.idleEnabled = true;
	}
	clearPointer() {
		this.hasPointer = false;
		this.haveLast = false;
	}
	resize(cssWidth, cssHeight, dpr) {
		const nextW = Math.max(1, Math.floor(cssWidth * dpr));
		const nextH = Math.max(1, Math.floor(cssHeight * dpr));
		if (nextW < 8 || nextH < 8) return;
		if (nextW === this.w && nextH === this.h && dpr === this.dpr) return;
		const prev = document.createElement("canvas");
		prev.width = this.canvas.width;
		prev.height = this.canvas.height;
		const prevCtx = prev.getContext("2d");
		if (prevCtx && this.canvas.width > 0 && this.canvas.height > 0) prevCtx.drawImage(this.canvas, 0, 0);
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
		if (prev.width > 1 && prev.height > 1) this.ctx.drawImage(prev, (nextW - prev.width) / 2, (nextH - prev.height) / 2);
		this.brush = Math.min(this.w, this.h) * .052;
		if (!this.seeded) {
			this.seeded = true;
			this.seedPattern();
		}
	}
	tick(dt) {
		if (this.frozen || this.w < 8) return;
		this.time += dt;
		this.fade(dt);
		if (this.hasPointer) this.strokeTo(this.pointerX, this.pointerY);
		else if (this.idleEnabled) this.drawIdle(dt);
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
		this.idleSpeed = .55 + Math.random() * .7;
		this.gearR = .34 + Math.random() * .18;
		this.gearD = .48 + Math.random() * .28;
		this.brush = Math.min(this.w, this.h) * (.038 + Math.random() * .028);
		this.burst();
	}
	exportBlob() {
		return new Promise((resolve, reject) => {
			this.canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(/* @__PURE__ */ new Error("無法匯出圖像"));
			}, "image/png");
		});
	}
	clientToCanvas(clientX, clientY, rect) {
		return {
			x: (clientX - rect.left) / rect.width * this.w,
			y: (clientY - rect.top) / rect.height * this.h
		};
	}
	destroy() {
		this.hasPointer = false;
	}
	seedPattern() {
		const steps = this.reducedMotion ? 36 : 160;
		const dt = 1 / 60;
		for (let i = 0; i < steps; i++) {
			this.time += dt;
			this.fade(dt);
			this.drawIdle(dt);
		}
	}
	fade(dt) {
		const alpha = Math.min(.18, .034 * dt * 60);
		this.ctx.globalCompositeOperation = "source-over";
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = `rgba(7, 8, 12, ${alpha})`;
		this.ctx.fillRect(0, 0, this.w, this.h);
	}
	drawIdle(dt) {
		this.idleT += dt * this.idleSpeed * (this.reducedMotion ? .45 : 1);
		const point = this.idlePoint(this.idleT);
		this.strokeTo(point.x, point.y);
	}
	idlePoint(t) {
		const R = 1;
		const r = this.gearR;
		const d = this.gearD + Math.sin(t * .13) * .12;
		const k = (R - r) / r;
		const px = (R - r) * Math.cos(t) + d * Math.cos(k * t);
		const py = (R - r) * Math.sin(t) - d * Math.sin(k * t);
		const scale = Math.min(this.w, this.h) * .3;
		return {
			x: this.w / 2 + px * scale,
			y: this.h / 2 + py * scale
		};
	}
	strokeTo(x, y) {
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
		if (dist < .85) return;
		const step = Math.max(4, this.brush * .18);
		const count = Math.min(48, Math.max(1, Math.round(dist / step)));
		const speed = dist;
		for (let i = 1; i <= count; i++) {
			const t = i / count;
			this.stamp(this.lastX + dx * t, this.lastY + dy * t, speed);
		}
		this.lastX = x;
		this.lastY = y;
	}
	stamp(x, y, speed) {
		const cx = this.w / 2;
		const cy = this.h / 2;
		const dx = x - cx;
		const dy = y - cy;
		const radius = Math.hypot(dx, dy);
		const angle = Math.atan2(dy, dx);
		const rNorm = clamp(radius / (Math.hypot(cx, cy) || 1), 0, 1);
		const sprite = spriteFor(sampleColor(this.colorMode, this.time, rNorm, angle, this.hueShift), this.sprites);
		const size = this.brush * (.55 + rNorm * .7) * (.78 + Math.min(speed, 90) / 140);
		this.ctx.globalCompositeOperation = "lighter";
		this.ctx.globalAlpha = .92;
		const slice = Math.PI * 2 / this.segments;
		for (let i = 0; i < this.segments; i++) {
			const rot = i * slice;
			this.blit(sprite, cx + radius * Math.cos(angle + rot), cy + radius * Math.sin(angle + rot), size);
			this.blit(sprite, cx + radius * Math.cos(-angle + rot), cy + radius * Math.sin(-angle + rot), size);
		}
	}
	blit(sprite, x, y, size) {
		const halo = size * 1.65;
		const core = size * .48;
		this.ctx.globalAlpha = .42;
		this.ctx.drawImage(sprite, x - halo / 2, y - halo / 2, halo, halo);
		this.ctx.globalAlpha = .95;
		this.ctx.drawImage(sprite, x - core / 2, y - core / 2, core, core);
	}
	burst() {
		const cx = this.w / 2;
		const cy = this.h / 2;
		const radius = Math.min(this.w, this.h) * .22;
		const count = 18;
		this.haveLast = false;
		for (let i = 0; i < count; i++) {
			const a = i / count * Math.PI * 2;
			this.stamp(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 24);
		}
		this.haveLast = false;
	}
};
function loadSettings() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		return {
			segments: typeof data.segments === "number" ? Math.min(18, Math.max(3, Math.round(data.segments))) : 8,
			colorMode: isColorMode(data.colorMode) ? data.colorMode : DEFAULT_COLOR_MODE
		};
	} catch {
		return null;
	}
}
function isControlTarget(target) {
	return target instanceof Element && Boolean(target.closest("[data-controls]"));
}
function timestampName() {
	const d = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	return `kaleido-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
}
function KaleidoApp() {
	const stageRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const drawingRef = (0, import_react.useRef)(false);
	const [segments, setSegments] = (0, import_react.useState)(8);
	const [colorMode, setColorMode] = (0, import_react.useState)(DEFAULT_COLOR_MODE);
	const [frozen, setFrozen] = (0, import_react.useState)(false);
	const [interacted, setInteracted] = (0, import_react.useState)(false);
	const [modeLabel, setModeLabel] = (0, import_react.useState)("棱鏡");
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadSettings();
		if (saved) {
			setSegments(saved.segments);
			setColorMode(saved.colorMode);
		}
		setHydrated(true);
		const timer = window.setTimeout(() => setInteracted(true), 4200);
		return () => window.clearTimeout(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			v: 1,
			segments,
			colorMode
		}));
	}, [
		hydrated,
		segments,
		colorMode
	]);
	(0, import_react.useEffect)(() => {
		const found = COLOR_MODES.find((mode) => mode.id === colorMode);
		setModeLabel(found?.label ?? "棱鏡");
	}, [colorMode]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setSettings({
			segments,
			colorMode,
			frozen
		});
	}, [
		segments,
		colorMode,
		frozen
	]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const stage = stageRef.current;
		if (!canvas || !stage) return;
		const engine = new KaleidoEngine(canvas);
		engine.setSettings({
			segments,
			colorMode,
			frozen
		});
		engineRef.current = engine;
		const fit = () => {
			const rect = stage.getBoundingClientRect();
			engine.resize(rect.width, rect.height, Math.min(window.devicePixelRatio || 1, 2));
		};
		fit();
		const ro = new ResizeObserver(fit);
		ro.observe(stage);
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min((now - last) / 1e3, .1);
			last = now;
			engine.tick(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			engine.destroy();
			engineRef.current = null;
		};
	}, []);
	const markInteracted = (0, import_react.useCallback)(() => {
		setInteracted(true);
	}, []);
	const applyPointer = (0, import_react.useCallback)((event) => {
		const engine = engineRef.current;
		const canvas = canvasRef.current;
		if (!engine || !canvas) return;
		const rect = canvas.getBoundingClientRect();
		const { x, y } = engine.clientToCanvas(event.clientX, event.clientY, rect);
		engine.setPointer(x, y);
	}, []);
	(0, import_react.useEffect)(() => {
		const onMove = (event) => {
			if (isControlTarget(event.target)) {
				engineRef.current?.clearPointer();
				return;
			}
			if (event.pointerType === "touch" && !drawingRef.current) return;
			applyPointer(event);
			markInteracted();
		};
		const onDown = (event) => {
			if (isControlTarget(event.target)) return;
			drawingRef.current = true;
			applyPointer(event);
			markInteracted();
		};
		const onUp = (event) => {
			drawingRef.current = false;
			if (event.pointerType === "touch") engineRef.current?.clearPointer();
		};
		const onLeave = () => {
			drawingRef.current = false;
			engineRef.current?.clearPointer();
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerdown", onDown, { passive: true });
		window.addEventListener("pointerup", onUp, { passive: true });
		window.addEventListener("pointercancel", onUp, { passive: true });
		window.addEventListener("blur", onLeave);
		document.addEventListener("mouseleave", onLeave);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
			window.removeEventListener("blur", onLeave);
			document.removeEventListener("mouseleave", onLeave);
		};
	}, [applyPointer, markInteracted]);
	const toggleFreeze = (0, import_react.useCallback)(() => {
		setFrozen((value) => !value);
		markInteracted();
	}, [markInteracted]);
	const randomize = (0, import_react.useCallback)(() => {
		const nextSegments = 3 + Math.floor(Math.random() * 16);
		const nextMode = COLOR_MODES[Math.floor(Math.random() * COLOR_MODES.length)]?.id ?? "prism";
		setSegments(nextSegments);
		setColorMode(nextMode);
		setFrozen(false);
		engineRef.current?.setSettings({
			segments: nextSegments,
			colorMode: nextMode,
			frozen: false
		});
		engineRef.current?.randomizeVisuals();
		markInteracted();
	}, [markInteracted]);
	const clear = (0, import_react.useCallback)(() => {
		engineRef.current?.clear();
		markInteracted();
	}, [markInteracted]);
	const exportImage = (0, import_react.useCallback)(async () => {
		const engine = engineRef.current;
		if (!engine) return;
		try {
			const blob = await engine.exportBlob();
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = timestampName();
			link.click();
			URL.revokeObjectURL(url);
			toast.success("圖像已匯出");
		} catch {
			toast.error("匯出失敗，請再試一次");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			switch (event.code) {
				case "Space":
					event.preventDefault();
					toggleFreeze();
					break;
				case "KeyR":
					event.preventDefault();
					randomize();
					break;
				case "KeyE":
					event.preventDefault();
					exportImage();
					break;
				case "KeyC":
					event.preventDefault();
					clear();
					break;
				case "ArrowLeft":
				case "Minus":
					event.preventDefault();
					setSegments((n) => Math.max(3, n - 1));
					break;
				case "ArrowRight":
				case "Equal":
					event.preventDefault();
					setSegments((n) => Math.min(18, n + 1));
					break;
				default: {
					const mode = COLOR_MODES[Number(event.key) - 1];
					if (mode) setColorMode(mode.id);
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		clear,
		exportImage,
		randomize,
		toggleFreeze
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 80,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative isolate min-h-dvh overflow-hidden bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: stageRef,
					className: "absolute inset-0 touch-none",
					style: { touchAction: "none" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "block size-full cursor-none",
						"aria-label": "萬花筒畫布"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "kaleido-vignette pointer-events-none absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "pointer-events-none absolute top-0 left-0 z-10 p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold tracking-tight text-fg md:text-xl",
						children: "Kaleido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted",
						children: "萬花筒"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium tracking-wide text-fg shadow-[var(--shadow-border)] transition-[opacity,transform] duration-150 ease-out", frozen ? "opacity-100" : "opacity-0 -translate-y-1"),
					"aria-live": "polite",
					children: "畫面已凍結"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "kaleido-hint pointer-events-none absolute inset-x-0 bottom-36 z-10 flex justify-center px-6 md:bottom-28",
					"data-hidden": interacted || frozen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-full bg-surface/90 px-4 py-2 text-sm text-fg shadow-[var(--shadow-border)]",
						children: "移動指標或滑動手指"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "kaleido-dock-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-3 md:px-6 md:pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlDock, {
						segments,
						colorMode,
						frozen,
						onSegments: setSegments,
						onColorMode: setColorMode,
						onToggleFreeze: toggleFreeze,
						onRandomize: randomize,
						onExport: () => void exportImage(),
						onClear: clear
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pointer-events-none absolute top-5 right-4 hidden text-xs text-faint md:block",
					children: [modeLabel, " · 空白鍵凍結"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { className: "font-sans" }
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KaleidoApp, {});
}
//#endregion
export { Home as component };
