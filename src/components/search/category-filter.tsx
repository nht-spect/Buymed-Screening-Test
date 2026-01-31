import { View } from 'react-native';
import { CategoryFilters } from '@/types';
import { useCallback } from 'react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { CategoryItem } from './category-item';

type Props = {
   onFilter: () => void;
};

export const CategoryFilter = ({ onFilter }: Props) => {
   const data = Object.keys(CategoryFilters) as (keyof typeof CategoryFilters)[];

   const renderItem: ListRenderItem<(typeof data)['0']> = useCallback(
      (props) => {
         return <CategoryItem {...props} onFilter={onFilter} />;
      },
      [onFilter],
   );

   return (
      <FlashList
         horizontal
         data={data}
         pagingEnabled
         renderItem={renderItem}
         contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 10,
            paddingHorizontal: 14,
         }}
         showsHorizontalScrollIndicator={false}
         ItemSeparatorComponent={() => <View className='w-3' />}
         keyExtractor={(item) => item}
      />
   );
};
