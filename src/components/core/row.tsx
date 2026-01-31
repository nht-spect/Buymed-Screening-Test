import { View } from 'react-native';
import { BaseChildrenProps } from '@/types';
import { withUniwind } from 'uniwind';
import { ComponentProps } from 'react';
import { cn } from '@/utils';

const StyledView = withUniwind(View);

const ROW_VARIANTS = {
   'justify-center': 'justify-center gap-default',
   'justify-between': 'justify-between items-center gap-default',
   center: 'items-center justify-center gap-default',
   'items-center': 'items-center  gap-default',
} as const;

type RowVariant = keyof typeof ROW_VARIANTS;
type Props = BaseChildrenProps &
   StyledStyledViewProps & { variant?: RowVariant; isFlex?: boolean };
type StyledStyledViewProps = ComponentProps<typeof StyledView>;

export const Row = (props: Props) => {
   const { children, className, variant, isFlex } = props;

   const variantClass = variant ? ROW_VARIANTS[variant] : undefined;

   return (
      <StyledView
         className={cn(
            'flex-row gap-default',
            isFlex && 'flex-1',
            variantClass,
            className,
         )}
      >
         {children}
      </StyledView>
   );
};
