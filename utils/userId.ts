import { auth } from "./auth"
import { headers } from "next/headers"

export async function getUserId(): Promise<string> {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) throw new Error("Unauthorized")

    return session.user.id
}