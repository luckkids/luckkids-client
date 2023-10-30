import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TopNavigation, TopNavigationProps } from '@design-system';

interface StackNavbarProps extends TopNavigationProps {
  //
}

const StackNavbar: React.FC<StackNavbarProps> = ({
  title,
  RightComponent,
  onBackPress,
  bgColor = 'TRANSPARENT',
  ...props
}) => {
  // TODO(Gina): fix any type
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <TopNavigation
      bgColor={bgColor}
      onBackPress={onBackPress ? onBackPress : navigation.goBack}
      title={title}
      RightComponent={RightComponent}
      {...props}
    />
  );
};

export default StackNavbar;
