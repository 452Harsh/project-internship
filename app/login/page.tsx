"use client"
import { useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link'
import React from 'react'

const defaultData = { username: "", password: "" };

const login = () => {
    const [data, setData] = useState(defaultData)
    const onValueChange = (e: any) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const onLogin = (e: any) => {
        e.prenventDefault();
        if (!data.password || !data.username) {
            alert("Please fill all mandatory fields");
            return;
        }
        // api call
    }
    return (
        <div className='min-h-screen bg-gray-600 flex justify-center items-center'>
            <div className='bg-white px-16 pt-8 pb-12 mb-4 rounded-xl'>
                <h1 className='text-3xl mb-4 text-center'>Login</h1>
                <form>
                    <Input label="Username" id="username" type="text" value={data.username} onChange={(e: any) => onValueChange(e)} />
                    <Input label="Password" id="password" type="password" value={data.password} onChange={(e: any) => onValueChange(e)} />
                </form>
                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-full rounded-full'>Submit</button>
                <p className='mt-3 text-center'>
                    Don't Have an Account? {""}
                    <Link className='text-blue-500' href="/register" onClick={(e: any) => onLogin(e)}>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default login