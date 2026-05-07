import CategoriasSideBar from "./CategoriasSideBar"
import Link from "next/link"
import LogoutButton from "./LogOutButton"

export default async function DashboardSideBar() {
    return (
        <div className="border bg-white border-gray-300 h-screen flex flex-col">
            <div className="pl-4 pr-10">
                <Link href={"/dashboard"}>
                    <p className="text-2xl">Categorias</p>
                </Link>    
                <CategoriasSideBar />

            </div>
            
            <div className="mt-auto mx-auto border-t border-gray-300 p-5">
                <LogoutButton />
            </div>
        </div>
    )
}