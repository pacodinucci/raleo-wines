"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import pic1 from "../public/whitewine.jpg";
import pic2 from "../public/redwine.jpg";
import Lenis from "lenis";
import { useScroll, useTransform, motion } from "framer-motion";
import { signika } from "@/lib/fonts";
import PaintEffect from "./paint-effect";

const Landing = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div ref={container} className="relative ">
      <Section1 scrollYProgress={scrollYProgress} />
      {/* <PaintEffect /> */}
      <Section2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Section1 = ({ scrollYProgress }: any) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-[#E8E1D0] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      {/* <p>Scroll Perspective</p>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <Image src={pic1} alt="img" placeholder="blur" fill />
        </div>
        <p>Transition</p>
      </div> */}
      <h1
        className={`${signika.className} text-[12vw] uppercase tracking-wide font-semibold text-[#B15147]`}
      >
        Halmacén
      </h1>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }: any) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  return (
    <motion.div style={{ scale, rotate }} className="relative h-[100vh]">
      <Image src={pic2} alt="img" placeholder="blur" fill />
    </motion.div>
  );
};

export default Landing;
