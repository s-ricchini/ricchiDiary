'use client'
import { toast } from "sonner"

import { useActionState,useState,useEffect } from "react"


import { createNewDiary } from "@/actions/diaryForm"
import { Category } from "@/types/types"

function NewDiaryForm({categories} : {categories: Category[]}){

    const [name,setName] = useState('')
    const [state,action,isPending] = useActionState(createNewDiary,null)

    useEffect(() => {
            if (state?.success) {
                toast.success(`Diario creado: ${name}`)
            }
            if (state?.error){
                toast.error("Error creating the Diary")
            }            
        }, [state, name])

    return(
        
        <form action={action} className="bg-white border border-gray-300 rounded p-4 text-lg">
            <input onChange={(e) => {setName(e.target.value)}} className="p-2" name="title" type="text" placeholder="New diary name" required></input>
            <select name="category" defaultValue={'null'}>
                <option value={"null"}>ninguna</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input className="bg-gray-900 text-white p-3 text-lg" type="submit" value={"Create"} disabled={isPending}></input>

        </form>

    )


} 

export default NewDiaryForm