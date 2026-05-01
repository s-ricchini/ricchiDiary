import { searchCategoryById } from "@/queries/categories"
import Diaries from "@/components/Diaries"
import Link from "next/link"


export default async function Page({params}){
    const {id} =  await params

    //hago un fetch a las categorias y luego uno a todos los entryes
    const category = await searchCategoryById(id)
    if(!category){
        return("Error")
    }

    

    return(
        <div>
            <p className="text-3xl">{category.name}</p>
            <Link href={"/dashboard"}><button>Volver al inicio</button></Link>
            <Diaries categoryId={id}></Diaries>
        </div>
        
    )

}