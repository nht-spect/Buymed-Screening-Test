import { View } from 'react-native';
import { BaseChildrenProps } from '@/types';
import { withUniwind } from 'uniwind';
import { ComponentProps } from 'react';
import { cn } from '@/utils';

const StyledView = withUniwind(View);

const COLUMN_VARIANTS = {
   'items-right': 'items-end gap-default',
   'items-center': 'items-center gap-default',
   'justify-center': 'justify-center gap-default',
   'justify-between': 'justify-between gap-default',
   center: 'items-center justify-center gap-default',
} as const;

type ColumnVariant = keyof typeof COLUMN_VARIANTS;

type Props = BaseChildrenProps &
   StyledViewProps & { variant?: ColumnVariant; isFlex?: boolean };
type StyledViewProps = ComponentProps<typeof StyledView>;

export const Column = (props: Props) => {
   const { children, className, variant, isFlex } = props;

   const variantClass = variant ? COLUMN_VARIANTS[variant] : undefined;

   return (
      <StyledView
         className={cn(
            'flex-col gap-default',
            isFlex && 'flex-1',
            variantClass,
            className,
         )}
      >
         {children}
      </StyledView>
   );
};
