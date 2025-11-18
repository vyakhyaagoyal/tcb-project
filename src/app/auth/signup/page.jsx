"use client"

export default function SignupPage(){

    async function onSubmit(e){
        e.preventDefault();

        const {data,error}= await supabase.auth.signup({email,password})
        if(error){
            console.log(error.message);
        }
        
        alert("Check your email for the confirmation link!")
        console.log(data);

    }
    return(
        <form onSubmit={onSubmit} className="m-5 p-8 justify-end items-end">
        <h1 className="text-6xl mb-8">Signup</h1>
        <label className="mb-4">Name</label>
        <input type="text" name="name" required placeholder="Enter name" className="border p-2 w-full rounded-xl mb-6 mt-2"></input>

        <label className="mb-4">Email</label>
        <input type="email" name="email" required placeholder="Enter email" className="border p-2 w-full rounded-xl mb-6 mt-2"></input>

        <label className="mb-4">Password</label>
        <input type="password" name="password" required placeholder="Enter password" className="border p-2 w-full rounded-xl mb-6 mt-2"></input>

        <button type="submit" className="bg-gray-900 text-white p-3 text-xl rounded-2xl w-full">Signup</button>
        </form>
    )
}