import { getCategories } from "@/queries/categories";
import SidebarItem from "./SidebarItem";


export default async function CategoriasSideBar() {
    const categorias = await getCategories()

    return(
        <div>
            {categorias.length > 0 ? categorias.map(cat => <SidebarItem key={cat.id} id={cat.id} nombre={cat.name}></SidebarItem>) : <p>No hay cateogorias creadas</p>}
        </div>
    )

}

