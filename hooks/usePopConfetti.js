import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function usePopConfetti(shouldPop) {
  useEffect(() => {
    if (shouldPop) {
      const end = Date.now() + 1.5 * 1000;

      (function frame() {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 8,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [shouldPop]);
}
