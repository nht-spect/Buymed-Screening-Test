import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand';

export type QuantityItem = {
   quantity: number;
   displayValue: string;
};

export type OrderSlice = {
   quantities: Record<number, QuantityItem>;
   setQuantity: (
      productId: number,
      quantity: number,
      displayValue: string,
   ) => void;
   incrementQuantity: (productId: number) => void;
   decrementQuantity: (productId: number) => void;
   getQuantity: (productId: number) => QuantityItem;
   clearQuantity: (productId: number) => void;
   clearAllQuantities: () => void;
   getTotalQuantity: () => number;
   getTotalAmount: (prices: Record<number, number>) => number;
};

export type AppStore = OrderSlice;

export type MyStateCreator<T extends keyof K, K = AppStore> = StateCreator<
   K,
   [['zustand/devtools', never], ['zustand/persist', unknown]],
   [],
   Pick<K, T>
>;

type WithSelectors<S> = S extends { getState: () => infer T }
   ? S & { use: { [K in keyof T]: () => T[K] } }
   : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
   _store: S,
) => {
   let store = _store as WithSelectors<typeof _store>;
   store.use = {};
   for (let k of Object.keys(store.getState())) {
      (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
   }

   return store;
};
