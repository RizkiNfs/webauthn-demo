import { NextResponse } from 'next/server'
import { verifyRegistrationResponse, } from '@simplewebauthn/server'
import db from '@/utils/db';


export async function POST(request: Request) {

  try {

    const { credential, email, name, hobby } = await request.json()

    const { verified, registrationInfo: info } = await verifyRegistrationResponse({
      response: credential,
      expectedRPID: 'localhost',
      expectedOrigin: 'http://localhost:3000',
      expectedChallenge: db.get('challenges', email),
    });

    db.set('users', email, {
      email,
      name,
      hobby,
      credential: {
        id: info?.credentialID,
        publicKey: info?.credentialPublicKey,
        type: info?.credentialType,
        counter: info?.counter
      }
    })


    const response = NextResponse.json(
      { verified, info }
    )

    response.cookies.set('token', 'rahasia', { httpOnly: true, maxAge: 999999 })
    response.cookies.set('email', email, { httpOnly: true, maxAge: 999999 })

    return response
    
  } catch(err) {

    return NextResponse.json(
      { data: err },
      { status: 500 }
    )

  }


}


