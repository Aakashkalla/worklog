"use client"

import { signIn } from "next-auth/react"
import { useRef } from "react"
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async ()=>{
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password) return

        const result = await signIn("credentials", {
            email,
            password,
            redirect : false
        });

        if(result?.ok){
            router.push("/projects")
        }
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
    };
    return (
    <div>
        <input ref={emailRef} type="email" placeholder="Email"></input>
        <input ref={passwordRef} type="password" placeholder="Password"></input>
        <button onClick={handleLogin}>Submit</button>
    </div>
    )
}

export default page
