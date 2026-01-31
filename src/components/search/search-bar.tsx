import { Icon } from '@/components/core';
import { ControlledTextField } from '@/components/form-control';
import { useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { FormOrderType } from '@/types';
import { withDebounce } from '@/utils/with-debounce';

type Props = {
   onSearch: () => void;
};

export const SearchBar = memo(({ onSearch }: Props) => {
   const { control } = useFormContext<FormOrderType>();

   return (
      <ControlledTextField
         control={control}
         name='searchText'
         placeholder='Search medication...'
         onChange={withDebounce(onSearch, 400)}
         iconLeft={<Icon name='search' className='text-slate-400' />}
      />
   );
});
