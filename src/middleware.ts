import { NextResponse } from 'next/server';

export function middleware() {
  const res = NextResponse.next();

  /*
   *
   * Enable CORS for testing, since, tests run with an origin
   * of `http://localhost:80`, and the API runs on `http://localhost:3000`
   *
   * */
  if (process.env.NODE_ENV === 'development') {
    res.headers.append('Access-Control-Allow-Credentials', 'true');
    res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, ' +
        'Content-Length, Content-MD5, Content-Type, Date, ' +
        'X-Api-Version'
    );
  }

  return res;
}

export const config = {
  matcher: '/api/:path*'
};
