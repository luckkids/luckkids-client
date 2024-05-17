import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';

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
  return Share.open({
    title,
    message,
    url: imageUrl,
  });
};
