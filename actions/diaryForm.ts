'use server'

//queries


import { NewDiary,FormState } from "@/types/types"
import { revalidatePath } from "next/cache"
import { createDiary,toggleFav,deleteDiary } from "@/queries/diaries"
import { getUserId } from "@/utils/userId"
import { redirect } from "next/navigation"



export async function createNewDiary(prevState:FormState, data: FormData) {
    
    const title = data.get('title') as string
    const category_id = data.get('category') === 'null' ? null : data.get('category') as string
    console.log(category_id)

    const newDiary:NewDiary = {title,category_id}
    try {
        const userId = await getUserId()
        await createDiary(userId,newDiary)
        revalidatePath('/dashboard/')
        return {success:true}    
    } catch (error) {
        console.error(error)
        
        if (error instanceof Error && error.message === 'Unauthorized') {
            redirect('/login')
        }
        
        return {error:"Error at creating the diary "}
    }

}

export async function toggleFavAction(id: string, newState: boolean) {
    try {
        const userId = await getUserId()
        await toggleFav(userId,id,newState)
        revalidatePath("/dashboard")
        return {success:true}

    } catch (e) {
        console.error(e)
        if (e instanceof Error && e.message === 'Unauthorized') {
            redirect('/login')
        }
        return {success: false,error:"Error toggling fav"}
    }
}

export async function deleteDiaryAction(id:string) {
    try {
        const userId = await getUserId()
        await deleteDiary(userId,id)
        revalidatePath("/dashboard")
        return {success:true}

    } catch (e) {
        console.error(e)
        if (e instanceof Error && e.message === 'Unauthorized') {
            redirect('/login')
        }
        return {success: false,error:"Error deleting the diary"}
    }
}