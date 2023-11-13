import React, { useState } from 'react';
import { ComponentLoginJoinId } from '@components/page/login/join/component.login.join.id';
import { ComponentLoginJoinPass } from '@components/page/login/join/component.login.join.pass';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageLoginJoin: React.FC<IPage> = (props) => {
  const [isRegPass, setIsRegPass] = useState<boolean>(false);
  return (
    <>
      {!isRegPass ? (
        <ComponentLoginJoinId regPass={setIsRegPass} />
      ) : (
        <ComponentLoginJoinPass
          onSuccess={() => props.navigation.navigate(AppScreens.LoginId)}
        />
      )}
    </>
  );
};
