import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { storage } from '../storage';
import { createOrderSlice } from './slices/order.slice';
import { type AppStore, createSelectors } from './types';

export const _useAppStore = create<AppStore>()(
   devtools(
      persist(
         (set, get, state) => ({
            ...createOrderSlice(set, get, state),
         }),
         {
            name: 'app-store-storage',
            storage: createJSONStorage(() => ({
               getItem: (name) => storage.getString(name) ?? null,
               setItem: (name, value) => storage.set(name, value),
               removeItem: (name) => storage.remove(name),
            })),
         },
      ),
   ),
);

export const useAppStore = createSelectors(_useAppStore);
