import { TextInput } from 'react-native';
import { withUniwind } from 'uniwind';
import { ComponentProps, useMemo } from 'react';

import { Row } from '../row';
import { Show } from '../show';
import { BaseInputProps } from '@/types';
import { inputStyle } from './input.styles';
import { useInputFocus } from '@/hooks/use-input-focus';

const StyledTextInput = withUniwind(TextInput);

export type StyledTextInputProps = ComponentProps<typeof StyledTextInput>;

export const Input = (props: BaseInputProps) => {
   const { iconLeft, iconRight, onBlur, onFocus, ...otherProps } = props;

   const { isFocused, handleFocus, handleBlur } = useInputFocus({
      onBlurCallback: onBlur,
      onFocusCallback: onFocus,
   });

   const styles = useMemo(() => inputStyle({ isFocused }), [isFocused]);

   return (
      <Row variant='items-center' className={styles.container()}>
         <Show when={Boolean(iconLeft)}>{iconLeft}</Show>

         <StyledTextInput
            {...otherProps}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={styles.input()}
            placeholderTextColorClassName='accent-slate-400'
         />

         <Show when={Boolean(iconRight)}>{iconRight}</Show>
      </Row>
   );
};
