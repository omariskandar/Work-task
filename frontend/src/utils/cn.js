export const cn = (...classes) =>
  classes
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === 'string') return value;
      if (Array.isArray(value)) {
        return value.filter(Boolean);
      }
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([, condition]) => Boolean(condition))
          .map(([className]) => className);
      }
      return [];
    })
    .join(' ')
    .trim();
