import React from 'react';
import { Font, L } from '@design-system';
import { formatCreatedAt } from '@utils';

type IProps = {
  title: string;
  createdAt: string;
};

// TODO navigation 동작도 추가
const HomeAlarmItem: React.FC<IProps> = ({ title, createdAt }) => {
  return (
    <L.Row w="100%" ph={25} justify="space-between" h={72} items="center">
      <Font type="BODY_REGULAR">{title}</Font>
      <Font type="BODY_REGULAR" color="GREY1">
        {formatCreatedAt(createdAt)}
      </Font>
    </L.Row>
  );
};

export default HomeAlarmItem;
