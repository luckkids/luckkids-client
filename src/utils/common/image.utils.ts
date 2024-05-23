import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Share } from 'react-native';

export const CLOUD_FRONT_PREFIX = 'https://d1i0as5mndfs61.cloudfront.net';

export const saveImage = async (uri: string) => {
  const result = await CameraRoll.saveToCameraRoll(uri);
  console.log(result);
};

export const shareImage = ({
  title,
  message,
  imageUrl,
}: {
  title: string;
  message: string;
  imageUrl: string;
}) => {
  // TBU (아직 기획이 정해지지 않아서 보류)
};
