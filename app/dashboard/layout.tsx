import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";
import DashboardSideBar from "@/components/DashboardSideBar";

export default async function DashboardLayout({ children } : {children : React.ReactNode}){
    
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect('/login')

    
    
    return(
        <div className="flex">
            <DashboardSideBar></DashboardSideBar>
            <main className="">
                {children}
            </main>
        </div>


    )
}