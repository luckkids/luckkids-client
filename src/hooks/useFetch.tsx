import { IResponse, IStringDictionary } from '../types/recoil/types.recoil';
import { useCallback, useState } from 'react';
import { RecoilToken } from '@recoil/recoil.token';
import { useRecoilState } from 'recoil';

// let isRefreshing = false;
const host = 'http://218.155.95.66:8777';

export const UseFetch = (args: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  value?: IStringDictionary;
  result?: () => void;
}) => {
  const [token, setToken] = useRecoilState(RecoilToken);
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
                Authorization: `Bearer ${token.accessToken}`,
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
                Authorization: `Bearer ${token.accessToken}`,
              },
            });
            return rtnData.json();
          }
          default: {
            const rtnData: IResponse = await fetch(host + args.url, {
              method: args.method,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.accessToken}`,
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
        //1. 토큰 만료시 리프레시 토큰으로 엑세스 토큰 재발행
        return setExpiredAccessToken();
      }
      if (result.data.refreshToken) {
        //2. 토큰이 있으면 recoil.token.ts에 저장(글로벌로 참조 가능하도록)
        setToken({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
      }
      if (result.statusCode === 200) {
        //3. 결과가 200일경우 isSuccess 불리언값 참조 가능
        setIsSuccess(true);
        //4. 완료 후 컴퍼넌트에서 던져주는 결과후 실핼할 함수 실행
        args.result && args.result();
      }
      console.log('RESULT(data) ====>', result.data);
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
      return await reIsueedAccessToken(token.refreshToken);
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
