import { Text, TouchableOpacity } from 'react-native';
import { CategoryFilters, FormOrderType } from '@/types';
import { memo } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = ListRenderItemInfo<keyof typeof CategoryFilters> & {
   onFilter: () => void;
};

export const CategoryItem = memo(({ item, onFilter }: Props) => {
   const { control, setValue } = useFormContext<FormOrderType>();

   const selectedCategory = useWatch<FormOrderType>({
      name: 'category',
      control,
   });

   const isActive = selectedCategory === CategoryFilters[item];

   return (
      <TouchableOpacity
         onPress={() => {
            setValue('category', CategoryFilters[item]);
            onFilter();
         }}
         className={`${isActive ? 'bg-primary' : 'bg-white'} flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 shadow-md shadow-primary/20`}
      >
         <Text
            className={`${isActive ? 'text-white' : 'text-black'} font-medium`}
         >
            {CategoryFilters[item]}
         </Text>
      </TouchableOpacity>
   );
});
