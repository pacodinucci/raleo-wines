import TiendaCarousel from "@/components/carousel";
import Landing from "@/components/landing";
import SubscribeSection from "@/components/subscribe-section";
import TextReveal from "@/components/text-reveal";
import ThreeColumnScroll from "@/components/three-column";
import { db } from "@/lib/db";
import { oswald } from "@/lib/fonts";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      available: true,
    },
  });
  return (
    <main className="min-h-screen">
      <Landing />
      <TextReveal />
      <div className="px-0 md:px-28 mt-28 pb-28">
        <TiendaCarousel products={products} />
      </div>
      <SubscribeSection />
    </main>
  );
}
