import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppScreensParamList } from '@types-common/page.types';

const useNavigationService = () => {
  return useNavigation<NativeStackNavigationProp<AppScreensParamList>>();
};

export default useNavigationService;
