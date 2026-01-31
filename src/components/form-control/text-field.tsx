import { Controller, FieldValues } from 'react-hook-form';
import { BaseInputProps, InputControllerType } from '@/types';
import { Input } from '@/components/core';

export type ControlledTextFieldProps<T extends FieldValues> = BaseInputProps &
   InputControllerType<T>;

export function ControlledTextField<T extends FieldValues>(
   props: ControlledTextFieldProps<T>,
) {
   const { name, control, rules, ...inputProps } = props;

   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { onChange, value, ref } }) => (
            <Input
               value={value}
               ref={ref as any}
               {...inputProps}
               onChangeText={(text) => {
                  onChange(text);
               }}
            />
         )}
      />
   );
}
