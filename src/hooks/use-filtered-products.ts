import { ForwardedRef, useEffect, useImperativeHandle, useState } from 'react';
import defaultProducts from '@/data/products.json';
import { CategoryFilters, ProductListRef } from '@/types';
import { sleep } from '@/utils/sleep';

export const useFilteredProducts = (ref: ForwardedRef<ProductListRef>) => {
   const [loading, setLoading] = useState(false);

   const [searchText, setSearchText] = useState<string | undefined>('');
   const [category, setCategory] = useState<CategoryFilters | undefined>(
      CategoryFilters.ALL,
   );

   const [products, setProducts] = useState(defaultProducts);

   useImperativeHandle(
      ref,
      () => ({
         onFilter: (value) => {
            setSearchText(value?.searchText);
            setCategory(value?.category);
         },
      }),
      [],
   );

   useEffect(() => {
      (async () => {
         setLoading(true);
         await sleep(200);

         let result = defaultProducts;

         if (searchText) {
            const searchLower = searchText.toLowerCase().trim();
            result = result.filter((product) =>
               product.name.toLowerCase().includes(searchLower),
            );
         }

         if (category && category !== CategoryFilters.ALL) {
            result = result.filter((product) => product.category === category);
         }
         setLoading(false);

         setProducts(result);
      })();
   }, [searchText, category]);

   return {
      loading,
      category,
      searchText,
      products,
   };
};
