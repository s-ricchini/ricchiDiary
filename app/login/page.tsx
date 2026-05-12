"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/utils/auth-client"
import Link from "next/link"

export default function SignUpPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)

        await authClient.signIn.email({
            email:    formData.get("email") as string,
            password: formData.get("password") as string,
        }, {
            onRequest: () => setLoading(true),
            onSuccess: () => router.push("/dashboard"),
            onError:   (ctx) => setError(ctx.error.message),
        })

        setLoading(false)
    }

    return (
        <div className="bg-white w-1/4 mx-auto mt-10 p-5 justify-center text-center rounded flex flex-col gap-3">
            <h1 className="text-xl font-medium">Iniciar sesion</h1>

            <form onSubmit={handleSubmit} className="bg-white flex flex-col text-lg gap-3">
                <input className="border border-gray-200 rounded p-2" name="email"    type="email"    placeholder="Email"     required />
                <input className="border border-gray-200 rounded p-2" name="password" type="password" placeholder="Contraseña (mín. 8 caracteres)" required />

                <button type="submit" className="hover:bg-blue-900 cursor-pointer p-2 rounded bg-blue-800 text-white" disabled={loading}>
                    {loading ? "Iniciando sesion " : "Login"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <p className="text-gray-700">No tenes cuenta? <Link href="/register"className="text-blue-900 underline">Registrarse</Link></p>
        </div>
        
    )
}