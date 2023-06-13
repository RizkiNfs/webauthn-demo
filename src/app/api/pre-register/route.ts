import { NextResponse } from 'next/server'
import { generateRegistrationOptions } from '@simplewebauthn/server'
import db from '@/utils/db';


export async function POST(request: Request) {

  try {
   
    const body = await request.json()
    const options =  generateRegistrationOptions({
      rpID: 'localhost',
      rpName: 'webauthn-demo',
      userID: body.email,
      userName: body.email,
      attestationType: 'none',
      authenticatorSelection: {
        userVerification: 'preferred',
      },
    });

    db.set('challenges', body.email, options.challenge)
    
    return NextResponse.json({ data: options })

  } catch(err) {

    return NextResponse.json(
      { data: err },
      { status: 500 }
    )

  }


}

