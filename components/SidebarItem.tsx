'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


function SidebarItem({nombre,id} : {nombre : string, id : string}){
    
    const pathname = usePathname()
    const isActive = pathname.startsWith(`/dashboard/category/${id}`)

    return(
        <Link className={`block ${ isActive ? "font-bold": ""}`} href={`/dashboard/category/${id}`}>{nombre}</Link>

    )

}

export default SidebarItem