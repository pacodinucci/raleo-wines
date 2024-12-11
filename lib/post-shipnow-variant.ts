import axios from "axios";

const URL = "https://api.shipnow.com.ar";

const apiToken = "cc5ghy7uhqYujQQ9cNZ8EHppeQO3VYmpdItx9HwgXSowIN4pNw";

export interface VariantDataProps {
  external_reference: string;
  price: {
    retail: number | null;
    wholesale: number | null;
    buy: number | null;
  } | null;
  dimensions: {
    weight: number | null;
    height: number | null;
    length: number | null;
    width: number | null;
  } | null;
}

const postShipnowVariant = async (variantData: VariantDataProps) => {
  try {
    const response = await axios.post(`${URL}/variants`, variantData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error al crear la variante en Shipnow");
    }
  } catch (error) {
    console.error("Error en postShipnowVariant:", error);
    return null;
  }
};

export default postShipnowVariant;
