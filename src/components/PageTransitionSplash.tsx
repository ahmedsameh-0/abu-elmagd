import { useEffect, useState, useRef } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

export function PageTransitionSplash() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isFirstRender = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fullPath = `${pathname}${search}`;

  const triggerSplash = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMounted(true);
    requestAnimationFrame(() => {
      setActive(true);
    });

    timerRef.current = setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  useEffect(() => {
    const unsubBefore = router.subscribe("onBeforeNavigate", () => {
      triggerSplash();
    });

    return () => {
      unsubBefore();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [router]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    triggerSplash();
  }, [fullPath]);

  useEffect(() => {
    if (!active && mounted) {
      const timeout = setTimeout(() => {
        setMounted(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [active, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f9fafb]/95 backdrop-blur-md dark:bg-slate-950/95 transition-opacity duration-200 ${
        active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <div className="relative h-[2.5px] w-52 sm:w-64 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="animate-splash-bar h-full rounded-full bg-slate-900 dark:bg-slate-100" />
      </div>
    </div>
  );
}
