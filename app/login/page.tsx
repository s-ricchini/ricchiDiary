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
        <div>
            <h1>Iniciar sesion</h1>

            <form onSubmit={handleSubmit} className="bg-white p-5 flex flex-col">
                <input name="email"    type="email"    placeholder="Email"     required />
                <input name="password" type="password" placeholder="Contraseña (mín. 8 caracteres)" required />

                <button type="submit" disabled={loading}>
                    {loading ? "Iniciando sesion " : "Login"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <p>No tenes cuenta <Link href="/register"className="text-blue-900 underline">Registrarse</Link></p>
        </div>
        
    )
}