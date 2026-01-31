import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ComponentProps } from 'react';
import { withUniwind } from 'uniwind';
import { cn } from '@/utils';
import { BaseChildrenProps } from '@/types';

const StyledText = withUniwind(Text);
const StyledSafeAreaView = withUniwind(SafeAreaView);

const CONTAINER_VARIANTS = {
   default: 'flex-1',
   'default-padded': 'flex-1 p-default',
   center: 'flex-1 items-center justify-center',
   top: 'flex-1 items-center justify-start p-default',
   bottom: 'flex-1 items-center justify-end p-default',
   'center-padded': 'flex-1 items-center justify-center p-default',
};

const HEADER_VARIANTS = {
   right: 'self-end',
   center: 'self-center',
};

type HeaderVariant = keyof typeof HEADER_VARIANTS;
type ContainerVariant = keyof typeof CONTAINER_VARIANTS;

type StyledTextProps = ComponentProps<typeof StyledText>;
type StyledSafeAreaViewProps = ComponentProps<typeof StyledSafeAreaView>;

type ContainerProps = StyledSafeAreaViewProps &
   BaseChildrenProps & {
      safeArea?: boolean;
      variant?: ContainerVariant;
   };

type HeaderProps = StyledTextProps & {
   title: string;
   variant?: HeaderVariant;
};

function Container(props: ContainerProps) {
   const { children, safeArea, variant, ...safeAreaProps } = props;

   const { className, ...otherSafeAreaProps } = safeAreaProps || {};

   const variantClass = CONTAINER_VARIANTS[variant || 'default'];

   if (!safeArea) {
      return children;
   }

   return (
      <StyledSafeAreaView
         {...otherSafeAreaProps}
         className={cn(variantClass, 'bg-background', className)}
      >
         {children}
      </StyledSafeAreaView>
   );
}

function Header(props: HeaderProps) {
   const { title, variant = 'center', className, ...styledTextProps } = props;

   const variantClass = HEADER_VARIANTS[variant];
   const classNameCn = cn(variantClass, className, 'font-bold text-xl');

   return (
      <StyledText {...styledTextProps} className={classNameCn}>
         {title}
      </StyledText>
   );
}

function Content() {
   return <View />;
}

function Footer() {
   return <View />;
}

export const Screen = {
   Container,
   Header,
   Content,
   Footer,
};
