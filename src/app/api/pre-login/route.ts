import { NextResponse } from 'next/server';


export async function POST(request: Request) {

  try {

    return NextResponse.json({ })
    
  } catch(err) {

    return NextResponse.json(
      { data: err },
      { status: 500 }
    )
  }


}

