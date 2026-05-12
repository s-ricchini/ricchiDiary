'use server'

import { FormState,hex } from "@/types/types"
import { newCategory,catAlreadyExist } from "@/queries/categories"
import { revalidatePath } from "next/cache"
import { getUserId } from "@/utils/userId"
import { redirect } from "next/navigation"
import { deleteCategory } from "@/queries/categories"

export async function createNewCategory(prevState:FormState, data: FormData) {
    
    const name = data.get('name') as string
    const color = data.get('color') as hex

    console.log(name)
    console.log(color)
    

    try {
        const userId = await getUserId()
        const exists =  await catAlreadyExist(userId,name)
        
        if(exists){
            return ({error: "La categoría ya existe"})
        }

        await newCategory(userId,name,color)
        revalidatePath('/dashboard/')
        return {success:true}    
    } catch (error) {
        
        console.error(error)
        if (error instanceof Error && error.message === 'Unauthorized') {
            redirect('/login')
        }
        return {error:"Error at creating the category "}
    }

}

export async function deleteCategoryAction(id:string) {
    try {
        const userId = await getUserId()
        await deleteCategory(userId,id)
        revalidatePath("/dashboard")
        return {success:true}

    } catch (e) {
        console.error(e)
        if (e instanceof Error && e.message === 'Unauthorized') {
            redirect('/login')
        }
        return {success: false,error:"Error deleting the category"}
    }
}