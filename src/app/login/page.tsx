/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("Success ", response.data)
            router.push('/profile')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                toast.error(error.message)
            }
            else {
                toast.error("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <button
                    onClick={onLogin}
                    disabled={buttonDisable || loading}
                    className={`w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg ${buttonDisable || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>

                <p className="text-center text-gray-600">
                    Don&apos;t have an account?{' '}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => router.push('/signup')}
                    >
                        Sign up here
                    </span>
                </p>
            </div>
            <Toaster />
        </div>
    )
}

