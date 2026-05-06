'use client'
import { deleteEntryAction } from "@/actions/entryForm"
import { TrashIcon } from "@heroicons/react/24/outline"


function DeleteButton({id,text}: {id:string,text:string}){
    return(
        <button className=" flex w-min p-2  rounded gap-1 bg-red-700 text-white hover:bg-red-500 cursor-pointer" onClick={() => {deleteEntryAction(id)}}>
            <p>{text}</p>
            <TrashIcon className="w-6 h-6 text-white"></TrashIcon>
        </button>
        
    )

}

export default DeleteButton