"use client";

import suscribe from "@/actions/suscribe";
import { useCustomerDataModal } from "@/hooks/use-customer-data-modal";
import { playfair } from "@/lib/fonts";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const SubscribeSection = (props: Props) => {
  const onOpen = useCustomerDataModal((state) => state.onOpen);

  return (
    <div className={`relative h-screen text-white snap-start py-20 px-6 `}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src="/botellas-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-2/3 flex flex-col">
        <p className={`${playfair.className} text-2xl p-8 leading-relaxed`}>
          El Club de Vino ofrece una emocionante manera de descubrir los mejores
          vinos argentinos en cajas especialmente seleccionadas con ofertas de
          regiones o variedades específicas y paquetes variados seleccionados.
          Los vinos son especiales, a veces partidas limitadas, y expresan la
          amplitud de la vinificación argentina.
        </p>
        <p className={`${playfair.className} text-2xl p-8 leading-relaxed`}>
          Al suscribirse al club, recibirán una caja mensual de vinos
          seleccionados meticulosamente por su calidad excepcional. Esta
          suscripción no solo les permitirá disfrutar de vinos exclusivos, sino
          también embarcarse en un viaje para descubrir y apreciar la rica
          variedad en terroirs y estilos que nuestro país tiene para ofrecer.
        </p>
        <button
          className="px-8 flex gap-2 items-center text-lg hover:font-semibold transition-all duration-200"
          onClick={onOpen}
        >
          Suscribirse
          <Plus color="white" />
        </button>
      </div>
    </div>
  );
};

export default SubscribeSection;
