import TiendaCarousel from "@/components/carousel";
import { db } from "@/lib/db";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      available: true,
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TiendaCarousel products={products} />
    </main>
  );
}
