import React, { useState, useRef, useEffect, ReactNode } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';

interface IProps {
  children: ReactNode;
  header: ReactNode;
}

export default function Accordion({ children, header }: IProps) {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleAccordion = () => {
    console.log('Toggle Accordion Called');
    if (expanded) {
      // 아코디언 닫기
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // 아코디언 열기
      Animated.timing(animation, {
        toValue: contentHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    console.log('handleContentLayout called');
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
    console.log('Height:', height);
  };

  useEffect(() => {
    console.log('Effect Called: Expanded:', expanded, 'Height:', contentHeight);
    if (expanded) {
      animation.setValue(contentHeight);
    }
  }, [contentHeight, expanded]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        {header}
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.content,
          {
            height: animation,
          },
        ]}
      >
        <View onLayout={handleContentLayout}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    overflow: 'hidden',
  },
});
