import { useAppStore } from './use-app-store';

export { useAppStore };

const { setQuantity } = useAppStore.getState();

export const storeActions = {
   setQuantity,
};
