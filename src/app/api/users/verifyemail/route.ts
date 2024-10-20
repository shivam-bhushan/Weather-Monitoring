import {connect} from '@/dbconfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'

connect()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const { token} = reqBody
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: 'Invalid Token'}, {status: 400})
        }

        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        return NextResponse.json({
            message: "Email Verified",
            success: true,
            user
        })

        
    } catch (err: unknown) {
        if (err instanceof Error) {
          return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
      }
        }