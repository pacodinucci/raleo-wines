import TiendaCarousel from "@/components/carousel";
import SubscribeSection from "@/components/subscribe-section";
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
      <div className="px-0 md:px-28 mt-28 pb-28">
        <TiendaCarousel products={products} />
      </div>
      <SubscribeSection />
    </main>
  );
}
