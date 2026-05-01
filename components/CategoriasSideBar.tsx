import { getCategories } from "@/queries/categories";
import Link from "next/link";


export default async function CategoriasSideBar() {
    const categorias = await getCategories()

    return(
        <div>
            {categorias.length > 0 ? categorias.map(cat => <SidebarItem key={cat.id} id={cat.id} nombre={cat.name}></SidebarItem>) : <p>No hay cateogorias creadas</p>}
        </div>
    )

}

function SidebarItem({nombre,id} : {nombre : string, id : string}){
    return(
        <Link className="block" href={`/dashboard/category/${id}`}>{nombre}</Link>

    )

}