export function formatNumber(number: number): string {
   return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
   });
}
