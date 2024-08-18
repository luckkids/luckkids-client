import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { StorageKeys } from './storage/keys';
import useAsyncStorage from './storage/useAsyncStorage';
import { IResponse, IStringDictionary } from '../types/recoil/types.recoil';
import { RecoilToken } from '@recoil/recoil.token';

// let isRefreshing = false;
const host = 'https://api-luckkids.kro.kr/api/v1';
const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  BADREQUEST: 400,
  SERVERERROR: 500,
};

export const useFetch = (args: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  value?: IStringDictionary;
  onSuccessCallback?: (resultData?: any) => void;
  onFailCallback?: (resultData?: any) => void;
}) => {
  const [token, setToken] = useRecoilState(RecoilToken);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [resultData, setResultData] = useState<IResponse>();

  const { setValue: setAccessToken } = useAsyncStorage<StorageKeys.AccessToken>(
    StorageKeys.AccessToken,
  );

  const onFetch = useCallback(
    (value?: IStringDictionary) => {
      setIsSubmit(true);
      // Use provided value or default to args.value
      const requestData = value ? value : args.value;

      console.log('RequestData ====>', requestData);
      const loadData = async () => {
        try {
          const requestOptions: RequestInit = {
            method: args.method,
            headers: {
              'Content-Type': 'application/json',
              ...(token.accessToken && {
                Authorization: `Bearer ${token.accessToken}`,
              }),
            },
          };

          if (args.method === 'POST' || args.method === 'PATCH') {
            requestOptions.body = JSON.stringify(requestData);
          }

          const rtnData = await fetch(host + args.url, requestOptions);
          // console.log('rtnData ====>', rtnData);
          return await rtnData.json();
        } catch (e) {
          console.log('error ====>', e);
        }
      };

      loadData()
        .then((result) => {
          // console.log('result ====>', result);
          if (result.statusCode === STATUS.UNAUTHORIZED) {
            //1. 토큰 만료시 리프레시 토큰으로 엑세스 토큰 재발행
            return setExpiredAccessToken();
          }
          if (result.data.refreshToken) {
            //2. 토큰이 있으면 recoil.token.ts에 저장(글로벌로 참조 가능하도록)
            setToken({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
            });
            //3. asyncStorage에 엑세스 토큰 저장
            setAccessToken({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
            });
          }
          if (
            result.statusCode === STATUS.SUCCESS ||
            result.statusCode === STATUS.CREATED
          ) {
            //3. 결과가 200일경우 isSuccess 불리언값 참조 가능
            setIsSuccess(true);
            setIsSubmit(false);
            //4. 완료 후 컴퍼넌트에서 던져주는 결과후 실행할 함수 실행
            args.onSuccessCallback && args.onSuccessCallback(result.data);
          }
          // console.log('RESULT(data) ====>', result.data);
          //5. 데이터 참조 가능하도록 추가
          setResultData(result.data);
          return result.data;
        })
        .catch((e) => {
          console.log(e);
          setIsSuccess(false);
          setIsSubmit(false);
          args.onFailCallback && args.onFailCallback();
          console.log('서버 통신 에러');
        });
    },
    [args],
  );

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

      if (
        rtnData.statusCode !== STATUS.SUCCESS ||
        rtnData.statusCode !== STATUS.CREATED
      )
        return new Error(rtnData.statusText);
      return await rtnData.json();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onFetch: onFetch,
    resultData: resultData,
    isSubmit: isSubmit,
    isSuccess: isSuccess,
  };
};
