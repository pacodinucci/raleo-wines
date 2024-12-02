import { MercadoPagoConfig } from "mercadopago";

export const mercadopagoPreference = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});
