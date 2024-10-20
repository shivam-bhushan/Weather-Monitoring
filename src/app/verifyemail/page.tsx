/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios'
import { Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function VerifyEmail() {
    const router = useRouter()


    const [token, setToken] = useState("")
    const [verified, setVeried] = useState(false)
    const [error, setError] = useState(false)
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVeried(true)
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                setError(true)
            }
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token) {
            verifyUserEmail()
        }
    }, [token])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>

                </div>
            )}
        </div>
    )
}
