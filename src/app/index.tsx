import { Screen } from '@/components/core';
import { useForm } from 'react-hook-form';
import { CategoryFilters, FormOrderType, ProductListRef } from '@/types';
import { SearchSection } from '@/components/search';
import { ProductList } from '@/components/product-list';
import { OrderSummary } from '@/components/order-summary';
import { useMemo, useRef } from 'react';
import productsData from '@/data/products.json';

const { Container, Header } = Screen;

export default function Home() {
   const productListRef = useRef<ProductListRef>(null);

   const form = useForm<FormOrderType>({
      defaultValues: {
         searchText: '',
         category: CategoryFilters.ALL,
      },
   });

   const prices = useMemo(() => {
      return productsData.reduce(
         (acc, product) => {
            acc[product.id] = product.price;
            return acc;
         },
         {} as Record<number, number>,
      );
   }, []);

   return (
      <Container safeArea className='pt-2 px-0'>
         <Header
            title='Quick Order'
            className='leading-tight tracking-tight text-slate-800 pb-4'
         />

         <SearchSection
            form={form}
            onFilter={() => productListRef.current?.onFilter(form.getValues())}
         />

         <ProductList ref={productListRef} />

         <OrderSummary prices={prices} />
      </Container>
   );
}
