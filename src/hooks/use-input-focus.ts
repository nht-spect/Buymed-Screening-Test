import { useCallback, useState } from 'react';
import { FocusEvent } from 'react-native';

type UseInputFocusOptions = {
   onFocusCallback?: (e: FocusEvent) => void;
   onBlurCallback?: (e: FocusEvent) => void;
};

export const useInputFocus = (options: UseInputFocusOptions = {}) => {
   const { onFocusCallback, onBlurCallback } = options;
   const [isFocused, setFocused] = useState(false);

   const handleFocus = useCallback(
      (e: FocusEvent) => {
         setFocused(true);
         onFocusCallback?.(e);
      },
      [onFocusCallback],
   );

   const handleBlur = useCallback(
      (e: FocusEvent) => {
         setFocused(false);
         onBlurCallback?.(e);
      },
      [onBlurCallback],
   );

   return {
      isFocused,
      handleFocus,
      handleBlur,
      setFocused,
   };
};
