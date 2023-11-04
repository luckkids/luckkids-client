import React from 'react';
import { ColorKeys, Font, L } from '@design-system';

const TopNavigationLeftTitle: React.FC<TopNavigationLeftTitleProps> = ({
  title,
  color,
}) => {
  return (
    <L.Row pl={20}>
      <Font type={'TITLE3_SEMIBOLD'} color={color}>
        {title}
      </Font>
    </L.Row>
  );
};

type TopNavigationLeftTitleProps = {
  title: string;
  color?: ColorKeys;
};

export default TopNavigationLeftTitle;
