import { auth } from "./auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserId(): Promise<string> {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/login')
    }

    return session.user.id
}

export async function getSessionOrRedirect() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    return session;
} 