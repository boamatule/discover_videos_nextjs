import { NextResponse } from 'next/server'
import { verifyToken } from '../lib/utils';

export async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if((token && userId) || pathname.includes('/api/login')) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.rewrite(new URL('/login', req.url));
  }
}