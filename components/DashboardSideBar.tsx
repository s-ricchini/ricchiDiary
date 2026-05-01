import CategoriasSideBar from "./CategoriasSideBar"

export default async function DashboardSideBar(){
        return(
        <div className="bg-white h-screen pl-4 pr-10">
            <p className="text-2xl">Categorias</p>
            <CategoriasSideBar></CategoriasSideBar>
        </div>
    )


}