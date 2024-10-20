import {connect} from '@/dbconfig/dbConfig'
import {NextRequest, NextResponse} from 'next/server'


connect()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try{
        const response = NextResponse.json({
            message: "User logged out",
            success: true
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    }catch (err: unknown) {
        if (err instanceof Error) {
          return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}