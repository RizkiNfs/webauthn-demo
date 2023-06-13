import { NextResponse } from 'next/server'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import db from '@/utils/db';

export async function POST(request: Request) {

  try {

    const { credential, email } = await request.json()

    const user = db.get('users', email)

    if(!user) {
      return NextResponse.json(
        { message: 'User tidak ditemukan' },
        { status: 404 }
      )
    }

    const authenticator = {
      credentialPublicKey: Buffer.from(Object.values(user.credential?.publicKey as object)) as Buffer,
      credentialID: Buffer.from(Object.values(user.credential.id as object)) as Buffer,
      counter: user.credential.counter,
    }


    const { verified, authenticationInfo: info } = await verifyAuthenticationResponse({
      response: credential,
      expectedRPID: 'localhost',
      expectedOrigin: 'http://localhost:3000',
      expectedChallenge: db.get('challenges', email),
      authenticator
    });


    const response = NextResponse.json(
      { verified, info },
    )

    response.cookies.set('token', 'rahasia', { httpOnly: true, maxAge: 999999 })
    response.cookies.set('email', email, { httpOnly: true, maxAge: 999999 })

    return response

    
  } catch(err) {
    console.log('err: ', err)
    return NextResponse.json(
      { data: err },
      { status: 500 }
    )

  }


}


