"use client";

import TiendaCarousel from "@/components/carousel";
import Landing from "@/components/landing";
import SubscribeSection from "@/components/subscribe-section";
import TextReveal from "@/components/text-reveal";
import ThreeColumnScroll from "@/components/three-column";
import { db } from "@/lib/db";
import { oswald } from "@/lib/fonts";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSubscription } from "@/context/subscription-context";

export default function Home() {
  // const products = await db.product.findMany({
  //   where: {
  //     available: true,
  //   },
  // });

  const subscriptionRef = useRef<HTMLDivElement | null>(null);
  const subscriptionInView = useInView(subscriptionRef, {
    amount: 0.9,
  });
  const { setSubscriptionInView } = useSubscription();

  useEffect(() => {
    setSubscriptionInView(subscriptionInView);
  }, [subscriptionInView, setSubscriptionInView]);

  return (
    <main className="min-h-screen">
      <TextReveal />
      <Landing />
      <div className="px-0 md:px-28 mt-28 pb-28">
        <TiendaCarousel />
      </div>
      <div ref={subscriptionRef}>
        <SubscribeSection />
      </div>
    </main>
  );
}
