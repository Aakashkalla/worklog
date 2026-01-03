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
            <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
                <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-neutral-900">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                    Sign in to continue to your workspace
                    </p>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700">
                            Email
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                            />
                </div>

                <div>
                <label className="block text-sm font-medium text-neutral-700">
                Password
                </label>
                    <input
                    ref={passwordRef}
                    type="password"
                    placeholder="*******"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                </div>

            <button
            onClick={handleLogin}
            className="cursor-pointer mt-4 w-full rounded-md bg-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
            >
            Sign in
            </button>
                </div>
                </div>
            </main>
        );
};

export default page;
