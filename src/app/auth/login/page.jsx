"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.log(error.message);
        }

        console.log("login successful", data);
        router.push("/dashboard");

    }
    return (
        <form onSubmit={onSubmit} className="m-5 p-8 justify-end items-end">
            <h1 className="text-6xl mb-8">Login</h1>

            <label className="mb-4">Email</label>
            <input type="email" name="email" required placeholder="Enter email" className="border p-2 w-full rounded-xl mb-6 mt-2" onChange={onChange} value={email}></input>

            <label className="mb-4">Password</label>
            <input type="password" name="password" required placeholder="Enter password" className="border p-2 w-full rounded-xl mb-6 mt-2" onChange={onChange} value={password}></input>

            <button type="submit" className="bg-gray-900 text-white p-3 text-xl rounded-2xl w-full cursor-pointer">Login</button>
        </form>
    )
}