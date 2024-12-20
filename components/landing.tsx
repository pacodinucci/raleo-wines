"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import pic1 from "../public/whitewine.jpg";
import pic2 from "../public/redwine.jpg";
import Lenis from "lenis";
import { useScroll, useTransform, motion } from "framer-motion";
import { signika } from "@/lib/fonts";
import TextReveal from "./text-reveal";

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
      <TextReveal />
      <ImageSection scrollYProgress={scrollYProgress} />
    </div>
  );
};

const ImageSection = ({ scrollYProgress }: any) => {
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.1, 1]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [-8, 0]);
  return (
    <motion.div style={{ scale, rotate }} className="relative h-[100vh]">
      <Image src={pic2} alt="img" placeholder="blur" fill />
    </motion.div>
  );
};

export default Landing;
