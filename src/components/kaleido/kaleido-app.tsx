import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { ControlDock } from "@/components/kaleido/control-dock";
import { TooltipProvider } from "@/components/ui/tooltip";
import { KaleidoEngine } from "@/lib/kaleido/engine";
import {
  COLOR_MODES,
  DEFAULT_COLOR_MODE,
  DEFAULT_SEGMENTS,
  MAX_SEGMENTS,
  MIN_SEGMENTS,
  STORAGE_KEY,
  isColorMode,
  type ColorMode,
} from "@/lib/kaleido/types";
import { cn } from "@/lib/utils";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { segments?: unknown; colorMode?: unknown };
    const segments =
      typeof data.segments === "number"
        ? Math.min(MAX_SEGMENTS, Math.max(MIN_SEGMENTS, Math.round(data.segments)))
        : DEFAULT_SEGMENTS;
    const colorMode = isColorMode(data.colorMode) ? data.colorMode : DEFAULT_COLOR_MODE;
    return { segments, colorMode };
  } catch {
    return null;
  }
}

function isControlTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-controls]"));
}

function timestampName() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `kaleido-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
}

export function KaleidoApp() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<KaleidoEngine | null>(null);
  const drawingRef = useRef(false);
  const [segments, setSegments] = useState(DEFAULT_SEGMENTS);
  const [colorMode, setColorMode] = useState<ColorMode>(DEFAULT_COLOR_MODE);
  const [frozen, setFrozen] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [modeLabel, setModeLabel] = useState("棱鏡");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadSettings();
    if (saved) {
      setSegments(saved.segments);
      setColorMode(saved.colorMode);
    }
    setHydrated(true);
    const timer = window.setTimeout(() => setInteracted(true), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, segments, colorMode }));
  }, [hydrated, segments, colorMode]);

  useEffect(() => {
    const found = COLOR_MODES.find((mode) => mode.id === colorMode);
    setModeLabel(found?.label ?? "棱鏡");
  }, [colorMode]);

  useEffect(() => {
    engineRef.current?.setSettings({ segments, colorMode, frozen });
  }, [segments, colorMode, frozen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const engine = new KaleidoEngine(canvas);
    engine.setSettings({ segments, colorMode, frozen });
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
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
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
    // Mount-only: settings sync via the effect above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markInteracted = useCallback(() => {
    setInteracted(true);
  }, []);

  const applyPointer = useCallback((event: PointerEvent) => {
    const engine = engineRef.current;
    const canvas = canvasRef.current;
    if (!engine || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { x, y } = engine.clientToCanvas(event.clientX, event.clientY, rect);
    engine.setPointer(x, y);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (isControlTarget(event.target)) {
        engineRef.current?.clearPointer();
        return;
      }
      if (event.pointerType === "touch" && !drawingRef.current) return;
      applyPointer(event);
      markInteracted();
    };
    const onDown = (event: PointerEvent) => {
      if (isControlTarget(event.target)) return;
      drawingRef.current = true;
      applyPointer(event);
      markInteracted();
    };
    const onUp = (event: PointerEvent) => {
      drawingRef.current = false;
      if (event.pointerType === "touch") {
        engineRef.current?.clearPointer();
      }
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

  const toggleFreeze = useCallback(() => {
    setFrozen((value) => !value);
    markInteracted();
  }, [markInteracted]);

  const randomize = useCallback(() => {
    const nextSegments = MIN_SEGMENTS + Math.floor(Math.random() * (MAX_SEGMENTS - MIN_SEGMENTS + 1));
    const nextMode = COLOR_MODES[Math.floor(Math.random() * COLOR_MODES.length)]?.id ?? "prism";
    setSegments(nextSegments);
    setColorMode(nextMode);
    setFrozen(false);
    engineRef.current?.setSettings({
      segments: nextSegments,
      colorMode: nextMode,
      frozen: false,
    });
    engineRef.current?.randomizeVisuals();
    markInteracted();
  }, [markInteracted]);

  const clear = useCallback(() => {
    engineRef.current?.clear();
    markInteracted();
  }, [markInteracted]);

  const exportImage = useCallback(async () => {
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
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
          void exportImage();
          break;
        case "KeyC":
          event.preventDefault();
          clear();
          break;
        case "ArrowLeft":
        case "Minus":
          event.preventDefault();
          setSegments((n) => Math.max(MIN_SEGMENTS, n - 1));
          break;
        case "ArrowRight":
        case "Equal":
          event.preventDefault();
          setSegments((n) => Math.min(MAX_SEGMENTS, n + 1));
          break;
        default: {
          const index = Number(event.key) - 1;
          const mode = COLOR_MODES[index];
          if (mode) setColorMode(mode.id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clear, exportImage, randomize, toggleFreeze]);

  return (
    <TooltipProvider delayDuration={80}>
      <div className="relative isolate min-h-dvh overflow-hidden bg-bg text-fg">
        <div
          ref={stageRef}
          className="absolute inset-0 touch-none"
          style={{ touchAction: "none" }}
        >
          <canvas
            ref={canvasRef}
            className="block size-full cursor-none"
            aria-label="萬花筒畫布"
          />
        </div>

        <div className="kaleido-vignette pointer-events-none absolute inset-0" />

        <header className="pointer-events-none absolute top-0 left-0 z-10 p-4 md:p-6">
          <p className="font-display text-lg font-semibold tracking-tight text-fg md:text-xl">
            Kaleido
          </p>
          <p className="text-xs tracking-wide text-muted">萬花筒</p>
        </header>

        <div
          className={cn(
            "pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium tracking-wide text-fg shadow-[var(--shadow-border)] transition-[opacity,transform] duration-150 ease-out",
            frozen ? "opacity-100" : "opacity-0 -translate-y-1",
          )}
          aria-live="polite"
        >
          畫面已凍結
        </div>

        <div
          className="kaleido-hint pointer-events-none absolute inset-x-0 bottom-36 z-10 flex justify-center px-6 md:bottom-28"
          data-hidden={interacted || frozen}
        >
          <p className="rounded-full bg-surface/90 px-4 py-2 text-sm text-fg shadow-[var(--shadow-border)]">
            移動指標或滑動手指
          </p>
        </div>

        <div className="kaleido-dock-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-3 md:px-6 md:pb-6">
          <ControlDock
            segments={segments}
            colorMode={colorMode}
            frozen={frozen}
            onSegments={setSegments}
            onColorMode={setColorMode}
            onToggleFreeze={toggleFreeze}
            onRandomize={randomize}
            onExport={() => void exportImage()}
            onClear={clear}
          />
        </div>

        <p className="pointer-events-none absolute top-5 right-4 hidden text-xs text-faint md:block">
          {modeLabel} · 空白鍵凍結
        </p>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{ className: "font-sans" }}
        />
      </div>
    </TooltipProvider>
  );
}
