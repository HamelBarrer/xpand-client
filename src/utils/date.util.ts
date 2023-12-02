export const parseDateUtil = (date: Date) => {
  return date.toLocaleString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
