import { z } from 'zod';
import { CategoryFilters } from '@/types';

const _searchSchema = z.string().optional();
const _categorySchema = z.enum(CategoryFilters).optional();

export const orderSchema = z.object({
   searchText: _searchSchema,
   category: _categorySchema,
});
