import { CartProduct } from "@/hooks/use-cart-store";
import { Product } from "@prisma/client";

export const calculateWeight = (cart: CartProduct[]) => {
  return cart.reduce((totalWeight, product) => {
    const weight = Number(product.weight);
    const quantity = product.quantity;

    return totalWeight + weight * quantity;
  }, 0);
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

export const getProductName = (
  products: Product[],
  productId: string
): string => {
  const product = products.find((product) => product.id === productId);
  return product ? product.title : "Desconocido";
};
