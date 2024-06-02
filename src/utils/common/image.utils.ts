import { Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import Share, { ShareSingleOptions } from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

export const CLOUD_FRONT_PREFIX = 'https://d1i0as5mndfs61.cloudfront.net';

export const saveImage = async (uri: string): Promise<boolean> => {
  try {
    // Request permissions
    let permissionStatus;

    // Check and request permissions for iOS
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
      if (permissionStatus !== RESULTS.GRANTED) {
        permissionStatus = await request(
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        );
      }
    }

    if (permissionStatus !== RESULTS.GRANTED) {
      console.error('Permission to access photo library was denied');
      return false;
    }

    const res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: uri.substring(uri.lastIndexOf('.') + 1),
    }).fetch('GET', uri);

    const filePath = res.path();

    const response = await CameraRoll.saveAsset(filePath, { type: 'photo' });
    console.log('Image saved successfully:', filePath);
    console.log(response);
    return true;
  } catch (error) {
    console.error('Error saving image:', error);
    return false;
  }
};

export const shareImage = async ({
  title,
  message,
  imageUrl,
}: {
  title: string;
  message: string;
  imageUrl: string;
}) => {
  const shareOptions = {
    title,
    message,
    stickerImage: imageUrl,
    type: 'image/jpeg',
    social: Share.Social.INSTAGRAM_STORIES,
    appId: 'luckkids', //NOTE random string
    backgroundBottomColor: '#C5F865',
    backgroundTopColor: '#C5F865',
  };

  //TODO(Gina): add other social media
  const { success } = await Share.shareSingle(
    shareOptions as ShareSingleOptions,
  );
};
