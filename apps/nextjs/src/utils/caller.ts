import { auth } from '@clerk/nextjs/app-beta';

import { appRouter } from '@targett/api';
import { db } from '@targett/db';

export const createCaller = () =>
  appRouter.createCaller({
    db,
    auth: auth()
  });
