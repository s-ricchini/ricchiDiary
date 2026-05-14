'use client'

import { TrashIcon } from "@heroicons/react/24/outline"
import { toast } from "sonner"
import { deleteDiaryAction } from "@/actions/diaryForm"
import { deleteEntryAction } from "@/actions/entryForm"
import { deleteCategoryAction } from "@/actions/categoriesActions"

type ItemToDelete = "entry" | "diary" | "category"

export default function DeleteIcon({ id,itemTodelete }: { id:string ,itemTodelete: ItemToDelete }) {

    async function handleDelete(){
        let result;

        if (itemTodelete === "entry"){
            //server action para borrar una entry
            result = await deleteEntryAction(id)
        }

        if(itemTodelete === "diary"){
            result = await deleteDiaryAction(id)
        }

        if(itemTodelete === 'category'){
            result = await deleteCategoryAction(id)
        }

        //hago un toast
        if(result?.success){
            toast.success("Item deleted correctly")
        } else{
            toast.error(result?.error)
        }

    }

    return (
        <TrashIcon  onClick={handleDelete} className="h-6 w-6 text-gray-400 cursor-pointer hover:text-red-600"></TrashIcon>
    )
}

