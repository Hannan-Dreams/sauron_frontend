import React, { useEffect, useRef, useState } from "react";

const TITLES = [
  "Software Engineer",
  "Tech Enthusiast",
  "AI Explorer",
  "Web Developer",
  "Freelancer",
  "Tech Blogger",
  "Gamer",
  "Video Editor",
];

export const Corousal = ({ pxPerSec = 120, direction = "rtl" }) => {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const seg1Ref = useRef(null);

  // animation state
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const offsetRef = useRef(0);
  const segWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const seg1 = seg1Ref.current;
    if (!track || !seg1) return;

    // Measure exact pixel width of one segment (avoid sub-pixel drift)
    const measure = () => {
      // Use offsetWidth for an integer, stable value
      segWidthRef.current = seg1.offsetWidth;
    };

    // Initial measure after mount
    measure();

    // Re-measure on resize (orientation/font changes)
    const onResize = () => {
      const prev = segWidthRef.current;
      measure();
      // Rebase offset to keep continuity
      const w = segWidthRef.current || 1;
      // Keep offset in [-w, 0) for rtl (negative shift)
      if (direction === "rtl") {
        offsetRef.current = -((Math.abs(offsetRef.current) % w));
      } else {
        offsetRef.current = (Math.abs(offsetRef.current) % w);
      }
      track.style.transform = `translateX(${offsetRef.current}px)`;
    };

    // Handle late font swaps
    const fontTimeout = setTimeout(onResize, 200);
    window.addEventListener("resize", onResize);

    const tick = (now) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (!paused) {
        const w = segWidthRef.current || 1;
        if (direction === "rtl") {
          // move left
          offsetRef.current -= pxPerSec * dt;

          // Once we've shifted a full segment width left, snap forward by that width
          if (Math.abs(offsetRef.current) >= w) {
            offsetRef.current += w;
          }
        } else {
          // ltr: move right
          offsetRef.current += pxPerSec * dt;

          // Once we've shifted a full segment width right, snap back by that width
          if (offsetRef.current >= w) {
            offsetRef.current -= w;
          }
        }

        track.style.transform = `translateX(${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(fontTimeout);
    };
  }, [paused, pxPerSec, direction]);

  return (
    <div className="md:mx-20 mx-[4px] w-[80%] md:w-[50%] mt-[10px] mb-4 relative flex items-center font-mono text-white">
      {/* Container */}
      <div
        className="relative w-full overflow-hidden rounded-xl  backdrop-blur-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* gradient masks */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-12  z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-12 5 to-transparent z-10" />

        {/* Track: two identical segments rendered side-by-side from the start */}
        <div ref={trackRef} className="flex will-change-transform">
          <Segment refObj={seg1Ref} items={TITLES} />
          <Segment items={TITLES} />
        </div>
      </div>
    </div>
  );
};

function Segment({ items, refObj }) {
  return (
    <div ref={refObj} className="flex items-center gap-2 sm:gap-3 px-2 py-2 sm:py-3">
      {items.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="
            inline-flex items-center justify-center
            shrink-0
            rounded-lg  bg-white/5
            px-3 sm:px-4
            py-1.5 sm:py-2
             font-semibold leading-[1.15]
            text-white shadow-sm
            whitespace-nowrap md:text-2xl text-xl
            hover:bg-rose-600/10 hover:border-red-500/40
            transition
          "
          title={t}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
