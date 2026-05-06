'use client'

import { useState,useActionState } from "react"
import { createNewEntry } from "@/actions/entryForm"


function NewEntryForm({parentId} : {parentId:string}){
    const [isActive,setIsActive] = useState(false)

    return(
        <div>
            <button className="bg-gray-900 text-white hover:cursor-pointer p-2" onClick={() => {setIsActive(prev => !prev)}}>{isActive ? "Close form" : "New Entry"}</button>
            {isActive && <Form parentId={parentId}></Form>}
        
        </div>
    )


}

function Form({parentId} : {parentId:string}){
    const [state,formAction,isPending] = useActionState(createNewEntry,null)
    
    return(
        <form action={formAction} className="p-5 flex flex-col bg-white border border-gray-200 mb-3">
            <input type="text" name="title" placeholder="title" required></input>
            <input type="text" name="content" placeholder="text" required></input>
            <input type="hidden" name="parent_id" value={parentId} ></input>
            <input type="submit" value={!isPending ? "Create Entry" : "Loading"} disabled={isPending}></input>
            {state?.error && <span className="text-red-600">Error al crear entry</span>}
            {state?.success && <span className="text-green-700">Entry creada existosamente</span>}
        </form>
        
    )

}

export default NewEntryForm