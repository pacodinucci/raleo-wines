"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const TextReveal = () => {
  const [lettersRef, setlettersRef] = useArrayRef<HTMLSpanElement>();

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

  const text =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum molestiae deleniti doloribus ratione a! Dignissimos deleniti quo omnis quibusdam facilis aliquam veritatis saepe sint ipsum.";

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
      <div style={{ height: "30vh" }}></div>
      <div className="" style={{ paddingLeft: "10%", paddingRight: "30%" }}>
        <div ref={triggerRef}>
          {text.split("").map((letter, index) => (
            <span
              key={index}
              className=""
              ref={setlettersRef}
              style={{
                fontSize: "clamp(3rem, 10vw, 15rem)",
                lineHeight: "clamp(3rem, 10vw, 15rem)",
                fontWeight: "800",
                color: "#fff",
                // filter: "drop-shadow(0 0 0.06rem rgb(33, 33, 33))",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div style={{ height: "20vh" }}></div>
    </>
  );
};

export default TextReveal;
