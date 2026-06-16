"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Product } from "@/types";

const COMPARE_KEY = "opura-compare-slots";
const MAX_COMPARE = 3;

type CompareSlots = (Product | null)[];

interface CompareContextValue {
  compareSlots: CompareSlots;
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  setCompareSlot: (index: number, product: Product | null) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareFull: boolean;
}

const emptySlots = (): CompareSlots => [null, null, null];

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareSlots, setCompareSlotsState] = useState<CompareSlots>(emptySlots);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      if (stored) {
        setCompareSlotsState(JSON.parse(stored) as CompareSlots);
      }
    } catch {
      setCompareSlotsState(emptySlots());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareSlots));
  }, [compareSlots, hydrated]);

  const compareList = useMemo(
    () => compareSlots.filter((p): p is Product => p !== null),
    [compareSlots],
  );

  const addToCompare = useCallback((product: Product): boolean => {
    let added = false;
    setCompareSlotsState((prev) => {
      if (prev.some((p) => p?.id === product.id)) return prev;
      const emptyIndex = prev.findIndex((p) => p === null);
      if (emptyIndex === -1) return prev;
      const next = [...prev];
      next[emptyIndex] = product;
      added = true;
      return next;
    });
    return added;
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareSlotsState((prev) => prev.map((p) => (p?.id === productId ? null : p)));
  }, []);

  const setCompareSlot = useCallback((index: number, product: Product | null) => {
    setCompareSlotsState((prev) => {
      const next = [...prev];
      next[index] = product;
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareSlotsState(emptySlots());
  }, []);

  const isInCompare = useCallback(
    (productId: string) => compareSlots.some((p) => p?.id === productId),
    [compareSlots],
  );

  const value = useMemo(
    () => ({
      compareSlots,
      compareList,
      addToCompare,
      removeFromCompare,
      setCompareSlot,
      clearCompare,
      isInCompare,
      isCompareFull: compareList.length >= MAX_COMPARE,
    }),
    [
      compareSlots,
      compareList,
      addToCompare,
      removeFromCompare,
      setCompareSlot,
      clearCompare,
      isInCompare,
    ],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
}
