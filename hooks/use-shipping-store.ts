import { create } from "zustand";
import { ShippingInfo } from "@/lib/types";

interface ShippingStore {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: Partial<ShippingInfo>) => void;
}

export const useShippingStore = create<ShippingStore>((set) => ({
  shippingInfo: {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    identification: "",
    city: "",
    zipCode: "",
    observations: "",
    region: "",
    deliveryAddress: false,
    deliveryAddressLine: "",
    deliveryPhone: "",
    deliveryApart: "",
    deliveryCity: "",
    deliveryRegion: "",
    deliveryZipCode: "",
    deliveryFullName: "",
    deliveryDays: [],
    deliveryTime: [],
  },
  setShippingInfo: (info) =>
    set((state) => ({
      shippingInfo: { ...state.shippingInfo, ...info },
    })),
}));
