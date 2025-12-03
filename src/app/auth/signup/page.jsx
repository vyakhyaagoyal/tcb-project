"use client"
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        if (name === "userName") {
            setUserName(value);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email, password, options: {
                data: { display_name: userName, full_name: userName }
            }
        })
        if (error) {
            console.log(error.message);
        }

        console.log("User created:", data);
        alert("Signup successful!");

        // alert("Check your email for the confirmation link!")

    }
    return (
        <div className="flex h-screen">
            <div className="w-1/2 relative">
                <Image src="/bg_auth.jpeg" alt="background auth" height={1000} width={1000} className="h-full"></Image>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-linear-to-b from-[#c7b6a3] via-[#d2c2b1] to-[#ddcfbf]">
                <form onSubmit={onSubmit} className="m-5 p-8">

                    <h1 className="text-6xl mb-3 items-center justify-center">Sign  Up</h1>
                    <p className="mb-8 text-xl">Already a member? <Link href="/auth/login" className="text-blue-800  cursor-pointer">Login</Link></p>

                    <label className="mb-4">Name</label>
                    <input type="text" name="userName" required placeholder="Enter name" className="border p-2 w-full rounded-xl mb-6 mt-2" onChange={onChange} value={userName}></input>

                    <label className="mb-4">Email</label>
                    <input type="email" name="email" autoComplete="email" required placeholder="Enter email" className="border p-2 w-full rounded-xl mb-6 mt-2" onChange={onChange} value={email}></input>

                    <label className="mb-4">Password</label>
                    <input type="password" name="password" autoComplete="new-password" required placeholder="Enter password" className="border p-2 w-full rounded-xl mb-6 mt-2" onChange={onChange} value={password}></input>

                    <button type="submit" className="bg-gray-900 text-white p-3 text-xl rounded-2xl w-full cursor-pointer hover:scale-102 duration-300 transition-transform hover:bg-gray-800">Sign Up</button>
                </form>
            </div>

        </div>
    )
}