import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ReactNode } from 'react';
import { StyledTextInputProps } from '@/components/core';

export type BaseInputProps = StyledTextInputProps & {
   error?: string;
   label?: string;
   iconLeft?: ReactNode;
   iconRight?: ReactNode;
   onPressLeftIcon?: () => void;
   onPressRightIcon?: () => void;
};

type TRule<T extends FieldValues> =
   | Omit<
        RegisterOptions<T>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
     >
   | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };

export type InputControllerType<T extends FieldValues> = {
   name: Path<T>;
   control: Control<T>;
   rules?: RuleType<T>;
};
