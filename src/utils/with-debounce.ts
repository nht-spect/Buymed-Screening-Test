export function withDebounce<T extends (...args: any[]) => any>(
   func: T,
   delay: number,
): (...args: Parameters<T>) => void {
   let timeoutId: ReturnType<typeof setTimeout> | undefined;

   return function (...args: Parameters<T>) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
         func(...args);
      }, delay);
   };
}
