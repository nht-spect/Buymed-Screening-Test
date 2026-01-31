import { memo } from 'react';
import { Text } from 'react-native';
import { Column, Row } from '@/components/core';
import { useAppStore } from '@/lib/store';
import { formatNumber } from '@/utils/format-number';

type OrderSummaryProps = {
   prices: Record<number, number>;
};

export const OrderSummary = memo(({ prices }: OrderSummaryProps) => {
   const getTotalQuantity = useAppStore((state) => state.getTotalQuantity);
   const getTotalAmount = useAppStore((state) => state.getTotalAmount);
   const quantities = useAppStore((state) => state.quantities);

   const totalSKUs = Object.keys(quantities).length;
   const totalQty = getTotalQuantity();
   const totalAmount = getTotalAmount(prices);

   return (
      <Row className='bg-white px-6 pt-4 pb-8 absolute z-20 bottom-0  border border-slate-100 shadow-sm'>
         <Column className='flex-1 gap-1'>
            <Text className='text-slate-500 text-xs font-semibold uppercase tracking-wide'>
               Total SKUs
            </Text>
            <Text className='text-slate-900 text-xl font-bold'>
               {totalSKUs} {totalSKUs === 1 ? 'Item' : 'Items'}
            </Text>
         </Column>

         <Column className='flex-1 gap-1 items-center'>
            <Text className='text-slate-500 text-xs font-semibold uppercase tracking-wide'>
               total qTY{' '}
            </Text>
            <Text className='text-slate-900 text-xl font-bold'>{totalQty}</Text>
         </Column>

         <Column className='flex-1 gap-1 items-end'>
            <Text className='text-slate-500 text-xs font-semibold uppercase tracking-wide'>
               Amount
            </Text>
            <Text className='text-primary text-2xl font-bold'>
               {formatNumber(totalAmount)}
            </Text>
         </Column>
      </Row>
   );
});
