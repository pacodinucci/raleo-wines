import { create } from "zustand";
import axios from "axios";
import { Box } from "@prisma/client";

interface BoxStoreProps {
  boxes: Box[];
  clubBoxes: Box[];
  selectedBox: Box | null;
  isLoading: boolean;
  error: string | null;
  fetchBoxes: () => Promise<void>;
  fetchClubBoxes: () => Promise<void>;
  fetchBoxById: (id: string) => Promise<void>;
  addBox: (box: Omit<Box, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateBox: (id: string, box: Partial<Box>) => Promise<void>;
  deleteBox: (id: string) => Promise<void>;
}

const useBoxStore = create<BoxStoreProps>((set) => ({
  boxes: [],
  clubBoxes: [],
  selectedBox: null,
  isLoading: false,
  error: null,

  fetchBoxes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/box");
      set({ boxes: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching boxes:", error);
      set({ isLoading: false, error: "Error al cargar las cajas." });
    }
  },

  fetchClubBoxes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/box?type=CLUB");
      set({ clubBoxes: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching CLUB boxes:", error);
      set({
        isLoading: false,
        error: "Error al cargar las cajas de tipo CLUB.",
      });
    }
  },

  fetchBoxById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/box/${id}`);
      set({ selectedBox: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching box by ID:", error);
      set({
        isLoading: false,
        error: "Error al cargar la caja seleccionada.",
      });
    }
  },

  addBox: async (box) => {
    try {
      const response = await axios.post("/api/box", box);
      set((state) => ({ boxes: [...state.boxes, response.data] }));
    } catch (error) {
      console.error("Error adding box:", error);
      set({ error: "Error al agregar la caja." });
    }
  },

  updateBox: async (id, box) => {
    try {
      const response = await axios.put(`/api/box/${id}`, box);
      set((state) => ({
        boxes: state.boxes.map((b) => (b.id === id ? response.data : b)),
      }));
    } catch (error) {
      console.error("Error updating box:", error);
      set({ error: "Error al actualizar la caja." });
    }
  },

  deleteBox: async (id) => {
    try {
      await axios.delete(`/api/box/${id}`);
      set((state) => ({
        boxes: state.boxes.filter((b) => b.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting box:", error);
      set({ error: "Error al eliminar la caja." });
    }
  },
}));

export default useBoxStore;
