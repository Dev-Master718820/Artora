"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DemoState, CommissionDraft } from "@/types";
export const initialDraft: CommissionDraft = {
  subject: "Landscape",
  description: "",
  instructions: "",
  style: "Impressionist",
  medium: "Oil Painting",
  size: "24 × 18 inches",
  color: "#cb6547",
  budget: 600,
  deadline: "2026-12-20",
  artist: "",
};
const initial: DemoState = {
  favorites: [],
  follows: [],
  likes: [],
  saved: [],
  cart: [],
  comments: [],
  posts: [],
  annotations: [],
  commission: initialDraft,
  bookings: [],
  orders: [],
};
type ToggleKey = "favorites" | "follows" | "likes" | "saved";
interface DemoContextValue {
  state: DemoState;
  ready: boolean;
  update: (fn: (s: DemoState) => DemoState) => void;
  toggle: (key: ToggleKey, id: string) => void;
  addToCart: (slug: string) => void;
  toast: (message: string) => void;
  notice: string;
}
const DemoContext = createContext<DemoContextValue | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    try {
      const value = localStorage.getItem("artora-demo-v1");
      if (value) {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object") {
          const next = { ...initial };
          for (const key of Object.keys(initial) as (keyof DemoState)[]) {
            if (key === "commission") {
              next.commission = { ...initialDraft, ...parsed.commission };
            } else if (Array.isArray(parsed[key])) {
              (next[key] as unknown[]) = parsed[key];
            }
          }
          setState(next);
        }
      }
    } catch {}
    setReady(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(
          "artora-demo-v1",
          JSON.stringify({
            ...state,
            posts: state.posts.map((p) => ({
              ...p,
              image: p.sessionImage ? "" : p.image,
            })),
          }),
        );
      } catch {
        setNotice(
          "Browser storage is full or unavailable. Changes are kept for this session.",
        );
      }
  }, [state, ready]);
  const toast = (message: string) => {
    setNotice(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 4500);
  };
  const toggle = (key: ToggleKey, id: string) =>
    setState((s) => ({
      ...s,
      [key]: s[key].includes(id)
        ? s[key].filter((x) => x !== id)
        : [...s[key], id],
    }));
  const addToCart = (slug: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.some((i) => i.slug === slug)
        ? s.cart
        : [...s.cart, { slug, quantity: 1 }],
    }));
    toast("Added to your demo cart. A little more art in your life.");
  };
  return (
    <DemoContext.Provider
      value={{
        state,
        ready,
        update: setState,
        toggle,
        addToCart,
        toast,
        notice,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${notice ? "visible" : ""}`}
      >
        {notice}
      </div>
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoProvider is required");
  return value;
}
