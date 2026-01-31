import { memo } from 'react';
import { View } from 'react-native';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { SearchBar } from './search-bar';
import { CategoryFilter } from './category-filter';
import { FormOrderType } from '@/types';

type SearchSectionProps = {
   form: UseFormReturn<FormOrderType>;
   onFilter: () => void;
};

const SearchSectionComponent = ({ form, onFilter }: SearchSectionProps) => {
   return (
      <FormProvider {...form}>
         <View className='px-default'>
            <SearchBar onSearch={onFilter} />
         </View>

         <CategoryFilter onFilter={onFilter} />
      </FormProvider>
   );
};

export const SearchSection = memo(SearchSectionComponent);
