import { searchCategoryById } from "@/queries/categories"
import Diaries from "@/components/Diaries"
import Link from "next/link"
import DeleteCategory from "@/components/DeleteCategory"

import { getSessionOrRedirect } from "@/utils/userId"

export default async function Page({params,searchParams}){
    const {id} =  await params
    let {page} = await searchParams
    
    if(!page){
        page = "1"
    }

    const url = `/dashboard/category/${id}?page=`
    const session = await getSessionOrRedirect()

    //hago un fetch a las categorias y luego uno a todos los entries
    const category = await searchCategoryById(session.user.id,id)
    if(!category){
        return("Error")
    }

    return(
        <div>
            <div>
                <p className="text-3xl">{category.name}</p>
                <DeleteCategory id={id}></DeleteCategory>
                
            </div>
            
            <Link href={"/dashboard"}><button>Volver al inicio</button></Link>
            <Diaries page={parseInt(page)} url={url}  categoryId={id}></Diaries>
        </div>
        
    )

}