'use client'

import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push('/login')
            }
        })
    }

    return (
        <button className="bg-gray-900 text-white rounded px-2 py-1.5 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            Cerrar sesión
        </button>
    )
}