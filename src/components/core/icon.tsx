import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { withUniwind } from 'uniwind';
import { ComponentProps } from 'react';

const StyledIcon = withUniwind(MaterialIcons);

type Props = ComponentProps<typeof StyledIcon>;

export const Icon = (props: Props) => {
   const { size = 30, ...otherProps } = props;

   return <StyledIcon {...otherProps} size={size} />;
};
