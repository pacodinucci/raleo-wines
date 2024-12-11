import axios from "axios";

const URL = "https://api.shipnow.com.ar";
const apiToken = "cc5ghy7uhqYujQQ9cNZ8EHppeQO3VYmpdItx9HwgXSowIN4pNw";

interface ShipTo {
  name: string;
  last_name: string;
  zip_code: number;
  address_line: string;
  city: string;
  state: string;
  email: string;
}

interface Item {
  id: number;
  quantity: number;
}

interface OrderData {
  external_reference: string;
  ship_to: ShipTo;
  items: Item[];
}

const postShipnowOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post(`${URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 201) {
      console.log("Orden creada en Shipnow:", response.data);
      return response.data; // Retornamos los datos de la orden creada
    } else {
      throw new Error("Error al crear la orden en Shipnow");
    }
  } catch (error) {
    console.error("Error en postShipnowOrder:", error);
    return null;
  }
};

export default postShipnowOrder;
