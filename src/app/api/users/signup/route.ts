import {connect} from '@/dbconfig/dbConfig'
import { sendEmail } from '@/helper/mailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import {NextRequest, NextResponse} from 'next/server'

connect()

export async function POST(request: NextRequest) {
    try{    
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        //validaiton
        console.log(reqBody)
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: 'User Already Exists'}, {status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword    
        })

        const savedUser = await newUser.save()
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
          return NextResponse.json({ error: err.message }, { status: 500 });
        } else {
          // Handle the case where err is not an instance of Error
          return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
      }
}