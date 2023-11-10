import { IResponse, IStringDictionary } from '../types/recoil/types.recoil';
import { useCallback } from 'react';
import { RecoilToken } from '@recoil/recoil.token';
import { useRecoilValue } from 'recoil';

let isRefreshing = false;

export const UseFetch = (args: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  value: IStringDictionary;
}) => {
  const { accessToken, refreshToken } = useRecoilValue(RecoilToken);
  /*const requestHeaders: HeadersInit_ = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Authorization', '');*/
  const onFetch = useCallback(() => {
    const loadData = async () => {
      try {
        const rtnData: IResponse = await fetch(args.url, {
          method: args.method,
          headers: {
            Authorization: accessToken,
          },
          body: JSON.stringify(args.value),
        });

        if (rtnData.statusCode === 200) return await rtnData.json();
        if (rtnData.statusCode === 401) {
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadData().then((data) => {
      return data;
    });
  }, []);

  const setExpiredAccessToken = async () => {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
      }
    } catch (e) {}
  };

  const reIsueedAccessToken = async (refreshToken: string) => {
    try {
      const rtnData: IResponse = await fetch(args.url, {
        method: args.method,
        headers: {
          Authorization: refreshToken,
        },
        body: JSON.stringify(args.value),
      });

      if (rtnData.statusCode !== 200) return new Error(rtnData.statusText);
      return await rtnData.json();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onFetch: onFetch,
  };
};
