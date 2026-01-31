import { orderSchema } from '@/lib/constants/form-schema';
import { z } from 'zod';

export type Product = {
   id: number;
   name: string;
   price: number;
   category: string;
   isPrescription: boolean;
};

export type CartItem = {
   productId: number;
   quantity: number;
};

export enum CategoryFilters {
   'ALL' = 'All',
   'PAIN_RELIEF' = 'Pain Relief',
   'ANTIBIOTIC' = 'Antibiotic',
   'SUPPLEMENT' = 'Supplement',
   'ALLERGY' = 'Allergy',
   'GASTRO' = 'Gastro',
}

export type FormOrderType = z.infer<typeof orderSchema>;
export type ProductListRef = {
   onFilter: (value: FormOrderType) => void;
};
