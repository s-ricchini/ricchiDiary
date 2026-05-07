'use server'

//queries
import { createEntry,deleteEntry } from "@/queries/entries"

import { NewEntry } from "@/types/types"
import { revalidatePath } from "next/cache"

import { getUserId } from "@/utils/userId"
import { redirect } from "next/navigation"


type FormState =
  | { success: true }
  | { error: string }
  | null

export async function createNewEntry(prevState:FormState, data: FormData) {
    
    const title = data.get('title') as string
    const content = data.get('content') as string
    const parent_id = data.get('parent_id') as string
    
    const newEntry: NewEntry = {parent_id,title,content}
    try {
        const userId = await getUserId()
        await createEntry(userId,newEntry)
        revalidatePath('/dashboard/diary')
        return {success:true}    
    } catch (error) {
        console.error(error)
        if (error instanceof Error && error.message === 'Unauthorized') {
            redirect('/login')
        }
        return {error:"Error al crear la nueva entry"}
    }

}

export async function deleteEntryAction(id:string) {
    try {
        const userId = await getUserId()
        await deleteEntry(userId,id)
        revalidatePath('/dashboard/diary')

    } catch (error) {
        console.error(error)
        
        if (error instanceof Error && error.message === 'Unauthorized') {
            redirect('/login')
        }
    }

}