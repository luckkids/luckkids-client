import { IResponse, IStringDictionary } from '../types/recoil/types.recoil';
import { useCallback, useState } from 'react';
import { RecoilToken } from '@recoil/recoil.token';
import { useRecoilState, useRecoilValue } from 'recoil';

let isRefreshing = false;
const host = 'http://218.155.95.66:8777';

export const UseFetch = (args: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  value?: IStringDictionary;
  result?: () => void;
}) => {
  const [token, setToken] = useRecoilState(RecoilToken);
  const { accessToken, refreshToken } = useRecoilValue(RecoilToken);
  const [isSuccess, setIsSuccess] = useState(false);
  const onFetch = useCallback(() => {
    const loadData = async () => {
      try {
        switch (args.method) {
          case 'POST': {
            const rtnData: IResponse = await fetch(host + args.url, {
              method: args.method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(args.value),
            });
            return rtnData.json();
          }
          case 'GET': {
            const rtnData: IResponse = await fetch(host + args.url, {
              method: args.method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
            return rtnData.json();
          }
          default: {
            const rtnData: IResponse = await fetch(host + args.url, {
              method: args.method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
            return rtnData.json();
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadData().then((result) => {
      if (result.statusCode === 401) {
        return setExpiredAccessToken();
      }
      if (result.data.refreshToken) {
        setToken({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
      }
      if (result.statusCode === 200) {
        setIsSuccess(true);
        args.result && args.result();
      }
      return result.data;
    });
  }, []);

  const setExpiredAccessToken = async () => {
    try {
      /*if (!isRefreshing) {
        isRefreshing = true;
        await reIsueedAccessToken(refreshToken);
        isRefreshing = false;
      }*/
      return await reIsueedAccessToken(refreshToken);
    } catch (e) {
      console.log(e);
    }
  };

  const reIsueedAccessToken = async (refreshToken: string) => {
    try {
      const rtnData: IResponse = await fetch(host + args.url, {
        method: args.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
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
    isSuccess: isSuccess,
  };
};
