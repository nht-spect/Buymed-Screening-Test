import { Text, View } from 'react-native';
import { memo } from 'react';
import { Product } from '@/types';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { Column, Icon, Row, Show } from '@/components/core';
import { QuantityInput } from '@/components/product-list/quantity-input';
import { formatNumber } from '@/utils/format-number';

type Props = ListRenderItemInfo<Product>;

export const ProductItem = memo((props: Props) => {
   const { item } = props;

   return (
      <Column className='p-4 rounded-xl bg-white border border-slate-200 shadow-sm shadow-slate-100'>
         <Row>
            <View className='flex items-center justify-center rounded-xl bg-slate-50 size-12'>
               <Icon name='vaccines' className='text-slate-400' size={22} />
            </View>

            <Column className='gap-0'>
               <Row className='gap-2'>
                  <Text className='text-lg font-bold'>{item.name}</Text>
                  <Show when={item.isPrescription}>
                     <View className='bg-rose-50 px-1.5 items-center justify-center py-0.5 rounded border border-rose-100 uppercase tracking-wide'>
                        <Text className='text-rose-600 text-[12px] font-bold'>
                           RX
                        </Text>
                     </View>
                  </Show>
               </Row>
               <Text className='text-slate-600 text-sm font-medium'>
                  {item.category} • {formatNumber(item.price)}
               </Text>
            </Column>
         </Row>

         <View className='flex h-px bg-slate-100' />

         <QuantityInput productId={item.id} price={item.price} />
      </Column>
   );
});
