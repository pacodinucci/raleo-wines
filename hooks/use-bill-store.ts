import { create } from "zustand";
import axios from "axios";
import { Bill } from "@prisma/client";

interface BillStoreProps {
  bills: Bill[];
  isLoading: boolean;
  error: string | null;
  fetchBills: () => Promise<void>;
  addBill: (bill: Bill) => Promise<void>;
  removeBill: (id: string) => Promise<void>;
  updateBill: (id: string, updatedBill: Partial<Bill>) => Promise<void>;
}

const useBillStore = create<BillStoreProps>((set) => ({
  bills: [],
  isLoading: false,
  error: null,

  fetchBills: async () => {
    set({ isLoading: true, error: null });
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.get("/api/bill");
        set({ bills: response.data || [], isLoading: false });
        return;
      } catch (error) {
        retries++;
        if (retries === MAX_RETRIES) {
          console.error("Error fetching bills:", error);
          set({
            bills: [],
            isLoading: false,
            error: "Error al cargar facturas. Intenta nuevamente.",
          });
        }
      }
    }
  },

  addBill: async (bill: Bill) => {
    try {
      const response = await axios.post("/api/bill", bill);
      set((state) => ({
        bills: [...state.bills, response.data],
      }));
    } catch (error) {
      console.error("Error adding bill:", error);
      set({ error: "Error al agregar la factura." });
    }
  },

  removeBill: async (id: string) => {
    try {
      await axios.delete(`/api/bill/${id}`);
      set((state) => ({
        bills: state.bills.filter((bill) => bill.id !== id),
      }));
    } catch (error) {
      console.error("Error removing bill:", error);
      set({ error: "Error al eliminar la factura." });
    }
  },

  updateBill: async (id: string, updatedBill: Partial<Bill>) => {
    try {
      const response = await axios.put(`/api/bill/${id}`, updatedBill);
      set((state) => ({
        bills: state.bills.map((bill) =>
          bill.id === id ? { ...bill, ...response.data } : bill
        ),
      }));
    } catch (error) {
      console.error("Error updating bill:", error);
      set({ error: "Error al actualizar la factura." });
    }
  },
}));

export default useBillStore;
