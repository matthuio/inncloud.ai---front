import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number; // seconds
  decimals?: number;
}

export default function AnimatedCounter({ from, to, duration = 2, decimals = 1 }: AnimatedCounterProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate: v => setValue(v),
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <span>{value.toFixed(decimals)}</span>;
}
