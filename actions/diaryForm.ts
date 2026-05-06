'use server'

//queries


import { NewDiary,FormState } from "@/types/types"
import { revalidatePath } from "next/cache"
import { createDiary } from "@/queries/diaries"



export async function createNewDiary(prevState:FormState, data: FormData) {
    
    const title = data.get('title') as string
    const category_id = data.get('category') === 'null' ? null : data.get('category') as string
    console.log(category_id)

    const newDiary:NewDiary = {title,category_id}
    try {

        await createDiary(newDiary)
        revalidatePath('/dashboard/')
        return {success:true}    
    } catch (error) {
        console.error(error)
        return {error:"Error at creating the diary "}
    }

}