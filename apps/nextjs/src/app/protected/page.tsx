import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/app-beta';

import { CustomSignIn } from '../signin';
import { CustomSignOut } from '../signout';

export default async function Homepage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div className='font-sans'>
      <p>Hello World!</p>
      <div className='bg-rd-500'>
        {userId ? <CustomSignOut /> : <CustomSignIn />}
      </div>
    </div>
  );
}
