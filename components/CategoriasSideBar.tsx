import { getCategories } from "@/queries/categories";
import SidebarItem from "./SidebarItem";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function CategoriasSideBar() {
    
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    if(!session){
        redirect('/login')
    }

    const categorias = await getCategories(session.user.id )

    return(
        <div>
            {categorias.length > 0 ? categorias.map(cat => <SidebarItem key={cat.id} id={cat.id} nombre={cat.name}></SidebarItem>) : <p>No hay cateogorias creadas</p>}
        </div>
    )

}

