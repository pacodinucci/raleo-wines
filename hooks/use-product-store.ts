import { create } from "zustand";
import axios from "axios";
import { Product } from "@prisma/client";

interface ProductStoreProps {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
}

const useProductStore = create<ProductStoreProps>((set) => ({
  products: [],
  fetchProducts: async () => {
    const response = await axios.get("/api/products");
    set({ products: response.data });
  },
  addProduct: async (product: Product) => {
    await axios.post("/api/products", product);
    set((state) => ({ products: [...state.products, product] }));
  },
}));

export default useProductStore;
