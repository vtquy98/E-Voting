export const required = value =>
  value ? undefined : 'This field was require.';
export const isNumber = value =>
  !isNaN(value) ? undefined : 'This field require a number!';
