import { NextResponse } from 'next/server'


export async function POST(request: Request) {

  try {

    
    const response = NextResponse.json({ })

    return response
    
  } catch(err) {

    return NextResponse.json(
      { data: err },
      { status: 500 }
    )

  }


}


