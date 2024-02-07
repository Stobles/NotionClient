import { useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>;
type FunctionType = (...args: any[]) => void;

export function useDebounce<Func extends FunctionType>(
  func: Func,
  delay = 1000,
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}
