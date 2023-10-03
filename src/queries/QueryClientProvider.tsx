import React from 'react';
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from '@tanstack/react-query';
import { HOUR_AS_MILLISECOND } from '@constants';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(
    QCProvider,
    {
      client: new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: false,
            retry: 0,
            cacheTime: HOUR_AS_MILLISECOND,
          },
        },
      }),
    },
    children,
  );

export default QueryClientProvider;
