import { type MyStateCreator, type OrderSlice } from '../types';

const formatQuantity = (quantity: number): string => {
   return quantity.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      useGrouping: true,
   });
};

export const createOrderSlice: MyStateCreator<keyof OrderSlice> = (
   set,
   get,
): OrderSlice => ({
   quantities: {},

   setQuantity: (productId, quantity, displayValue) => {
      set({
         quantities: {
            ...get().quantities,
            [productId]: { quantity, displayValue },
         },
      });
   },

   incrementQuantity: (productId) => {
      const current = get().quantities[productId];
      const newQuantity = (current?.quantity || 0) + 1;
      set({
         quantities: {
            ...get().quantities,
            [productId]: {
               quantity: newQuantity,
               displayValue: formatQuantity(newQuantity),
            },
         },
      });
   },

   decrementQuantity: (productId) => {
      const current = get().quantities[productId];
      const newQuantity = Math.max(0, (current?.quantity || 0) - 1);

      if (newQuantity === 0) {
         const { [productId]: _, ...rest } = get().quantities;
         set({ quantities: rest });
      } else {
         set({
            quantities: {
               ...get().quantities,
               [productId]: {
                  quantity: newQuantity,
                  displayValue: formatQuantity(newQuantity),
               },
            },
         });
      }
   },

   getQuantity: (productId) => {
      return get().quantities[productId] || { quantity: 0, displayValue: '0' };
   },

   clearQuantity: (productId) => {
      const { [productId]: _, ...rest } = get().quantities;
      set({ quantities: rest });
   },

   clearAllQuantities: () => {
      set({ quantities: {} });
   },

   getTotalQuantity: () => {
      const quantities = get().quantities;
      return Object.values(quantities).reduce(
         (total, item) => total + item.quantity,
         0,
      );
   },

   getTotalAmount: (prices) => {
      const quantities = get().quantities;
      return Object.entries(quantities).reduce((total, [productId, item]) => {
         const price = prices[Number(productId)] || 0;
         return total + item.quantity * price;
      }, 0);
   },
});
