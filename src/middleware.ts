import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

export async function middleware(req: NextApiRequest, res: NextApiResponse) {

  const session = await getToken({req,secret: process.env.NEXTAUTH_SECRET,})

  if(!session){
    // return NextResponse.redirect('/features/sign-in')
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  } 
}

export const config = {
  matcher: ['/product/:path*','/chat','/dashboard'],
}
