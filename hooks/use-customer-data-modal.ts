import { create } from "zustand";

interface useCustomerDataModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCustomerDataModal = create<useCustomerDataModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
