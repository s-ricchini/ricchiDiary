import React from "react";
import DashboardSideBar from "@/components/DashboardSideBar";

export default function DashboardLayout({ children } : {children : React.ReactNode}){
    return(
        <div className="flex">
            <DashboardSideBar></DashboardSideBar>
            <main className="">
                {children}
            </main>
        </div>


    )



}