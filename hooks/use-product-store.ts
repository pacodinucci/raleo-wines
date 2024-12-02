import { create } from "zustand";
import axios from "axios";
import { Product } from "@prisma/client";

interface ProductStoreProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
}

const useProductStore = create<ProductStoreProps>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  // fetchProducts: async () => {
  //   const response = await axios.get("/api/products");
  //   set({ products: response.data });
  // },
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.get("/api/products");
        set({ products: response.data || [], isLoading: false });
        return;
      } catch (error) {
        retries++;
        if (retries === MAX_RETRIES) {
          console.error("Error fetching products:", error);
          set({
            products: [],
            isLoading: false,
            error: "Error al cargar productos. Intenta nuevamente.",
          });
        }
      }
    }
  },
  addProduct: async (product: Product) => {
    await axios.post("/api/products", product);
    set((state) => ({ products: [...state.products, product] }));
  },
}));

export default useProductStore;
