import { searchCategoryById } from "@/queries/categories"
import Diaries from "@/components/Diaries"
import Link from "next/link"
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import DeleteCategory from "@/components/DeleteCategory"



export default async function Page({params,searchParams}){
    const {id} =  await params
    let {page} = await searchParams
    
    if(!page){
        page = "1"
    }


    const url = `/dashboard/category/${id}?page=`


    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect('/login')
    }


    //hago un fetch a las categorias y luego uno a todos los entryes
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