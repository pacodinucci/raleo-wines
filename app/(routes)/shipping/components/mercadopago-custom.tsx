import Image from "next/image";
import React from "react";
import { Lock } from "lucide-react";

const MercadoPagoCustom = () => {
  return (
    <div className="flex flex-col md:w-3/4 mx-auto gap-y-4 bg-white p-4 rounded-sm">
      <div className="flex justify-center gap-x-4">
        <Image
          src="/logo-mp.png"
          alt="logo mercado pago"
          width={70}
          height={0}
          className="hidden md:block"
        />
        <Image
          src="/logo-mp.png"
          alt="logo mercado pago"
          width={100}
          height={0}
          className="md:hidden block"
        />
        <p className="tracking-normal text-base">Pago seguro con MercadoPago</p>
      </div>
      <div>
        <p>
          Podés pagar con tarjeta de crédito, débito o efectivo a través de la
          plataforma.
        </p>
      </div>
      <div className="flex gap-x-4 bg-slate-100 rounded-sm p-4">
        <Lock className="w-8 h-8 md:w-5 md:h-5" />
        <p className="md:text-xs">
          Al continuar, te llevaremos a MercadoPago para completar tu compra de
          forma segura.
        </p>
      </div>
    </div>
  );
};

export default MercadoPagoCustom;
