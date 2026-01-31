import { memo, useMemo } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Row } from '@/components/core';
import { formatNumber } from '@/utils/format-number';
import { tv } from 'tailwind-variants/lite';
import { useQuantityInput } from '@/hooks/use-quantity-input';

type Props = {
   productId: number;
   price: number;
};

const quantityInputStyles = tv({
   slots: {
      quantity: 'font-bold flex-5 text-primary text-lg',
      button:
         'h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-300',
      input: 'flex-1 text-center font-bold',
   },
   variants: {
      disabled: {
         true: {
            input: 'opacity-40',
            button: 'opacity-40',
            quantity: 'text-slate-400',
         },
      },
   },

   defaultVariants: {
      disabled: false,
   },
});

export const QuantityInput = memo(({ productId, price }: Props) => {
   const { quantity, displayValue, onChangeText, increment, decrement } =
      useQuantityInput(productId);

   const styles = useMemo(
      () => quantityInputStyles({ disabled: !quantity }),
      [quantity],
   );

   return (
      <Row variant='justify-between'>
         <Text numberOfLines={1} className={styles.quantity()}>
            {formatNumber(quantity * price)}
         </Text>

         <Row className='gap-2 flex-4'>
            <TouchableOpacity
               onPress={decrement}
               disabled={!quantity}
               className={styles.button()}
            >
               <Icon name='remove' size={25} />
            </TouchableOpacity>

            <TextInput
               value={displayValue}
               keyboardType='decimal-pad'
               className={styles.input()}
               onChangeText={onChangeText}
            />

            <TouchableOpacity onPress={increment} className={styles.button()}>
               <Icon name='add' size={25} />
            </TouchableOpacity>
         </Row>
      </Row>
   );
});
