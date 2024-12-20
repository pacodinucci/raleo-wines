"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const TextReveal = () => {
  const [lettersRef, setLettersRef] = useArrayRef<HTMLSpanElement>();

  function useArrayRef<T>() {
    const lettersRef = useRef<T[]>([]);
    lettersRef.current = [];
    return [
      lettersRef,
      (ref: T | null) => ref && lettersRef.current.push(ref),
    ] as const;
  }

  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const paragraphs = [
    "Bienvenido al encuentro que celebra tus sentidos.",
    "Cada botella refleja tus preferencias, estilo, y transforma cada ocasión en una experiencia única.",
    "Tu viaje empieza aquí.",
  ];

  useEffect(() => {
    const reveal = gsap.to(lettersRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "bottom 80%",
      },
      color: "#2A2A2A",
      duration: 5,
      stagger: 1,
    });
    return () => {
      reveal.kill();
    };
  }, []);

  return (
    <>
      <div style={{ height: "32vh" }}></div>
      <div className="" style={{ paddingLeft: "10%", paddingRight: "20%" }}>
        <div ref={triggerRef}>
          {paragraphs.map((paragraph, pIndex) => (
            <p key={pIndex} style={{ marginBottom: "2rem" }}>
              {paragraph.split("").map((letter, index) => (
                <span
                  key={`${pIndex}-${index}`}
                  ref={setLettersRef}
                  style={{
                    fontSize: "clamp(3rem, 9vw, 15rem)",
                    lineHeight: "clamp(3rem, 10vw, 15rem)",
                    fontWeight: "800",
                    color: "#fff",
                  }}
                >
                  {letter}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <div style={{ height: "20vh" }}></div>
    </>
  );
};

export default TextReveal;
