import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

function getItem<T>(key: string): T | null {
   const value = storage.getString(key);
   return value ? JSON.parse(value) : null;
}

async function setItem<T>(key: string, value: T) {
   storage.set(key, JSON.stringify(value));
}

async function removeItem(key: string) {
   storage.remove(key);
}

export const storageActions = {
   getItem,
   setItem,
   removeItem,
};
