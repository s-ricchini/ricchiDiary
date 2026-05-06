import CategoriasSideBar from "./CategoriasSideBar"
import Link from "next/link"
export default async function DashboardSideBar(){
        return(
        <div className="bg-white h-screen pl-4 pr-10">
            <Link href={"/dashboard"}>
                <p className="text-2xl">Categorias</p>
            </Link>
            
            <CategoriasSideBar></CategoriasSideBar>
        </div>
    )


}