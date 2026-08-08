import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* Scales a fixed-size design canvas (designW × designH) to fill whatever
   container renders it — the same trick as a real screenshot. The container's
   aspect ratio must match designW/designH for the canvas to fill it exactly. */
export function FitCanvas({
  designW,
  designH,
  children,
}: {
  designW: number;
  designH: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (el.clientWidth > 0) setScale(el.clientWidth / designW);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <div
        style={{
          width: designW,
          height: designH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
