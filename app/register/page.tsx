"use client"
import { useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const defaultData = { name: "", username: "", password: "" };

const register = () => {
    const [data, setData] = useState(defaultData)
    const router = useRouter();
    const onValueChange = (e: any) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const onRegister = async (e: any) => {
        e.preventDefault();
        if (!data.name || !data.password || !data.username) {
            alert("Please fill all mandatory fields");
            return;
        }
        // api call
        try {
            const respone = await axios.post("api/user/register", data)
            setData(defaultData);
            if (respone.status === 200) {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
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
                <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-full rounded-full'

                    onClick={(e) => onRegister(e)}  >Submit</button>
                <p className='mt-3 text-center'>
                    Already Have an Account? {""}
                    <Link className='text-blue-500' href="/login" onClick={(e: any) => onRegister(e)}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default register