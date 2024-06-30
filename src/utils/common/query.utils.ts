export const getNextPageParam = <
  T extends { pageInfo: { currentPage: number; totalPage: number } },
>(
  lastPage: T,
) => {
  return lastPage.pageInfo.currentPage < lastPage.pageInfo.totalPage
    ? lastPage.pageInfo.currentPage + 1
    : undefined;
};

export const withInfiniteLoad =
  <Fn extends (...args: any) => Promise<any>, P = Parameters<Fn>>(
    api: Fn,
    params: P,
    pageSize: number,
  ) =>
  async ({ pageParam: offset = 0 }) => {
    const r = await api({ ...params, offset, limit: pageSize });
    return {
      nextOffset: offset + pageSize,
      ...r,
    };
  };

export const withTypedInfiniteLoad =
  <
    QueryFn extends (...args: any) => Promise<any>,
    Params = Parameters<QueryFn>,
  >(
    api: QueryFn,
    params: Params,
    pageSize: number,
  ) =>
  async ({
    pageParam: offset = 0,
  }): Promise<
    Awaited<QueryFn extends (...args: any) => infer R ? R : never>
  > => {
    return {
      nextOffset: offset + pageSize,
      ...(await api({ ...params, offset, limit: pageSize })),
    };
  };
