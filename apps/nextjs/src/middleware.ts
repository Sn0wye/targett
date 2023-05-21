import { NextResponse, type NextRequest } from 'next/server';
import { withClerkMiddleware } from '@clerk/nextjs/server';

export default withClerkMiddleware((_req: NextRequest) => {
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)'
};
