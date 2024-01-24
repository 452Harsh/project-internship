"use client"
import { useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link'
import React from 'react'

const defaultData = { name: "", username: "", password: "" };

const register = () => {
    const [data, setData] = useState(defaultData)
    const onValueChange = (e: any) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const onRegister = (e: any) => {
        e.prenventDefault();
        if(!data.name || !data.password || !data.username)
        {
            alert("Please fill all mandatory fields");
            return;
        }
        // api call
    }
    return (
        <div className='min-h-screen bg-gray-600 flex justify-center items-center'>
            <div className='bg-white px-16 pt-8 pb-12 mb-4 rounded-xl'>
                <h1 className='text-3xl mb-4 text-center'>Register</h1>
                <form>
                    <Input label="Name" id="name" type="text" value={data.name} onChange={(e: any) => onValueChange(e)} />
                    <Input label="Username" id="username" type="text" value={data.username} onChange={(e: any) => onValueChange(e)} />
                    <Input label="Password" id="password" type="password" value={data.password} onChange={(e: any) => onValueChange(e)} />
                </form>
                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-full rounded-full'>Submit</button>
                <p className='mt-3 text-center'>
                    Already Have an Account? {""}
                    <Link className='text-blue-500' href="/login" onClick={(e: any) => onRegister(e)}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default register