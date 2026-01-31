import { create } from 'zustand';
import { createOrderSlice } from '../order.slice';
import type { OrderSlice } from '../../types';

describe('Order Slice - Cart Logic', () => {
   let store: ReturnType<typeof create<OrderSlice>>;

   beforeEach(() => {
      store = create<OrderSlice>()((set, get, api) =>
         createOrderSlice(set, get, api),
      );
   });

   describe('getTotalQuantity', () => {
      it('should return 0 when cart is empty', () => {
         const totalQuantity = store.getState().getTotalQuantity();
         expect(totalQuantity).toBe(0);
      });

      it('should calculate total quantity correctly with single product', () => {
         store.getState().setQuantity(1, 5, '5');

         const totalQuantity = store.getState().getTotalQuantity();
         expect(totalQuantity).toBe(5);
      });

      it('should calculate total quantity correctly with multiple products', () => {
         store.getState().setQuantity(1, 5, '5');
         store.getState().setQuantity(2, 3, '3');
         store.getState().setQuantity(3, 2, '2');

         const totalQuantity = store.getState().getTotalQuantity();
         expect(totalQuantity).toBe(10);
      });

      it('should update total quantity when product quantity changes', () => {
         store.getState().setQuantity(1, 5, '5');
         expect(store.getState().getTotalQuantity()).toBe(5);

         store.getState().incrementQuantity(1);
         expect(store.getState().getTotalQuantity()).toBe(6);

         store.getState().decrementQuantity(1);
         expect(store.getState().getTotalQuantity()).toBe(5);
      });

      it('should update total quantity when product is cleared', () => {
         store.getState().setQuantity(1, 5, '5');
         store.getState().setQuantity(2, 3, '3');
         expect(store.getState().getTotalQuantity()).toBe(8);

         store.getState().clearQuantity(1);
         expect(store.getState().getTotalQuantity()).toBe(3);
      });
   });

   describe('getTotalAmount', () => {
      const prices = {
         1: 10000,
         2: 20000,
         3: 15000,
      };

      it('should return 0 when cart is empty', () => {
         const totalAmount = store.getState().getTotalAmount(prices);
         expect(totalAmount).toBe(0);
      });

      it('should calculate total amount correctly with single product', () => {
         store.getState().setQuantity(1, 5, '5');

         const totalAmount = store.getState().getTotalAmount(prices);
         expect(totalAmount).toBe(50000);
      });

      it('should calculate total amount correctly with multiple products', () => {
         store.getState().setQuantity(1, 2, '2');
         store.getState().setQuantity(2, 3, '3');
         store.getState().setQuantity(3, 1, '1');

         const totalAmount = store.getState().getTotalAmount(prices);
         expect(totalAmount).toBe(95000);
      });

      it('should handle products with missing prices', () => {
         store.getState().setQuantity(1, 5, '5');
         store.getState().setQuantity(999, 2, '2');

         const totalAmount = store.getState().getTotalAmount(prices);
         expect(totalAmount).toBe(50000);
      });

      it('should update total amount when quantities change', () => {
         store.getState().setQuantity(1, 2, '2');
         expect(store.getState().getTotalAmount(prices)).toBe(20000);

         store.getState().incrementQuantity(1);
         expect(store.getState().getTotalAmount(prices)).toBe(30000);

         store.getState().decrementQuantity(1);
         expect(store.getState().getTotalAmount(prices)).toBe(20000);
      });

      it('should handle decimal quantities', () => {
         store.getState().setQuantity(1, 2.5, '2.5');

         const totalAmount = store.getState().getTotalAmount(prices);
         expect(totalAmount).toBe(25000);
      });
   });
});