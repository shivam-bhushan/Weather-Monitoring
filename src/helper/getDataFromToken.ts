import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    username?: number;
    password?: number;
  }

export const getDataFromToken = (request: NextRequest):string => {
    try{
        const token = request.cookies.get("token")?.value || ""
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!) as TokenPayload
        return decodedToken.id 

    }catch (err){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        else{
            throw new Error("Something went wrong")
        }
    }
}