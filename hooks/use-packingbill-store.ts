import { create } from "zustand";
import axios from "axios";
import { Packingbill } from "@prisma/client";

interface PackingbillStoreProps {
  packingbills: Packingbill[];
  isLoading: boolean;
  error: string | null;
  fetchPackingbills: () => Promise<void>;
  addPackingbill: (packingbill: Packingbill) => Promise<void>;
  removePackingbill: (id: string) => Promise<void>;
}

const usePackingbillStore = create<PackingbillStoreProps>((set) => ({
  packingbills: [],
  isLoading: false,
  error: null,
  fetchPackingbills: async () => {
    set({ isLoading: true, error: null });
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.get("/api/packingbills");
        set({ packingbills: response.data || [], isLoading: false });
        return;
      } catch (error) {
        retries++;
        if (retries === MAX_RETRIES) {
          console.error("Error fetching packingbills:", error);
          set({
            packingbills: [],
            isLoading: false,
            error: "Error al cargar remitos. Intenta nuevamente.",
          });
        }
      }
    }
  },
  addPackingbill: async (packingbill: Packingbill) => {
    try {
      const response = await axios.post("/api/packingbills", packingbill);
      set((state) => ({
        packingbills: [...state.packingbills, response.data],
      }));
    } catch (error) {
      console.error("Error adding packingbill:", error);
      set({ error: "Error al agregar el remito." });
    }
  },
  removePackingbill: async (id: string) => {
    try {
      await axios.delete(`/api/packingbills/${id}`);
      set((state) => ({
        packingbills: state.packingbills.filter(
          (packingbill) => packingbill.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error removing packingbill:", error);
      set({ error: "Error al eliminar el remito." });
    }
  },
}));

export default usePackingbillStore;
