import {connect} from '@/dbconfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'



connect()

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'User Not Found'}, {status: 400})
        }
        console.log("user exists")

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: 'Invalid Password'}, {status: 400})
        }
        console.log("password matched")
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign( tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            messasge: "Login Success",
            success: true,
        })
        
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/", // Make the cookie available to all routes
        })

        return response 

    } catch (err: unknown) {
        if (err instanceof Error) {
          return NextResponse.json({ error: err.message }, { status: 500 });
        }
      }
        }