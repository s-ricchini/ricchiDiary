import Diaries from "@/components/Diaries";
import FormsWrapper from "@/components/FormsWrapper";
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import PageSelector from "@/components/pageSelector";
import { url } from "inspector";


export default async function Page({searchParams}){
    

    let {page} = await searchParams
    
    if(!page){
        page = "1"
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect('/login')
    }

    return (
    <div className="flex flex-col h-screen">
        <div>
            <h1 className="p-5 text-3xl">Bienvenido, {session.user.name}, {session.user.id}</h1>

        </div>
        <div className="flex flex-1 overflow-hidden">
            <div className="px-5 flex-1 flex flex-col ">
                <div className=" flex-1 [&::-webkit-scrollbar]:hidden">
                    <Diaries page={parseInt(page)} url="/dashboard?page=" />
                </div>
            </div>
            <div>
                <FormsWrapper userId={session.user.id} />
            </div>
        </div>
    </div>
)

}