import { tv } from 'tailwind-variants/lite';

export const inputStyle = tv({
   slots: {
      container:
         'shadow-sm ring-1 px-3 ring-slate-200 overflow-hidden rounded-xl bg-white',
      input: 'text-slate-900 text-base py-3 flex flex-1 font-medium leading-0',
   },

   variants: {
      isFocused: {
         true: {
            container: 'ring-primary',
         },
      },
   },

   defaultVariants: {
      isFocused: false,
   },
});
