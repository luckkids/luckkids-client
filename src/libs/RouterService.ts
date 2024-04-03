/* eslint-disable @typescript-eslint/ban-ts-comment */
import qs from 'qs';
import { AppScreensParamList } from '@types-common/page.types';

class RouterService {
  /**
   * @param url url 을 파싱해서 앱 라우팅이 가능한지 검토 합니다.
   * 라우팅이 불가능한 경우 빈 배열을 리턴 합니다.
   */
  static parseUrl<T = keyof AppScreensParamList>(
    url: string | undefined,
  ): T extends keyof AppScreensParamList
    ? [T, AppScreensParamList[T]] | []
    : never {
    //@ts-ignore

    if (!url) return [];
    console.log(17, url);

    const [base, params] = url.split('?');

    console.log('base', base);
    console.log('params', params);

    // FIXME : 일단 screenName만 온다고 가정
    const screenName = base;

    console.log('screenName', screenName);

    //@ts-ignore
    if (!screenName) return [];

    //@ts-ignore
    return params
      ? [
          screenName,
          qs.parse(params, {
            decoder: (value, defaultDecoder) => {
              if (
                !Number.isNaN(Number(value)) &&
                Number(value).toString().length === value.length
              ) {
                return Number(value);
              }

              const primitives = {
                true: true,
                false: false,
                null: null,
                undefined,
              };

              if (value in primitives) {
                return primitives[value as keyof typeof primitives];
              }

              return defaultDecoder(value);
            },
          }),
        ]
      : [screenName, {}];
  }
}

export default RouterService;
