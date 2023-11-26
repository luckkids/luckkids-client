import React from 'react';
import { TopNavigation, TopNavigationProps } from '@design-system';
import useNavigationService from '@hooks/navigation/useNavigationService';

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
  const navigation = useNavigationService();

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
