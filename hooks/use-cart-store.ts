import { create } from "zustand";

export interface CartProduct {
  id: string;
  title: string;
  price: string;
  quantity: number;
  weight: string;
  [key: string]: any;
}

interface CartStoreProps {
  cart: CartProduct[];
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: () => void; // Acción para abrir el carrito
  setCartClose: () => void; // Acción para cerrar el carrito
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStoreProps>((set) => ({
  cart: [],
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: () => set({ isCartOpen: true }),
  setCartClose: () => set({ isCartOpen: false }),
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity } // Usa la cantidad del producto
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, product] }; // Usa el producto tal como es, incluida su cantidad
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  updateCartItem: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
