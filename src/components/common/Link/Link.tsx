import { ReactNode } from 'react';
import { Alert, Linking, TouchableWithoutFeedback, View } from 'react-native';

interface ILink {
  url: string;
  children: ReactNode;
}

export default function Link(props: ILink) {
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert('링크를 확인해 주세요', err),
    );
  };
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => openURL('https://www.example.com')}
      >
        {props.children}
      </TouchableWithoutFeedback>
    </View>
  );
}
