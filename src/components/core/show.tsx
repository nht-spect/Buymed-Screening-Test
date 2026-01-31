import { type ReactNode } from 'react';

type ShowProps = {
   /** The condition to evaluate. */
   when: boolean;
   /** The content to render if the condition is true. */
   children: ReactNode;
   /** An optional fallback to render if the condition is false. */
   fallback?: ReactNode;
};

export const Show = ({ when, children, fallback = null }: ShowProps) => {
   return when ? children : fallback;
};
