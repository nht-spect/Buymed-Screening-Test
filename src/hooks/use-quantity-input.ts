import { useAppStore } from '@/lib/store';

const DEFAULT_QUANTITY = { quantity: 0, displayValue: '0' };

export const useQuantityInput = (productId: number) => {
   const quantityItem = useAppStore(
      (state) => state.quantities[productId] || DEFAULT_QUANTITY,
   );

   const setQuantity = useAppStore((state) => state.setQuantity);
   const incrementQuantity = useAppStore((state) => state.incrementQuantity);
   const decrementQuantity = useAppStore((state) => state.decrementQuantity);
   const clearQuantity = useAppStore((state) => state.clearQuantity);

   function onChangeText(text: string) {
      if (!text) {
         setQuantity(productId, 0, '0');
         return;
      }

      const numericValue = text.replace(/[^0-9.]/g, '');

      const decimalCount = (numericValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
         return;
      }

      if (numericValue === '' || numericValue === '.') {
         setQuantity(productId, 0, numericValue);
         return;
      }

      if (numericValue.endsWith('.')) {
         setQuantity(productId, parseFloat(numericValue), numericValue);
         return;
      }

      const parsedValue = parseFloat(numericValue);
      if (isNaN(parsedValue)) return;

      const formattedValue = parsedValue.toLocaleString('en-US', {
         maximumFractionDigits: 2,
         useGrouping: true,
      });

      setQuantity(productId, parsedValue, formattedValue);
   }

   function increment() {
      incrementQuantity(productId);
   }

   function decrement() {
      decrementQuantity(productId);
   }

   function reset() {
      clearQuantity(productId);
   }

   return {
      quantity: quantityItem?.quantity ?? 0,
      displayValue: quantityItem?.displayValue ?? '0',
      onChangeText,
      increment,
      decrement,
      reset,
   };
};
