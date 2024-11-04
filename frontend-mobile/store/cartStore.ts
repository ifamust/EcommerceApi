import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  addProduct: (product: any) =>
    //TODO: if already in cart, add quantity else new item
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),
  resetCart: () => set({ items: [] }),
}));
