import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const FONT_SCALE_MIN = 0.75;
export const FONT_SCALE_MAX = 1.5;
export const FONT_SCALE_STEP = 0.1;
const STORAGE_KEY = "font-scale";

interface FontSizeContextType {
  scale: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

function getInitialScale(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const val = parseFloat(stored);
      if (!isNaN(val) && val >= FONT_SCALE_MIN && val <= FONT_SCALE_MAX) {
        return val;
      }
    }
  } catch {
    // localStorage may be unavailable
  }
  return 1;
}

const BASE_FONT_SIZE = 14;

function applyScale(scale: number) {
  const px = Math.round(BASE_FONT_SIZE * scale * 100) / 100;
  document.documentElement.style.fontSize = `${px}px`;
}

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(getInitialScale);

  // Apply scale on mount and on change
  useEffect(() => {
    applyScale(scale);
    try {
      localStorage.setItem(STORAGE_KEY, String(scale));
    } catch {
      // ignore
    }
  }, [scale]);

  const increase = useCallback(() => {
    setScale((prev) => Math.min(prev + FONT_SCALE_STEP, FONT_SCALE_MAX));
  }, []);

  const decrease = useCallback(() => {
    setScale((prev) => Math.max(prev - FONT_SCALE_STEP, FONT_SCALE_MIN));
  }, []);

  const reset = useCallback(() => {
    setScale(1);
  }, []);

  return (
    <FontSizeContext.Provider value={{ scale, increase, decrease, reset }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within FontSizeProvider");
  }
  return context;
}
