export const createQueryKeyFactory =
  <List extends Record<string, any>>() =>
  <Key extends keyof List>(
    ...[key, params]: undefined extends List[Key]
      ? [Key]
      : [Key, List[Key] | 'KEY_BASE']
  ) => {
    if (params === 'KEY_BASE') return [key];
    return params ? [key, params] : [key];
  };
