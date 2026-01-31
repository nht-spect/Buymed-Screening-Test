import { useFilteredProducts } from '@/hooks/use-filtered-products';
import { forwardRef, useCallback } from 'react';
import { Product, ProductListRef } from '@/types';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { ProductItem } from './product-item';
import { ActivityIndicator, Text, View } from 'react-native';
import { Column, Screen, Show } from '@/components/core';

export const ProductList = forwardRef<ProductListRef>((_, ref) => {
   const { products, loading } = useFilteredProducts(ref);

   const renderItem: ListRenderItem<Product> = useCallback(
      (props) => <ProductItem {...props} />,
      [],
   );

   return (
      <Show
         when={!loading}
         fallback={
            <Screen.Container variant='top' safeArea>
               <Column className='bg-white gap-2 p-4 rounded-xl'>
                  <ActivityIndicator size='large' />
                  <Text className='font-medium'>Loading...</Text>
               </Column>
            </Screen.Container>
         }
      >
         <FlashList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               paddingTop: 14,
               paddingBottom: 85,
               paddingHorizontal: 10,
            }}
            data={products}
            renderItem={renderItem}
            ListEmptyComponent={() => (
               <Column variant='center' className='gap-2'>
                  <Text className='text-[#0f172a] text-2xl font-bold leading-tight tracking-tight'>
                     No Products Found
                  </Text>
                  <Text className='text-center'>
                     We couldn&#39;t find any medications matching your filters.
                     Try adjusting your search terms.
                  </Text>
               </Column>
            )}
            ItemSeparatorComponent={() => <View className='h-4' />}
            keyExtractor={(_, idx) => idx.toString()}
         />
      </Show>
   );
});
