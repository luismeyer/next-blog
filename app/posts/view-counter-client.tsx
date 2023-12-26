"use client";

import { useEffect, useRef, useState } from "react";

type ViewCounterClientProps = {
  children: number;
};

export function ViewCounterClient({ children }: ViewCounterClientProps) {
  const [count, setCount] = useState(0);

  const timeout = useRef<number>();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (count === children) {
      return;
    }

    timeout.current = window.setTimeout(async () => {
      if (count === children) {
        clearTimeout(timeout.current);
        return;
      }

      setCount((prev) => prev + 1);
    }, 10);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [count]);

  return <span>Views {count}</span>;
}
