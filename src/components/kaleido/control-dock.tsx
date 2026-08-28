import { Download, Pause, Play, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  COLOR_MODES,
  MAX_SEGMENTS,
  MIN_SEGMENTS,
  type ColorMode,
} from "@/lib/kaleido/types";
import { cn } from "@/lib/utils";

type ControlDockProps = {
  segments: number;
  colorMode: ColorMode;
  frozen: boolean;
  onSegments: (value: number) => void;
  onColorMode: (value: ColorMode) => void;
  onToggleFreeze: () => void;
  onRandomize: () => void;
  onExport: () => void;
  onClear: () => void;
};

export function ControlDock({
  segments,
  colorMode,
  frozen,
  onSegments,
  onColorMode,
  onToggleFreeze,
  onRandomize,
  onExport,
  onClear,
}: ControlDockProps) {
  return (
    <aside
      data-controls
      className="pointer-events-auto w-full max-w-3xl rounded-2xl bg-surface p-2 shadow-[var(--shadow-dock)]"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-bg px-3">
          <div className="flex shrink-0 items-baseline gap-2">
            <span className="text-xs font-medium tracking-wide text-muted">區段</span>
            <span className="font-display w-6 text-sm font-semibold tabular-nums text-fg">
              {segments}
            </span>
          </div>
          <Slider
            min={MIN_SEGMENTS}
            max={MAX_SEGMENTS}
            step={1}
            value={[segments]}
            onValueChange={(value) => {
              const next = value[0];
              if (typeof next === "number") onSegments(next);
            }}
            aria-label="對稱區段數量"
          />
        </div>

        <div
          className="flex flex-nowrap items-center justify-center gap-1 rounded-lg bg-bg px-1.5 py-1 md:gap-1.5 md:px-2 md:py-1.5"
          role="radiogroup"
          aria-label="顏色模式"
        >
          {COLOR_MODES.map((mode) => {
            const selected = mode.id === colorMode;
            return (
              <button
                key={mode.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={mode.label}
                title={mode.label}
                onClick={() => onColorMode(mode.id)}
                className={cn(
                  "relative size-9 rounded-full p-1 transition-[box-shadow,scale] duration-150 ease-out md:size-11 md:p-1.5",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "mode-swatch-selected"
                    : "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
                )}
              >
                <span
                  className={cn(
                    "block size-full rounded-full",
                    `mode-swatch-${mode.id}`,
                  )}
                />
                <span className="sr-only">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-1.5 md:flex md:shrink-0">
          <Button
            type="button"
            variant={frozen ? "pressed" : "secondary"}
            size="dock"
            aria-pressed={frozen}
            onClick={onToggleFreeze}
            className="flex-1 md:flex-none"
          >
            {frozen ? <Play /> : <Pause />}
            {frozen ? "繼續" : "凍結"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="dock"
            onClick={onRandomize}
            className="flex-1 md:flex-none"
          >
            <Shuffle />
            隨機
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="dock"
            onClick={onExport}
            className="flex-1 md:flex-none"
          >
            <Download />
            匯出
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="dock"
            onClick={onClear}
            className="flex-1 md:flex-none"
          >
            <RotateCcw />
            清除
          </Button>
        </div>
      </div>
    </aside>
  );
}
