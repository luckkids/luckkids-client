interface QueryParamListBase {
  // add your query key & params here
  GET_INFINITE_LIST: undefined;
  GET_LIST: undefined;
}

const getQueryKey = <T extends keyof QueryParamListBase>(
  ...[key, params]: undefined extends QueryParamListBase[T]
    ? [T]
    : [T, QueryParamListBase[T] | 'KEY_ONLY']
) => {
  if (params === 'KEY_ONLY') return [key];
  return params ? [key, params] : [key];
};

export default getQueryKey;
