import { NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server'
import db from '@/utils/db';

export async function POST(request: Request) {

  try {

    const body = await request.json()
    const user = db.get('users', body.email)
    if(!user) {
      return NextResponse.json(
        { data: 'not found' },
        { status: 404 }
      )
    }
    
    const options = generateAuthenticationOptions({
      userVerification: 'required',
      allowCredentials: [{
        id: Buffer.from(Object.values(user.credential.id as object)) as Buffer,
        type: 'public-key',
      }]
    });

    db.set('challenges', body.email, options.challenge)

    return NextResponse.json({ data: options })
    
  } catch(err) {
    console.log('err: ', err)
    return NextResponse.json(
      { data: err },
      { status: 500 }
    )
  }


}

