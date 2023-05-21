import React from 'react';
import { currentUser } from '@clerk/nextjs/app-beta';

import { CustomSignIn } from './signin';
import { CustomSignOut } from './signout';

const Protected = async () => {
  const self = await currentUser();

  return (
    <div className='font-sans'>
      <p>Hello World!</p>
      <div className='bg-rd-500'>
        {self && <CustomSignOut />}
        {!self && <CustomSignIn />}
      </div>
    </div>
  );
};
export default Protected;
