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
import ClubCarousel from "@/components/club-carousel";
import useBoxStore from "@/hooks/use-box-store";

export default function Home() {
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
      {/* <Logo /> */}
      {/* <TextReveal /> */}
      <Landing />
      <div className="px-0 md:px-28 mt-28 pb-28">
        <ClubCarousel />
        {/* <TiendaCarousel /> */}
      </div>
      <div ref={subscriptionRef}>
        <SubscribeSection />
      </div>
    </main>
  );
}
