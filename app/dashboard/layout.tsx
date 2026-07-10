import { getSessionOrRedirect } from "@/utils/userId";
import React from "react";
import DashboardSideBar from "@/components/DashboardSideBar";

export default async function DashboardLayout({ children } : {children : React.ReactNode}){
    
    const session = await getSessionOrRedirect()
    
    return(
        <div className="flex">
            <DashboardSideBar></DashboardSideBar>
            <main className="">
                {children}
            </main>
        </div>


    )
}