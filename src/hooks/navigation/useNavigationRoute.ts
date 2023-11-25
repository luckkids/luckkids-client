import { RouteProp, useRoute } from '@react-navigation/native';
import { AppScreensParamList } from '@types-common/page.types';

const useNavigationRoute = <Name extends keyof AppScreensParamList>(
  _: Name,
) => {
  return useRoute<RouteProp<AppScreensParamList, Name>>();
};

export default useNavigationRoute;
